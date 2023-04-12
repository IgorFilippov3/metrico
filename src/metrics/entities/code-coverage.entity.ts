
import { PageEntity } from "src/pages/page.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DeviceType } from "../models/device-type.enum";
import { PageSpeedLabDataModel } from "../models/page-speed.model";

@Entity({
  name: "code_coverages"
})
export class CodeCoverageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  deviceType: DeviceType;

  @Column({ default: null })
  comment: string;

  @Column({ nullable: true, default: null })
  bytes: number;

  @Column({ nullable: true, default: null })
  unusedBytes: number;

  @ManyToOne(
    type => PageEntity,
    page => page.codeCoverages, { eager: false, onDelete: "CASCADE" }
  )
  page: PageEntity;

  @CreateDateColumn({
    type: "timestamp with time zone",
  })
  created_at: Date;

  static of(
    page: PageEntity, 
    url: string, deviceType: DeviceType, 
    labData: PageSpeedLabDataModel, 
    comment?: string
  ) {
    const c = new CodeCoverageEntity();
    c.page = page;
    c.url = url;
    c.deviceType = deviceType;
    c.bytes = labData.bytes;
    c.unusedBytes = labData.unusedBytes;
    if (comment) c.comment = comment;
    return c;
  }
}