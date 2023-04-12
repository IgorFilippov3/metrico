import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";
import { SocialType } from "./models/social-type.enum";

@Component({
  selector: "mt-social",
  templateUrl: "./social.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialComponent {
  SocialType = SocialType;

  @Output() onSocialClick: EventEmitter<SocialType> = new EventEmitter();

  socialItemClick(type: SocialType): void {
    this.onSocialClick.emit(type);
  }
}