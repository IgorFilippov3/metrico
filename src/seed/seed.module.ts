import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FieldDataEntity } from "src/metrics/entities/field-data.entity";
import { PageEntity } from "src/pages/page.entity";
import { UserEntity } from "src/users/user.entity";
import { SeedService } from "./seed.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PageEntity,
      FieldDataEntity,
    ]),
  ],
  providers: [
    SeedService,
  ],
  exports: [
    SeedService
  ]
})
export class SeedModule {} 