import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PageSpeedFieldDataMetricModel, PageSpeedFieldDataModel } from "src/metrics/models/page-speed.model";
import { DeviceType } from "../models/device-type.enum";
import { PageEntity } from "src/pages/page.entity";

@Entity({
  name: "field_datas"
})
export class FieldDataEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ default: null })
  comment: string;

  @Column()
  deviceType: DeviceType;

  @Column("simple-json", { nullable: true })
  cumulativeLayoutShift: PageSpeedFieldDataMetricModel;

  @Column("simple-json", { nullable: true })
  firstContentfulPaint: PageSpeedFieldDataMetricModel;

  @Column("simple-json", { nullable: true })
  firstInputDelay: PageSpeedFieldDataMetricModel;

  @Column("simple-json", { nullable: true })
  largestContentfulPaint: PageSpeedFieldDataMetricModel;

  @ManyToOne(
    type => PageEntity,
    page => page.labDatas, { eager: false, onDelete: "CASCADE" }
  )
  page: PageEntity;

  @CreateDateColumn({
    type: "timestamp with time zone",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp with time zone",
  })
  updated_at: Date;

  static of(url: string, deviceType: DeviceType, {
    cumulativeLayoutShift,
    firstContentfulPaint,
    firstInputDelay,
    largestContentfulPaint
  }: PageSpeedFieldDataModel): FieldDataEntity  {
    const e = new FieldDataEntity();
    e.url = url;
    e.deviceType = deviceType;
    e.cumulativeLayoutShift = cumulativeLayoutShift;
    e.firstContentfulPaint = firstContentfulPaint;
    e.firstInputDelay = firstInputDelay;
    e.largestContentfulPaint = largestContentfulPaint;
    return e;
  }
}