import { DeviceType } from "aws-sdk/clients/ec2";
import { FieldDataEntity } from "src/metrics/entities/field-data.entity";
import { PageSpeedFieldDataMetricModel } from "src/metrics/models/page-speed.model";

export class FieldDataDto {
  id: number
  url: string;
  deviceType: DeviceType;
  cumulativeLayoutShift: FieldDataItemDto;
  firstContentfulPaint: FieldDataItemDto;
  firstInputDelay: FieldDataItemDto;
  largestContentfulPaint: FieldDataItemDto;
  collectedAt: Date;
  comment: string;

  static fromEntity({
    id,
    url,
    deviceType,
    cumulativeLayoutShift,
    firstContentfulPaint,
    firstInputDelay,
    largestContentfulPaint,
    created_at,
    updated_at,
    comment,
  }: FieldDataEntity): FieldDataDto {
    const data = new FieldDataDto();
    data.id = id;
    data.url = url;
    data.deviceType = deviceType;
    data.cumulativeLayoutShift =  cumulativeLayoutShift
      ? FieldDataItemDto.of(cumulativeLayoutShift)
      : null;
    data.firstContentfulPaint = firstContentfulPaint
      ? FieldDataItemDto.of(firstContentfulPaint)
      : null;
    data.firstInputDelay = firstInputDelay 
      ? FieldDataItemDto.of(firstInputDelay)
      : null;
    data.largestContentfulPaint = largestContentfulPaint
      ? FieldDataItemDto.of(largestContentfulPaint)
      : null;
    data.collectedAt = updated_at ? updated_at : created_at;
    data.comment = comment;
    return data;
  }
}

export class FieldDataItemDto {
  value: number;
  good: number;
  average: number;
  bad: number;

  static of({ value, good, average, bad }: PageSpeedFieldDataMetricModel): FieldDataItemDto {
    const item = new FieldDataItemDto();
    item.value = value;
    item.good = good;
    item.average = average;
    item.bad = bad;
    return item;
  }
}