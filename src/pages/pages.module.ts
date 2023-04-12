import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PagesService } from "src/pages/pages.sevice";
import { PageEntity } from "src/pages/page.entity";
import { PagesController } from "src/pages/pages.controller";
import { UsersModule } from "src/users/users.module";
import { FieldDataEntity } from "src/metrics/entities/field-data.entity";
import { LabDataEntity } from "src/metrics/entities/lab-data.entity";
import { LabDataReportEntity } from "src/metrics/entities/lab-data-report.entity";
import { CodeCoverageEntity } from "src/metrics/entities/code-coverage.entity";
import { CodeCoverageDetailsEntity } from "src/metrics/entities/code-coverage-details.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PageEntity, 
      FieldDataEntity, 
      LabDataEntity, 
      LabDataReportEntity,
      CodeCoverageEntity,
      CodeCoverageDetailsEntity,
    ]),
    UsersModule,
  ],
  controllers: [PagesController],
  providers: [PagesService]
})
export class PagesModule {}