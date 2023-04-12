import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "@app/_core/services/user.service";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Subscription } from "../models/subscription.enum";
import { UserModel } from "../models/user.model";

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean> {
    return this.userService.getCurrentUserFromApi()
      .pipe(
        map((user: UserModel) => {
          return user?.subscription !== Subscription.essential
            && user?.subscription !== Subscription.basic;
        }),
        tap((isUserWithoutSubscription: boolean) => {
          if (!isUserWithoutSubscription) {
            // if user has already subscription, redirect to app
            this.router.navigate(["/panel/pages"]);
          }
        }),
      );
  }
}