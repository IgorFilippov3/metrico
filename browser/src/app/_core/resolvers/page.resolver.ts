import { Inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { PageDto } from "@app/_core/models/page.dto";
import { NotificationsService } from "@app/_core/services/notifications.service";
import { PagesApiService } from "@app/_core/services/pages-api.service";

export class PageResolver implements Resolve<PageDto> {
  constructor(
    private notificationsService: NotificationsService,
    private pagesApiService: PagesApiService,
    private router: Router,
    @Inject("redirectRoute") private redirectRoute: string,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<PageDto> {
    const param: string = route.params["id"];
    const pageId: number = Number(param);

    if (isNaN(pageId)) {
      this.notificationsService.error("Invalid page id.");
      this.router.navigate([this.redirectRoute]);
      return of(null);
    } else {
      return this.pagesApiService.getUserPage(pageId)
        .pipe(
          catchError((e) => {
            console.error(e);
            this.notificationsService.error("Unable to get this page.");
            this.router.navigate([this.redirectRoute]);
            return of(null);
          }),
        );
    }
  }
}