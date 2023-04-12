import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NotificationsService } from "@app/_core/services/notifications.service";
import { EMPTY, Observable } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { LoginUserDto } from "@app/auth/models/login-user.dto";
import { AuthApiService } from "@app/_core/services/auth-api.service";
import { UserService } from "@app/_core/services/user.service";
import { Subscription } from "@app/_core/models/subscription.enum";

@Injectable()
export class LoginService {
  constructor(
    private authApi: AuthApiService,
    private notifcationsService: NotificationsService,
    private userService: UserService,
  ) { }

  login(dto: LoginUserDto): Observable<void> {
    return this.authApi.login(dto)
      .pipe(
        catchError(({ error }: HttpErrorResponse) => {
          this.notifcationsService.error(error.message);
          return EMPTY;
        }),
        switchMap(() => this.userService.updateUserServiceState())
      )
  }

  getGoogleOAuthUrl(subscription: Subscription): Observable<{ url: string }> {
    return this.authApi.getGoogleOAuthUrl(subscription)
    .pipe(
      catchError(({ error }: HttpErrorResponse) => {
        this.notifcationsService.error(error.message);
        return EMPTY;
      })
    )
  }
}