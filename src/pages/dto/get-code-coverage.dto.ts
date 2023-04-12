import { DeviceType } from "aws-sdk/clients/ec2";

export class GetPageCodeCoverageDto {
  pageId: number;
  deviceType: DeviceType; 
  from: string; //ISOString
  to: string; // ISOString

  static of(pageId: number, deviceType: DeviceType, from: string, to: string): GetPageCodeCoverageDto {
    const d = new GetPageCodeCoverageDto();
    d.pageId = pageId;
    d.deviceType = deviceType;
    d.from = from;
    d.to = to;
    return d;
  }
}