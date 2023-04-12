import { HttpModule, Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MetricsService } from "./metrics.service";
import { PageSpeedService } from "./services/page-speed.service";
import { FieldDataEntity } from "./entities/field-data.entity";
import { LabDataEntity } from "./entities/lab-data.entity";
import { UsersModule } from "src/users/users.module";
import { MetricsController } from "./metrics.contoller";
import { LabDataReportEntity } from "./entities/lab-data-report.entity";
import { CodeCoverageEntity } from "./entities/code-coverage.entity";
import { CodeCoverageDetailsEntity } from "./entities/code-coverage-details.entity";

@Module({
  
  imports: [
    TypeOrmModule.forFeature([
      FieldDataEntity,
      LabDataEntity,
      LabDataReportEntity,
      CodeCoverageEntity,
      CodeCoverageDetailsEntity,
    ]),
    ScheduleModule.forRoot(),
    HttpModule,
    UsersModule,
  ],
  controllers: [MetricsController],
  providers: [
    MetricsService,
    PageSpeedService,
  ]
})
export class MetricsModule {}