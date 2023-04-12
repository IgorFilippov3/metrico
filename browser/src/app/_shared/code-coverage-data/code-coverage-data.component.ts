import { ChangeDetectionStrategy, Component, Input, OnChanges } from "@angular/core";
import { CodeCoverageInput } from "./models/code-coverage-input.model";
import { CodeCoverageUi, CodeCoverageUiItem } from "./models/code-coverage-ui.model";

@Component({
  selector: "mt-code-coverage-data",
  templateUrl: "./code-coverage-data.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeCoverageDataComponent implements OnChanges {
  @Input() inputData: CodeCoverageInput;

  uiData: CodeCoverageUi;
  view: [number, number] = [700, 300];
  colorScheme = { domain: ["#5e72e4"] };
  yScaleMin: number = 0;
  yScaleMax: number;

  ngOnChanges(): void {
    this.uiData = CodeCoverageUi.of(this.inputData);
    this.yScaleMax = this.getYScaleMax(this.uiData.series);
  }

  private getYScaleMax(items: CodeCoverageUiItem[]): number {
    return (Math.max(...items.map(item => item.value))) * 2;
  }
}