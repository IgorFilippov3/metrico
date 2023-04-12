import { ChangeDetectionStrategy, Component, Input, OnChanges } from "@angular/core";
import { MONTHS } from "@app/_core/catalogs/months.catalog";
import { RuntimePerfInputData, RuntimePerfInputModel } from "./models/runtime-perf-input.model";

@Component({
  selector: "mt-runtime-perf-data",
  templateUrl: "./runtime-perf-data.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RuntimePerfDataComponent implements OnChanges {
  @Input() inputData: RuntimePerfInputModel;

  view: [number, number] = [700, 300];
  colorScheme = { domain: ["#5e72e4"] };
  yScaleMin: number = 0;
  yScaleMax: number;

  ngOnChanges(): void {
    this.yScaleMax = this.getYScaleMax(this.inputData.series);
  }

  private getYScaleMax(items: RuntimePerfInputData[]): number {
    return (Math.max(...items.map(item => item.value))) * 2;
  }
}