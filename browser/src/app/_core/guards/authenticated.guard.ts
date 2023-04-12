import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { UserService } from "@app/_core/services/user.service";
import { Observable } from "rxjs";
import { map, } from "rxjs/operators";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private userService: UserService,
  ) {}

  canActivate(): Observable<boolean> {
    return this.userService.isAuthenticated$
      .pipe(
        map((isAuthenticated: boolean) => {
          if (!isAuthenticated) {
            window.location.href = "/about";
            return false;
          }
          
          return true;
        })
      );
  }
}