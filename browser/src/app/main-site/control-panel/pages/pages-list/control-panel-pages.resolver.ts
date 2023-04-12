import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Params, Resolve } from "@angular/router";
import { PagesListViewRequest } from "@app/_core/models/pages-list/pages-list-view-request.model";
import { Observable, of } from "rxjs";

@Injectable()
export class ControlPanelPagesResolver implements Resolve<PagesListViewRequest> {

  resolve(route: ActivatedRouteSnapshot): Observable<PagesListViewRequest> {
    const viewRequest = new PagesListViewRequest();
    const queryParams: Params = route.queryParams;

    if (queryParams.page && queryParams.page > 0) {
      viewRequest.page = +queryParams.page;
    }
    
    return of(viewRequest);
  }
}