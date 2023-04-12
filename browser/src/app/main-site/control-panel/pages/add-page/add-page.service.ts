import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NotificationsService } from "@app/_core/services/notifications.service";
import { EMPTY, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { CreatePageDto } from "./models/create-page.dto";
import { PageDto } from "@app/_core/models/page.dto";
import { PagesListViewRequest } from "@app/_core/models/pages-list/pages-list-view-request.model";
import { PagesApiService } from "@app/_core/services/pages-api.service";

@Injectable()
export class AddPageService {
  constructor(
    private pagesApiService: PagesApiService,
    private notifcationsService: NotificationsService,
  ) { }

  createPage(dto: CreatePageDto): Observable<PageDto> {
    return this.pagesApiService.createPage(dto)
      .pipe(
        catchError(({ error }: HttpErrorResponse) => {
          this.notifcationsService.error(error.message);
          return EMPTY;
        })
      )
  }

  loadPages(): Observable<PageDto[]> {
    const viewRequest = new PagesListViewRequest();
    viewRequest.pageSize = 100;
    return this.pagesApiService.getUserPages(viewRequest)
      .pipe(
        catchError(({ error }: HttpErrorResponse) => {
          this.notifcationsService.error(error.message);
          return EMPTY;
        })
      )
  }
}