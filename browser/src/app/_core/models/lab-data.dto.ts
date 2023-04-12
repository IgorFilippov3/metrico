import { DeviceType } from "./device-type.enum";

export interface LabDataDto {
  id: number;
  url: string;
  deviceType: DeviceType;
  cumulativeLayoutShift: number;
  firstContentfulPaint: number;
  firstContentfulPaint3g: number;
  speedIndex: number;
  timeToInteractive: number;
  totalBlockingTime: number;
  networkRtt: number;
  totalByteWeight: number;
  timeToFirstByte: number;
  firstMeaningfulPaint: number;
  collectedAt: string;
  comment: string;
}