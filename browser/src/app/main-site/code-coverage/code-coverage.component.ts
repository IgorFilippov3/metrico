import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "mt-code-coverage",
  templateUrl: "./code-coverage.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeCoverageComponent {}