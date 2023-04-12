import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "@app/auth/login/login.component";
import { SignupComponent } from "@app/auth/signup/signup.component";
import { AnonymousGuard } from "@app/_core/guards/anonymous.guard";
import { ConfirmComponent } from "./confirm/confirm.component";

const routes: Routes = [
  {
    path: "signup",
    component: SignupComponent,
    canActivate: [AnonymousGuard],
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AnonymousGuard],
  },
  {
    path: "signup/confirm/:hash",
    component: ConfirmComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}