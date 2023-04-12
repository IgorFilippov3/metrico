import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { SignupService } from "@app/auth/signup/signup.service";
import { Subscription } from "@app/_core/models/subscription.enum";
import { SocialType } from "@app/_shared/social/models/social-type.enum";

@Component({
  selector: "mt-signup",
  templateUrl: "./signup.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SignupService]
})
export class SignupComponent implements OnInit {

  // form: FormGroup;
  // userEmail: string = "";
  subscription: Subscription;

  constructor(
    private signupService: SignupService,
  ) { }

  ngOnInit(): void {
    this.subscription = Subscription.basic;
  }

  handleSocialClick(type: SocialType): void {
    if (type === SocialType.GOOGLE) {
      this.signupWithGoogle();
    }
  }

  signupWithGoogle(): void {
    this.signupService.getGoogleOAuthUrl(this.subscription)
      .subscribe((data: { url: string }) => {
        window.location.href = data.url;
      });
  }

  // createUser(): void {
  //   const { name: username, email, password } = this.form.value;

  //   const dto: CreateUserDto = { username, email, password };
  //   this.signupService.createUser(dto)
  //     .subscribe({
  //       next: () => {
  //         this.notificationsService.success("Your account was created!");
  //         this.userEmail = email;
  //         this.changeDetector.markForCheck();
  //       }
  //     });
  // }

  // private createForm(): FormGroup {
  //   return this.builder.group({
  //     name: new FormControl("", [Validators.required, this.nameFieldValidator]),
  //     email: new FormControl("", [Validators.required, this.emailFieldValidator]),
  //     password: new FormControl("", [Validators.required, this.passwordFieldValidator]),
  //   });
  // }

  // private nameFieldValidator(field: AbstractControl): Validators | null {
  //   return field.value && field.value.length >= 8
  //     ? null
  //     : { other: "Name should have at least 8 characters" };
  // }

  // private emailFieldValidator(field: AbstractControl): Validators | null {
  //   return field.value && isEmailValid(field.value)
  //     ? null
  //     : { other: "Invalid email format" };
  // }

  // private passwordFieldValidator(field: AbstractControl): Validators | null {
  //   return field.value && field.value.length >= 8
  //     ? null
  //     : { other: "Password should have at least 8 characters" };
  // }
}