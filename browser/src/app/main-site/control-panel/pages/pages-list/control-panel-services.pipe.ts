import { Pipe, PipeTransform } from "@angular/core";
import { MetricDataType } from "@app/_core/models/metric-data-type.enum";

@Pipe({ name: "services" })
export class ControlPanelServicesPipe implements PipeTransform {
  transform(collectDataTypes: MetricDataType[]): string {
    return collectDataTypes
      .map((type: MetricDataType) => {
        return `<div class="pages__service">${MetricDataType.getDisplayName(type)}</div>`;
      }).join("\n");
  }
}