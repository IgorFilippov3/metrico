import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Brackets, Repository } from "typeorm";
import { CreatePageDto } from "src/pages/dto/create-page.dto";
import { PageEntity } from "src/pages/page.entity";
import { PagesError } from "src/pages/models/pages-error.enum";
import { UpdatePageDto } from "src/pages/dto/update-page.dto";
import { UserEntity } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
import { LabDataEntity } from "src/metrics/entities/lab-data.entity";
import { FieldDataEntity } from "src/metrics/entities/field-data.entity";
import { MetricDataType } from "src/_common/models/metric-data-type";
import { PaginationQuery } from "src/_common/models/pagination-query.model";
import { GetPageFieldDataDto } from "./dto/get-page-field-data.dto";
import { GetPageLabDataDto } from "./dto/get-page-lab-data.dto";
import { LabDataReportEntity } from "src/metrics/entities/lab-data-report.entity";
import { DeviceType } from "src/metrics/models/device-type.enum";
import { CodeCoverageEntity } from "src/metrics/entities/code-coverage.entity";
import { CodeCoverageDetailsEntity } from "src/metrics/entities/code-coverage-details.entity";

@Injectable()
export class PagesService {
  private logger: Logger = new Logger(this.constructor.name);

  constructor(
    @InjectRepository(PageEntity)
    private pagesRepository: Repository<PageEntity>,
    @InjectRepository(FieldDataEntity)
    private fieldDataRepository: Repository<FieldDataEntity>,
    @InjectRepository(LabDataEntity)
    private labDataRepository: Repository<LabDataEntity>,
    @InjectRepository(LabDataReportEntity)
    private labDataReportsRepository: Repository<LabDataReportEntity>,
    @InjectRepository(CodeCoverageEntity)
    private codeCoverageRepository: Repository<CodeCoverageEntity>,
    @InjectRepository(CodeCoverageDetailsEntity)
    private codeCoverageDetailsRepository: Repository<CodeCoverageDetailsEntity>,
    private usersService: UsersService,
  ) { }

  async getPagesCount(userId: number, dataType: MetricDataType): Promise<number> {
    let whereQuery: string = "pages.userId = :userId";
    let whereParams: Record<string, any> = { userId };

    if (dataType !== MetricDataType.ALL) {
      whereQuery += " AND pages.collectDataTypes @> ARRAY[:dataType]";
      whereParams.dataType = dataType;
    }

    try {
      const count: number =
        await this.pagesRepository.createQueryBuilder("pages")
          .where(whereQuery, whereParams)
          .getCount();
      return count;
    } catch (e) {
      this.logger.error(e.message);
      throw new InternalServerErrorException();
    }
  }

