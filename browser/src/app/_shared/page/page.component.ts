import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "mt-page",
  templateUrl: "./page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  @Input() backLink: string;
}