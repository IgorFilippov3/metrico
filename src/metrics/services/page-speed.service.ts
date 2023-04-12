import { HttpService, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PageEntity } from "src/pages/page.entity";
import { FieldDataEntity } from "src/metrics/entities/field-data.entity";
import { LabDataEntity } from "src/metrics/entities/lab-data.entity";
import { DeviceType } from "src/metrics/models/device-type.enum";
import { PageSpeedModel, PageSpeedModelRaw } from "src/metrics/models/page-speed.model";
import { MetricDataType } from "src/_common/models/metric-data-type";
import { LabDataReportEntity } from "../entities/lab-data-report.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Brackets, Repository } from "typeorm";
import { CodeCoverageEntity } from "../entities/code-coverage.entity";
import { CodeCoverageDetails } from "src/_common/models/code-coverage-details.model";
import { CodeCoverageDetailsEntity } from "../entities/code-coverage-details.entity";

@Injectable()
export class PageSpeedService {

  private logger: Logger = new Logger(this.constructor.name);
  private googleApiKey: string = this.configService.get("GOOGLE_API_KEY");
  private PSI_URL_PATH: string = "https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed";

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @InjectRepository(LabDataReportEntity)
    private labDataReportsRepository: Repository<LabDataReportEntity>,
    @InjectRepository(CodeCoverageDetailsEntity)
    private codeCoverageDetailsRepository: Repository<CodeCoverageDetailsEntity>,
  ) { }



  public async collectMetrics(pages: PageEntity[], comment?: string): Promise<void> {
    this.logger.log("Start collecting *** Page Speed *** metrics...");
    for (let page of pages) {
      const [mobileRaw, desktopRaw]: [PageSpeedModelRaw, PageSpeedModelRaw] =
        await Promise.all([
          this.loadPsi(page.url, "mobile", "performance"),
          this.loadPsi(page.url, "desktop", "performance")
        ]);

      try {
        await this.putLabDataReport(mobileRaw.lighthouseResult, DeviceType.MOBILE, page)
        await this.putLabDataReport(desktopRaw.lighthouseResult, DeviceType.DESKTOP, page);
      } catch (e) {
        this.logger.error("Unable to save lab data report", e);
      }

      try {

        const mobile = PageSpeedModel.of(mobileRaw);
        const desktop = PageSpeedModel.of(desktopRaw);

        if (mobile === null || desktop === null) {
          this.logger.log(`Unable to get *** Page Speed *** metrics for ${page.url}`);
          continue;
        }

        if (page.includesDataType(MetricDataType.FIELD_DATA)) {
          await this.putFieldData(
            page, FieldDataEntity.of(mobile.url, DeviceType.MOBILE, mobile.fieldData), comment);
          await this.putFieldData(
            page, FieldDataEntity.of(desktop.url, DeviceType.DESKTOP, desktop.fieldData), comment);
        }

        if (page.includesDataType(MetricDataType.LAB_DATA)) {
          await this.putLabData(
            page, LabDataEntity.of(mobile.url, DeviceType.MOBILE, mobile.labData), comment);
          await this.putLabData(
            page, LabDataEntity.of(desktop.url, DeviceType.DESKTOP, desktop.labData), comment);
        }

        if (page.includesDataType(MetricDataType.CODE_COVERAGE)) {
          await this.putCodeCoverage(
            CodeCoverageEntity.of(page, mobile.url, DeviceType.MOBILE, mobile.labData, comment)
          );
          await this.putCodeCoverage(
            CodeCoverageEntity.of(page, desktop.url, DeviceType.DESKTOP, mobile.labData, comment)
          );

          await this.putCodeCoverageDetails(mobile.labData.details, DeviceType.MOBILE, page);
          await this.putCodeCoverageDetails(desktop.labData.details, DeviceType.DESKTOP, page);
        }
      } catch (err) {
        this.logger.error(err + ` Page url - ${page.url}`);
        continue;
      }
    }
    this.logger.log("Finish collecting *** Page Speed *** metrics!");
  }

  private async putCodeCoverage(newData: CodeCoverageEntity): Promise<void> {
    try {
      await newData.save();
      this.logger.log(
        `Code coverage data for url ${newData.url} (${newData.deviceType}) was created.`
      );
    } catch (e) {
      this.logger.error(e);
    }
  }

  private async putCodeCoverageDetails(
    data: CodeCoverageDetails[],
    deviceType: DeviceType,
    page: PageEntity,
  ): Promise<void> {
    const details: CodeCoverageDetailsEntity | undefined =
      await this.codeCoverageDetailsRepository.createQueryBuilder("code_coverage_details")
        .where("code_coverage_details.pageId = :pageId", { pageId: page.id })
        .andWhere(new Brackets(qb => {
          qb.where({ deviceType })
        }))
        .getOne();

    if (!details) {
      const newDetails = CodeCoverageDetailsEntity.of(data, deviceType, page);
      await newDetails.save();
      this.logger.log(`Code coverage details for url ${page.url} (${newDetails.deviceType}) was created.`);
      return;
    }

    details.details = data;
    await details.save();
    this.logger.log(`Code coverage details for url ${page.url} (${details.deviceType}) was updated.`);
  }

  private async putLabDataReport(
    result: any,
    deviceType: DeviceType,
    page: PageEntity,
  ): Promise<void> {
    const report = await this.labDataReportsRepository.createQueryBuilder("lab_data_reports")
      .where("lab_data_reports.pageId = :pageId", { pageId: page.id })
      .andWhere(new Brackets(qb => {
        qb.where({ deviceType })
      }))
      .getOne();

    if (!report) {
      const newReport = LabDataReportEntity.of(result, deviceType, page);
      await newReport.save();
      this.logger.log(`Lab data report for url ${page.url} (${newReport.deviceType}) was created.`);
      return;
    }

    report.result = result;
    await report.save();
    this.logger.log(`Lab data report for url ${page.url} (${report.deviceType}) was updated.`);
  }

  private async putFieldData(
    page: PageEntity,
    newData: FieldDataEntity,
    comment?: string
  ): Promise<void> {
    try {
      newData.page = page;
      if (comment) newData.comment = comment;
      await newData.save();
      this.logger.log(
        `Field data for url ${newData.url} (${newData.deviceType}) was created.`
      );
    } catch (e) {
      this.logger.error(e);
    }
  }

  private async putLabData(
    page: PageEntity,
    newData: LabDataEntity,
    comment?: string,
  ): Promise<void> {
    try {
      newData.page = page;
      if (comment) newData.comment = comment;
      await newData.save();
      this.logger.log(
        `Lab data for url ${newData.url} (${newData.deviceType}) was created`
      );
    } catch (e) {
      this.logger.error(e);
    }
  }

  private async loadPsi(
    url: string,
    strategy: "mobile" | "desktop",
    category: "performance"
  ): Promise<PageSpeedModelRaw> {
    try {
      const { data } = await this.httpService.get(this.PSI_URL_PATH, {
        params: {
          key: this.googleApiKey,
          strategy,
          category,
          url
        }
      }).toPromise();

      return data;
    } catch (e) {
      this.logger.error(`Unable to get data from ${url}`)
    }

  }
}