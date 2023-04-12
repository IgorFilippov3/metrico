import { DeviceType } from "./device-type.enum";

export interface GetPageCodeCoverageDataDto {
  pageId: number;
  deviceType: DeviceType; 
  from: string; //ISOString
  to: string; // ISOString
}