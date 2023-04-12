import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserService } from "../services/user.service";

@Injectable()
export class AnonymousGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userService.isAuthenticated$
      .pipe(
        map((isAuthenticated: boolean) => {
          if (isAuthenticated) {
            return this.router.parseUrl("/panel/pages");
          }
          return true;
        })
      );
  }
}