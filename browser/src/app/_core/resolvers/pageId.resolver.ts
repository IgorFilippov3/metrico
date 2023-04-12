import { Inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { NotificationsService } from "@app/_core/services/notifications.service";
import { Observable, of } from "rxjs";

export class PageIdResolver implements Resolve<number> {

  constructor(
    private notificationsService: NotificationsService,
    private router: Router,
    @Inject("errorText") private errorText: string,
    @Inject("redirectRoute") private redirectRoute: string,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<number> {
    const param: string = route.params["id"];
    const pageId: number = Number(param);
    if (isNaN(pageId)) {
      this.notificationsService.error(this.errorText);
      this.router.navigate([this.redirectRoute]);
      return of(null);
    } else {
      return of(pageId);
    }
  }
}