  async getPages(
    userId: number,
    dataType: MetricDataType,
    { limit, offset }: PaginationQuery
  ): Promise<PageEntity[]> | never {
    let whereQuery: string = "pages.userId = :userId";
    let whereParams: Record<string, any> = { userId };

    if (dataType !== MetricDataType.ALL) {
      whereQuery += " AND pages.collectDataTypes @> ARRAY[:dataType]";
      whereParams.dataType = dataType;
    }
    try {
      const pages: PageEntity[] = await
        this.pagesRepository.createQueryBuilder("pages")
          .where(whereQuery, whereParams)
          .offset(offset)
          .limit(limit)
          .getMany();

      if (!MetricDataType.isValid(dataType)) {
        throw new BadRequestException("Invalid data type");
      }

      if (dataType === MetricDataType.ALL) {
        return pages;
      }

      return pages.filter(page => page.collectDataTypes.includes(dataType));
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }

  async createPage(userId: number, dto: CreatePageDto): Promise<PageEntity> | never {
    const user: UserEntity = await this.usersService.geUserById(userId, ["pages"]);

    // if (user.pages.length >= user.pagesLimit) {
    //   throw new ForbiddenException("The project is in open BETA. The limit of pages available for monitoring are 20, at the moment.");
    // }

    const page = PageEntity.createEntity(user, dto);
    try {
      await page.save();
      this.logger.verbose(`Page with id: ${page.id} was created`);
      return page;
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }

  async updatePage(pageId: number, dto: UpdatePageDto, userId: number): Promise<PageEntity> | never {
    const page: PageEntity = await this.getPageById(pageId, userId);
    page.collectDataTypes = dto.collectDataTypes;
    page.name = page.name;
    page.updateWay = dto.updateWay;
    try {
      await page.save();
      this.logger.verbose(`Page with id: ${page.id} was updated`);
      return page;
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }

  async deletePage(id: number, userId: number): Promise<void> | never {
    const page: PageEntity = await this.getPageById(id, userId);
    try {
      await page.remove()
      this.logger.verbose(`Page with id: ${page.id} was deleted`);
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }

  async getPageById(id: number, userId: number): Promise<PageEntity> | never {
    const page: PageEntity = await this.pagesRepository.findOne(id, { loadEagerRelations: false });
    if (!page) {
      throw new NotFoundException(PagesError.PAGE_NOT_FOUND, `Page with id ${id} not found.`);
    }

    if (page.userId !== userId) {
      throw new NotFoundException(PagesError.PAGE_NOT_FOUND, `Page with id ${id} not found.`);
    }

    return page;
  }

  async getPageLabData(
    {
      pageId,
      deviceType,
      from,
      to
    }: GetPageLabDataDto
  ): Promise<LabDataEntity[]> | never {
    const labData: LabDataEntity[] =
      await this.labDataRepository.createQueryBuilder("lab_datas")
        .where("lab_datas.pageId = :pageId", { pageId })
        .andWhere(new Brackets(qb => {
          qb.where({
            created_at: Between(from, to),
            deviceType,
          })
        }))
        .getMany();
    return labData;
  }

  async getPageFieldData(
    {
      pageId,
      deviceType,
      from,
      to
    }: GetPageFieldDataDto
  ): Promise<FieldDataEntity[]> | never {
    const fieldData: FieldDataEntity[] =
      await this.fieldDataRepository.createQueryBuilder("field_datas")
        .where("field_datas.pageId = :pageId", { pageId })
        .andWhere(new Brackets(qb => {
          qb.where({
            created_at: Between(from, to),
            deviceType,
          })
        }))
        .getMany();
    return fieldData;
  }

  getLabDataReport(pageId: number, deviceType: DeviceType) {
    try {
      return this.labDataReportsRepository.createQueryBuilder("lab_data_reports")
        .where("lab_data_reports.pageId = :pageId", { pageId })
        .andWhere(new Brackets(qb => {
          qb.where({ deviceType })
        }))
        .getOne();
    } catch (e) {
      this.logger.log(e);
      throw new InternalServerErrorException();
    }

  }

  getCodeCoverageDetails(
    pageId: number, 
    deviceType: DeviceType,
  ): Promise<CodeCoverageDetailsEntity> {
    try {
      return this.codeCoverageDetailsRepository.createQueryBuilder("code_coverage_details")
        .where("code_coverage_details.pageId = :pageId", { pageId })
        .andWhere(new Brackets(qb => {
          qb.where({ deviceType })
        }))
        .getOne();

    } catch (e) {
      this.logger.log(e);
      throw new InternalServerErrorException();
    }
  }

  getCodeCoverages({
    pageId,
    deviceType,
    from,
    to
  }: GetPageFieldDataDto): Promise<CodeCoverageEntity[]> {
    try {
      return this.codeCoverageRepository.createQueryBuilder("code_coverages")
        .where("code_coverages.pageId = :pageId", { pageId })
        .andWhere(new Brackets(qb => {
          qb.where({
            created_at: Between(from, to),
            deviceType,
          })
        }))
        .getMany();
    } catch (e) {
      this.logger.log(e);
      throw new InternalServerErrorException();
    }
  }
}