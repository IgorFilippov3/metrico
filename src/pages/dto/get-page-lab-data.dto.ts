import { DeviceType } from "aws-sdk/clients/ec2";

export class GetPageLabDataDto {
  pageId: number;
  deviceType: DeviceType; 
  from: string; //ISOString
  to: string; // ISOString

  static of(pageId: number, deviceType: DeviceType, from: string, to: string): GetPageLabDataDto {
    const d = new GetPageLabDataDto();
    d.pageId = pageId;
    d.deviceType = deviceType;
    d.from = from;
    d.to = to;
    return d;
  }
}