import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TuiButtonModule, TuiTextfieldControllerModule } from "@taiga-ui/core";
import { TuiFieldErrorModule, TuiInputModule, TuiInputPasswordModule } from "@taiga-ui/kit";
import { AuthRoutingModule } from "@app/auth/auth-routing.module";
import { SignupComponent } from "@app/auth/signup/signup.component";
import { LoginComponent } from "@app/auth/login/login.component";
import { ConfirmComponent } from "./confirm/confirm.component";
import { GrecaptchaModule } from "@app/_shared/grecaptcha/grecaptcha.module";
import { SocialModule } from "@app/_shared/social/social.module";

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiFieldErrorModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    GrecaptchaModule,
    SocialModule,
  ],
  declarations: [
    SignupComponent,
    LoginComponent,
    ConfirmComponent,
  ],
})
export class AuthModule { }