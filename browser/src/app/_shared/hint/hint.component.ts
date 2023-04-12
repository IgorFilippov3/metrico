import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "mt-hint",
  templateUrl: "./hint.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HintComponent {
  @Input() text: string;
}