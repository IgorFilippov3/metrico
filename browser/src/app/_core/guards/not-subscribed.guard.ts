import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { UserService } from "@app/_core/services/user.service";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Subscription } from "../models/subscription.enum";
import { UserModel } from "../models/user.model";

@Injectable()
export class NotSubscribedGuard implements CanActivate {
  constructor(
    private userService: UserService,
  ) { }

  canActivate(): Observable<boolean> {
    return this.userService.getCurrentUserFromApi()
      .pipe(
        map((user: UserModel) => {
          return user.subscription === Subscription.essential || user.subscription === Subscription.basic;
        }),
        tap((hasSubscription: boolean) => {
          if (!hasSubscription) {
            window.location.href = "/pricing";
          }
        }),
      );
  }
}