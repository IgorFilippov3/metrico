import { MetricDataType } from "src/_common/models/metric-data-type";
import { UpdateWay } from "../models/update-way.enum";

export class CreatePageDto {
  url: string;
  collectDataTypes: MetricDataType[];
  name: string;
  updateWay: UpdateWay;

  static of(
    url: string, 
    collectDataTypes: MetricDataType[], 
    name: string
  ): CreatePageDto {
    const d = new CreatePageDto();
    d.url = url;
    d.collectDataTypes = collectDataTypes;
    d.name = name;
    return d;
  }
}