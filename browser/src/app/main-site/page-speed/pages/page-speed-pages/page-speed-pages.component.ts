import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MetricDataType } from "@app/_core/models/metric-data-type.enum";

@Component({
  selector: "mt-page-speed-pages",
  template: `
    <mt-pages-list 
      [linkPattern]="linkPattern" 
      [metricDataType]="metricDataType">
    </mt-pages-list>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSpeedPagesComponent {
  linkPattern: string = "/user-experience/";
  metricDataType: MetricDataType = MetricDataType.FIELD_DATA;
}