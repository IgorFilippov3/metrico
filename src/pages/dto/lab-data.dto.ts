import { LabDataEntity } from "src/metrics/entities/lab-data.entity";
import { DeviceType } from "src/metrics/models/device-type.enum";

export class LabDataDto {
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
  collectedAt: Date;
  comment: string;
  
  static fromEntity(entity: LabDataEntity): LabDataDto {
    const dto = new LabDataDto();
    dto.id = entity.id;
    dto.url = entity.url;
    dto.deviceType = entity.deviceType;
    dto.cumulativeLayoutShift = entity.cumulativeLayoutShift;
    dto.firstContentfulPaint = entity.firstContentfulPaint;
    dto.firstContentfulPaint3g = entity.firstContentfulPaint3g;
    dto.speedIndex = entity.speedIndex;
    dto.timeToInteractive = entity.timeToInteractive;
    dto.totalBlockingTime = entity.totalBlockingTime;
    dto.networkRtt = entity.networkRtt;
    dto.totalByteWeight = entity.totalByteWeight;
    dto.timeToFirstByte = entity.timeToFirstByte;
    dto.firstMeaningfulPaint = entity.firstMeaningfulPaint;
    dto.collectedAt = entity.created_at;
    dto.comment = entity.comment;
    return dto;
  }
}