import { Injectable } from "@angular/core";
import { AuthApiService } from "@app/_core/services/auth-api.service";
import { EMPTY, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { CreateUserDto } from "@app/auth/models/create-user.dto";
import { HttpErrorResponse } from "@angular/common/http";
import { NotificationsService } from "@app/_core/services/notifications.service";
import { Subscription } from "@app/_core/models/subscription.enum";

@Injectable()
export class SignupService {
  constructor(
    private authApi: AuthApiService,
    private notifcationsService: NotificationsService,
  ) { }

  createUser(dto: CreateUserDto): Observable<void> {
    return this.authApi.createUser(dto)
      .pipe(
        catchError(({ error }: HttpErrorResponse) => {
          this.notifcationsService.error(error.message);
          return EMPTY;
        })
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