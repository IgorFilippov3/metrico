import { CodeCoverageEntity } from "src/metrics/entities/code-coverage.entity";
import { DeviceType } from "src/metrics/models/device-type.enum";

export class CodeCoverageDto {
  id: number;
  url: string;
  deviceType: DeviceType;
  comment: string;
  bytes: number;
  unusedBytes: number;
  collectedAt: Date;

  static of({ id, url, deviceType, comment, bytes, unusedBytes, created_at }: CodeCoverageEntity) {
    const c = new CodeCoverageDto();
    c.id = id;
    c.url = url;
    c.deviceType = deviceType;
    c.comment = comment;
    c.bytes = bytes;
    c.unusedBytes = unusedBytes;
    c.collectedAt = created_at;
    return c;
  }
}