import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "mt-main-site",
  templateUrl: "./main-site.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSiteComponent {}