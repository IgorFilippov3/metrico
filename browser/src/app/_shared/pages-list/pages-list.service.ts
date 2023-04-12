import { HttpParams } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { PageDto } from "@app/_core/models/page.dto";
import { PagesListData } from "@app/_core/models/pages-list/pages-list-data.model";
import { PagesListViewRequest } from "@app/_core/models/pages-list/pages-list-view-request.model";
import { MtHttpClientService } from "@app/_core/services/mt-http-client.service";
import { NotificationsService } from "@app/_core/services/notifications.service";
import { BehaviorSubject, EMPTY, forkJoin, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class PagesListService implements OnDestroy {
  private pagesListDataSource: BehaviorSubject<PagesListData> = new BehaviorSubject(null);
  pagesListData$: Observable<PagesListData> = this.pagesListDataSource.asObservable();

  constructor(
    private httpService: MtHttpClientService,
    private notificationsService: NotificationsService,
  ) { }

  loadPagesListData(viewRequest: PagesListViewRequest): void {
    forkJoin([
      this.loadPages(viewRequest),
      this.loadPagesCount(viewRequest)
    ])
    .subscribe(([pages, pagesCount]: [PageDto[], number]) => {
      const data = new PagesListData();
      data.viewRequest = viewRequest;
      data.pages = pages;
      data.pagesCount = pagesCount;
      this.pagesListDataSource.next(data);
    });
  }

  private loadPages(viewRequest: PagesListViewRequest): Observable<PageDto[]> {
    let params: HttpParams = new HttpParams();
    params = params.append("dataType", viewRequest.dataType);

    const offset: number = (viewRequest.page - 1) * viewRequest.pageSize;
    params = params.set("offset", offset.toString());
    params = params.set("limit", viewRequest.pageSize.toString());

    return this.httpService.get<PageDto[]>("/pages", params)
      .pipe(
        catchError(() => {
          this.notificationsService.error("Unable to fetch pages");
          return EMPTY;
        })
      )
  }

  private loadPagesCount(viewRequest: PagesListViewRequest): Observable<number> {
    let params: HttpParams = new HttpParams();
    params = params.append("dataType", viewRequest.dataType);

    return this.httpService.get<number>("/pages/count", params)
      .pipe(
        catchError(() => {
          this.notificationsService.error("Unable to fetch pages count");
          return EMPTY;
        })
      )
  }

  ngOnDestroy(): void {
    this.pagesListDataSource.complete();
  }
}