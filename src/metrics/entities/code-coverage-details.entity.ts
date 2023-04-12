import { PageEntity } from "src/pages/page.entity";
import { CodeCoverageDetails } from "src/_common/models/code-coverage-details.model";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DeviceType } from "../models/device-type.enum";

@Entity({
  name: "code_coverage_details"
})
export class CodeCoverageDetailsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "jsonb",
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  details: Array<CodeCoverageDetails>;

  @Column()
  deviceType: DeviceType;

  @ManyToOne(
    type => PageEntity,
    page => page.codeCoverageDetails, { eager: false, onDelete: "CASCADE" }
  )
  page: PageEntity;

  @CreateDateColumn({
    type: "timestamp with time zone",
  })
  created_at: Date;

  static of(
    data: CodeCoverageDetails[],
    deviceType: DeviceType,
    page: PageEntity) {
      const e = new CodeCoverageDetailsEntity();
      e.details = data;
      e.deviceType = deviceType;
      e.page = page;
      return e;
    }
}