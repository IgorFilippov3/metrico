import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PageSpeedLabDataModel } from "src/metrics/models/page-speed.model";
import { DeviceType } from "src/metrics/models/device-type.enum";
import { PageEntity } from "src/pages/page.entity";

@Entity({
  name: "lab_datas"
})
export class LabDataEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ default: null })
  comment: string;

  @Column()
  deviceType: DeviceType;

  @Column({ type: "real" })
  cumulativeLayoutShift: number;

  @Column({ type: "real" })
  firstContentfulPaint: number;

  @Column({ type: "real" })
  firstContentfulPaint3g: number;

  @Column({ type: "real" })
  speedIndex: number;

  @Column({ type: "real" })
  timeToInteractive: number;

  @Column({ type: "real" })
  totalBlockingTime: number;

  @Column({ type: "real" })
  networkRtt: number;

  @Column()
  totalByteWeight: number;

  @Column({ nullable: true, default: null })
  timeToFirstByte: number;

  @Column({ nullable: true, default: null })
  firstMeaningfulPaint: number;

  @ManyToOne(
    type => PageEntity,
    page => page.fieldDatas, { eager: false, onDelete: "CASCADE" }
  )
  page: PageEntity;

  @CreateDateColumn({
    type: "timestamp with time zone",
  })
  created_at: Date;

  static of(url: string, deviceType: DeviceType, {
    cumulativeLayoutShift,
    firstContentfulPaint,
    firstContentfulPaint3g,
    speedIndex,
    timeToInteractive,
    totalBlockingTime,
    networkRtt,
    totalByteWeight,
    firstMeaningfulPaint,
    timeToFirstByte,
  }: PageSpeedLabDataModel): LabDataEntity { 
    const e = new LabDataEntity();
    e.url = url;
    e.deviceType = deviceType;
    e.cumulativeLayoutShift = cumulativeLayoutShift;
    e.firstContentfulPaint = firstContentfulPaint;
    e.firstContentfulPaint3g = firstContentfulPaint3g ? firstContentfulPaint3g : 0;
    e.speedIndex = speedIndex;
    e.timeToInteractive = timeToInteractive;
    e.totalBlockingTime = totalBlockingTime;
    e.networkRtt = networkRtt;
    e.totalByteWeight = totalByteWeight;
    e.timeToFirstByte = timeToFirstByte;
    e.firstMeaningfulPaint = firstMeaningfulPaint;
    return e;
  }
}