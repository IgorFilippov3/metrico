import { MetricDataType } from "@app/_core/models/metric-data-type.enum";
import { UpdateWay } from "@app/_core/models/update-way.enum";
import { UpdatePageFormModel } from "./update-page-form.model";

export class UpdatePageDto {
  url: string;
  collectDataTypes: MetricDataType[];
  updateWay: UpdateWay;
  name: string;

  static fromForm({
    url,  fieldData, labData, codeCoverage, name, updateWay
  }: UpdatePageFormModel): UpdatePageDto {
    const dto = new UpdatePageDto();
    dto.url = url;
    dto.name = name;
    dto.collectDataTypes = [];
    dto.updateWay = updateWay;
    if (fieldData) dto.collectDataTypes.push(MetricDataType.FIELD_DATA);
    if (labData) dto.collectDataTypes.push(MetricDataType.LAB_DATA);
    if (codeCoverage) dto.collectDataTypes.push(MetricDataType.CODE_COVERAGE);
    return dto;
  }
}