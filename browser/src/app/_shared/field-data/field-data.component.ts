import { ChangeDetectionStrategy, Component, Input, OnChanges } from "@angular/core";
import { FieldDataInputMetric, FieldDataInputMetricSeries } from "./models/field-data-input.model";

@Component({
  selector: "mt-field-data",
  templateUrl: "./field-data.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldDataComponent implements OnChanges {
  @Input() input: FieldDataInputMetric[];

  view: [number, number] = [700, 300];
  colorScheme = { domain: ["#0cce6b", "#ffa400", "#ff4e42"] };
  yScaleMin: number;
  yScaleMax: number;

  uiData: any[];

  ngOnChanges(): void {
    const [good, average, bad] = this.input;
    this.uiData = [good, average, bad];
    this.yScaleMin = 0;
    this.yScaleMax = this.getYScaleMax([...good.series, ...average.series, ...bad.series]);
  }

  private getYScaleMax(items: FieldDataInputMetricSeries[]): number {
    return (Math.max(...items.map(item => item.value))) * 2;
  }
}