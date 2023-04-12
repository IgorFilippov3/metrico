import { DeviceType } from "./device-type.enum";

export interface GetPageLabDataDto {
  pageId: number;
  deviceType: DeviceType; 
  from: string; //ISOString
  to: string; // ISOString
}