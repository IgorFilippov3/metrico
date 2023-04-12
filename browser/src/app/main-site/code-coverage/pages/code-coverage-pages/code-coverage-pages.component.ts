import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MetricDataType } from "@app/_core/models/metric-data-type.enum";

@Component({
  selector: "mt-code-coverage-pages",
  template: `
    <mt-pages-list 
      [linkPattern]="linkPattern" 
      [metricDataType]="metricDataType">
    </mt-pages-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeCoveragePagesComponent {
  linkPattern: string = "/code-coverage/";
  metricDataType: MetricDataType = MetricDataType.CODE_COVERAGE;
}