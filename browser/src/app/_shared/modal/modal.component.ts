import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "mt-modal",
  template: "./modal.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {}