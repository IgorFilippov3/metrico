import { UpdateWay } from "@app/_core/models/update-way.enum";
import { MetricDataType } from "./metric-data-type.enum";

export class PageDto {
  id: number;
  url: string;
  collectDataTypes: MetricDataType[];
  updateWay: UpdateWay;
  name: string;

  static empty(): PageDto {
    return new PageDto();
  }
}