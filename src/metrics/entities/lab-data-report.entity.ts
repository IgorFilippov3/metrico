import { DeviceType } from "aws-sdk/clients/ec2";
import { PageEntity } from "src/pages/page.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "lab_data_reports"
})
export class LabDataReportEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "json" })
  result: string;

  @Column()
  deviceType: DeviceType;

  @ManyToOne(
    type => PageEntity,
    page => page.labDataReports, { eager: false, onDelete: "CASCADE" }
  )
  page: PageEntity;

  @CreateDateColumn({
    type: "timestamp with time zone",
  })
  created_at: Date;

  static of(result: any, deviceType: DeviceType,page: PageEntity) {
    const e = new LabDataReportEntity();
    e.result = result;
    e.deviceType = deviceType;
    e.page = page;
    return e;
  }
}