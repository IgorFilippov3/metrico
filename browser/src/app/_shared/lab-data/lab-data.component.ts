import { ChangeDetectionStrategy, Component, Input, OnChanges } from "@angular/core";
import { LabDataInput } from "./models/lab-data-input.model";
import { LabDataUi, LabDataUiItem } from "./models/lad-data-ui.model";

@Component({
  selector: "mt-lab-data",
  templateUrl: "./lab-data.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabDataComponent implements OnChanges {
  @Input() inputData: LabDataInput;

  uiData: LabDataUi;
  view: [number, number] = [700, 300];
  colorScheme = { domain: ["#5e72e4"] };
  yScaleMin: number = 0;
  yScaleMax: number;

  ngOnChanges(): void {
    this.uiData = LabDataUi.of(this.inputData);
    this.yScaleMax = this.getYScaleMax(this.uiData.series);
  }

  private getYScaleMax(items: LabDataUiItem[]): number {
    return (Math.max(...items.map(item => item.value))) * 2;
  }
}