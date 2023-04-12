import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MetricDataType } from "@app/_core/models/metric-data-type.enum";

@Component({
  selector: "mt-lighthouse-pages",
  template: `
    <mt-pages-list 
      [linkPattern]="linkPattern" 
      [metricDataType]="metricDataType">
    </mt-pages-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LighthousePagesComponent {
  linkPattern: string = "/lighthouse/";
  metricDataType: MetricDataType = MetricDataType.LAB_DATA;
}