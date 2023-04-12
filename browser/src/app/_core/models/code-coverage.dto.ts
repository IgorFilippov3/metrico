import { DeviceType } from "./device-type.enum";

export interface CodeCoverageDto {
  id: number;
  url: string;
  deviceType: DeviceType;
  comment: string;
  bytes: number;
  unusedBytes: number;
  collectedAt: string;
}