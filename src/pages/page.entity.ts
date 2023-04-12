import { UserEntity } from "src/users/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CreatePageDto } from "src/pages/dto/create-page.dto";
import { LabDataEntity } from "src/metrics/entities/lab-data.entity";
import { FieldDataEntity } from "src/metrics/entities/field-data.entity";
import { MetricDataType } from "src/_common/models/metric-data-type";
import { LabDataReportEntity } from "src/metrics/entities/lab-data-report.entity";
import { UpdateWay } from "./models/update-way.enum";
import { CodeCoverageEntity } from "src/metrics/entities/code-coverage.entity";
import { CodeCoverageDetailsEntity } from "src/metrics/entities/code-coverage-details.entity";

@Entity({
  name: "pages"
})
export class PageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  url: string;

  @Column("text", { array: true })
  collectDataTypes: MetricDataType[];

  @Column({
    default: UpdateWay.HOOK
  })
  updateWay: UpdateWay;

  @ManyToOne(
    type => UserEntity,
    userEntity => userEntity.pages, { eager: false, onDelete: "CASCADE" }
  )
  user: UserEntity;

  @OneToMany(
    type => LabDataEntity,
    labData => labData.page, { eager: false, onDelete: "CASCADE" }
  )
  labDatas: LabDataEntity[];

  @OneToMany(
    type => FieldDataEntity,
    fieldData => fieldData.page, { eager: false, onDelete: "CASCADE" }
  )
  fieldDatas: FieldDataEntity[];

  @OneToMany(
    type => LabDataReportEntity,
    labDataReport => labDataReport.page, { eager: false, onDelete: "CASCADE" }
  )
  labDataReports: LabDataReportEntity[];

  @OneToMany(
    type => CodeCoverageEntity,
    coverage => coverage.page, { eager: false, onDelete: "CASCADE" }
  )
  codeCoverages: CodeCoverageEntity[];

  @OneToMany(
    type => CodeCoverageDetailsEntity,
    coverage => coverage.page, { eager: false, onDelete: "CASCADE" }
  )
  codeCoverageDetails: CodeCoverageDetailsEntity[];

  @Column()
  userId: number;

  @Column({
    default: null,
    type: "timestamp with time zone",
  })
  lastUpdate: Date;

  includesDataType(type: MetricDataType): boolean {
    return this.collectDataTypes.includes(type);
  }

  static createEntity(user: UserEntity, {
    url, collectDataTypes, name, updateWay
  }: CreatePageDto): PageEntity {
    const page = new PageEntity();
    page.url = url;
    page.collectDataTypes = collectDataTypes;
    page.name = name;
    page.user = user;
    page.updateWay = updateWay;
    return page;
  }
}