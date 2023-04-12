import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "mt-page-speed",
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSpeedComponent {}