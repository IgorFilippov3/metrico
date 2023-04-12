import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "mt-not-found",
  templateUrl: "./not-found.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}