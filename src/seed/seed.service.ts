import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FieldDataEntity } from "src/metrics/entities/field-data.entity";
import { DeviceType } from "src/metrics/models/device-type.enum";
import { PageSpeedFieldDataModel } from "src/metrics/models/page-speed.model";
import { CreatePageDto } from "src/pages/dto/create-page.dto";
import { PageEntity } from "src/pages/page.entity";
import { UserEntity } from "src/users/user.entity";
import { MetricDataType } from "src/_common/models/metric-data-type";
import { Repository } from "typeorm";

@Injectable()
export class SeedService {

  constructor(
    @InjectRepository(FieldDataEntity)
    private fieldDataRepository: Repository<FieldDataEntity>,
  ) { }

  async createFieldData(page: PageEntity, url: string): Promise<any> {
    const ONE_MONTH: number = 2592000000;

    await this.fieldDataRepository.insert([
       // MOBILE 

       this.createFieldDateEntity2(url, DeviceType.MOBILE, page, {
        cumulativeLayoutShift: {
          average: 30,
          bad: 50,
          good: 20,
          value: 15,
        },
        firstContentfulPaint: {
          average: 30,
          bad: 50,
          good: 20,
          value: 15,
        },
        firstInputDelay: {
          average: 30,
          bad: 50,
          good: 20,
          value: 15,
        },
        largestContentfulPaint: {
          average: 30,
          bad: 50,
          good: 20,
          value: 15,
        },
      }, new Date(Date.now() - (ONE_MONTH * 6)), null),

      this.createFieldDateEntity2(url, DeviceType.MOBILE, page, {
        cumulativeLayoutShift: {
          average: 25,
          bad: 70,
          good: 5,
          value: 15,
        },
        firstContentfulPaint: {
          average: 25,
          bad: 70,
          good: 5,
          value: 15,
        },
        firstInputDelay: {
          average: 25,
          bad: 70,
          good: 5,
          value: 15,
        },
        largestContentfulPaint: {
          average: 25,
          bad: 70,
          good: 5,
          value: 15,
        },
      }, new Date(Date.now() - (ONE_MONTH * 3)), "add-new-widget"),

      this.createFieldDateEntity2(url, DeviceType.MOBILE, page, {
        cumulativeLayoutShift: {
          average: 30,
          bad: 50,
          good: 20,
          value: 15,
        },
        firstContentfulPaint: {
          average: 30,
          bad: 50,
          good: 20,
          value: 15,
        },
        firstInputDelay: {
          average: 30,
          bad: 50,
          good: 20,
          value: 15,
        },
        largestContentfulPaint: {
          average: 30,
          bad: 50,
          good: 20,
          value: 15,
        },
      }, new Date(), "optimization"),
    ]);

    await this.fieldDataRepository.insert([

      // DESKTOP

      this.createFieldDateEntity2(url, DeviceType.DESKTOP, page, {
        cumulativeLayoutShift: {
          average: 12,
          bad: 18,
          good: 70,
          value: 15,
        },
        firstContentfulPaint: {
          average: 12,
          bad: 18,
          good: 70,
          value: 15,
        },
        firstInputDelay: {
          average: 12,
          bad: 18,
          good: 70,
          value: 15,
        },
        largestContentfulPaint: {
          average: 12,
          bad: 18,
          good: 70,
          value: 15,
        },
      }, new Date(Date.now() - (ONE_MONTH * 6)), null),

      this.createFieldDateEntity2(url, DeviceType.DESKTOP, page, {
        cumulativeLayoutShift: {
          average: 20,
          bad: 30,
          good: 50,
          value: 15,
        },
        firstContentfulPaint: {
          average: 20,
          bad: 30,
          good: 50,
          value: 15,
        },
        firstInputDelay: {
          average: 20,
          bad: 30,
          good: 50,
          value: 15,
        },
        largestContentfulPaint: {
          average: 20,
          bad: 30,
          good: 50,
          value: 15,
        },
      }, new Date(Date.now() - (ONE_MONTH * 3)), "add-new-widget"),

      this.createFieldDateEntity2(url, DeviceType.DESKTOP, page, {
        cumulativeLayoutShift: {
          average: 12,
          bad: 18,
          good: 70,
          value: 15,
        },
        firstContentfulPaint: {
          average: 12,
          bad: 18,
          good: 70,
          value: 15,
        },
        firstInputDelay: {
          average: 12,
          bad: 18,
          good: 70,
          value: 15,
        },
        largestContentfulPaint: {
          average: 12,
          bad: 18,
          good: 70,
          value: 15,
        },
      }, new Date(), "optimization"),
    ]);
  }

  private createFieldDateEntity2(
    url: string, 
    type: DeviceType, 
    page: PageEntity, 
    model: PageSpeedFieldDataModel,
    date: Date,
    comment: string,
  ): FieldDataEntity {
    const f = FieldDataEntity.of(url, type, model);
    f.page = page;
    f.comment = comment;
    f.created_at = date;
    f.updated_at = date;
    return f;
  }

  async createPage(user: UserEntity, path: string, name: string): Promise<void> {
    const metrics = [MetricDataType.FIELD_DATA, MetricDataType.LAB_DATA];
    const dto = CreatePageDto.of(path, metrics, name);
    const page: PageEntity = PageEntity.createEntity(user, dto);
    await page.save();

    await this.createFieldData(page, path);
  }
} 