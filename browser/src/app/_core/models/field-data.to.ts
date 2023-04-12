import { DeviceType } from "./device-type.enum";

export interface FieldDataDto {
  id: number
  url: string;
  deviceType: DeviceType;
  cumulativeLayoutShift: FieldDataItemDto;
  firstContentfulPaint: FieldDataItemDto;
  firstInputDelay: FieldDataItemDto;
  largestContentfulPaint: FieldDataItemDto;
  collectedAt: string;
  comment: string;
}

export interface FieldDataItemDto {
  value: number;
  good: number;
  average: number;
  bad: number;
}