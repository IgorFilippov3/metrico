import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { LoginService } from "@app/auth/login/login.service";
import { NotificationsService } from "@app/_core/services/notifications.service";
import { LoginUserDto } from "@app/auth/models/login-user.dto";
import { isEmailValid } from "@app/_core/utils";
import { SocialType } from "@app/_shared/social/models/social-type.enum";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Subscription } from "@app/_core/models/subscription.enum";

@Component({
  selector: "mt-login",
  templateUrl: "./login.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isFormSubmitted: boolean = false;
  // subscription: Subscription = null;

  private isDestroyed$: Subject<void> = new Subject();

  constructor(
    private builder: FormBuilder,
    private loginService: LoginService,
    private notificationsService: NotificationsService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = this.createForm();
    // this.route.queryParams
    //   .pipe(takeUntil(this.isDestroyed$))
    //   .subscribe((queryParams: Params) => {
    //     this.subscription = queryParams["subscription"];
    //   });
  }

  handleSocialClick(type: SocialType): void {
    if (type === SocialType.GOOGLE) {
      this.signupWithGoogle();
    }
  }

  signupWithGoogle(): void {
    this.loginService.getGoogleOAuthUrl(undefined)
      .subscribe((data: { url: string }) => {
        window.location.href = data.url;
      });
  }

  activateCaptcha(): void {
    this.isFormSubmitted = true;
    this.changeDetector.markForCheck();
  }

  login(): void {
    const { email, password } = this.form.value;
    const dto: LoginUserDto = { email, password };
    this.loginService.login(dto)
      .subscribe({
        next: () => {
          this.notificationsService.success("Welcome back!");
          this.router.navigate(["/"]);
        },
        complete: () => {
          this.isFormSubmitted = false;
          this.changeDetector.markForCheck();
        }
      });
  }

  toSignupForm(): void {
    this.router.navigate(["/action/auth/signup"]);
  }

  private createForm(): FormGroup {
    return this.builder.group({
      email: new FormControl("", [Validators.required, this.emailFieldValidator]),
      password: new FormControl("", [Validators.required, this.passwordFieldValidator]),
    });
  }

  private emailFieldValidator(field: AbstractControl): Validators | null {
    return field.value && isEmailValid(field.value)
      ? null
      : { other: "Invalid email format" };
  }

  private passwordFieldValidator(field: AbstractControl): Validators | null {
    return field.value && field.value.length >= 8
      ? null
      : { other: "Password should have at least 8 characters" };
  }
}