import { DeviceType } from "aws-sdk/clients/ec2";

export class GetPageFieldDataDto {
  pageId: number;
  deviceType: DeviceType; 
  from: string; //ISOString
  to: string; // ISOString

  static of(pageId: number, deviceType: DeviceType, from: string, to: string): GetPageFieldDataDto {
    const d = new GetPageFieldDataDto();
    d.pageId = pageId;
    d.deviceType = deviceType;
    d.from = from;
    d.to = to;
    return d;
  }
}