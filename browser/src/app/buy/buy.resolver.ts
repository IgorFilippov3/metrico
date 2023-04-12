import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Subscription } from "@app/_core/models/subscription.enum";
import { Observable, of } from "rxjs";

@Injectable()
export class BuyResolver implements Resolve<Subscription> {

  constructor(private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Subscription> {
    const subscription: Subscription = route.queryParams["subscription"];

    if (!Subscription.isValid(subscription)) {
      this.router.navigate(["/not-found"]);
    }

    return of(subscription);
  }
}