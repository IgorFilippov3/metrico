import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "mt-loader",
  templateUrl: "./loader.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {}