import { ChangeDetectionStrategy, Component } from "@angular/core";


@Component({
  selector: "mt-lighthouse",
  templateUrl: "./lighthouse.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LighthouseComponent {}