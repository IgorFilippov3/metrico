import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { ReCAPTCHA } from "@app/_core/models/grecaptcha.model";
import { InjectorServiceResult } from "@app/_core/models/injector-service-result.model";
import { NotificationsService } from "@app/_core/services/notifications.service";
import { ScriptInjectorService } from "@app/_core/services/script-injector.service";
import { EMPTY, Subject } from "rxjs";
import { catchError, takeUntil } from "rxjs/operators";

@Component({
  selector: "jr-grecaptcha",
  template: `
    <div class="form-group grecaptcha">
      <div class="g-recaptcha form-group" id="jr-grecaptcha-v2"></div>
    </div>
  `,
  styles: [`
    .grecaptcha {
      display: flex;
      justify-content: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GrecaptchaComponent implements OnInit, OnDestroy {
  @Output() onSuccess: EventEmitter<string> = new EventEmitter();
  captchaID: number;
  private isDestroyed$: Subject<void> = new Subject();

  constructor(
    private scriptInjector: ScriptInjectorService,
    private notifications: NotificationsService,
  ) {}

  ngOnInit(): void {
    this.scriptInjector
      .inject<ReCAPTCHA>({
        src: "https://www.google.com/recaptcha/api.js?render=explicit",
        globalVarName: "grecaptcha",
        globalVarNameMethods: ["render"]
      })
      .pipe(
        catchError(errorInfo => {
          this.notifications.error(errorInfo.result);
          return EMPTY;
        }),
        takeUntil(this.isDestroyed$)
      )
      .subscribe(({ result }: InjectorServiceResult<ReCAPTCHA>) => this.renderCaptcha(result));
  }

  
  private renderCaptcha(grecaptcha: ReCAPTCHA): void {
    this.captchaID = grecaptcha.render("jr-grecaptcha-v2", {
      "sitekey": "sitekey-removed",
      "theme": "light",
      "callback": (captchaVerifyValue) => {
        this.onSuccess.emit(captchaVerifyValue);
      }
    });
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }
}