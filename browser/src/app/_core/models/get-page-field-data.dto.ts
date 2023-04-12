import { DeviceType } from "./device-type.enum";

export interface GetPageFieldDataDto {
  pageId: number;
  deviceType: DeviceType; 
  from: string; //ISOString
  to: string; // ISOString
}