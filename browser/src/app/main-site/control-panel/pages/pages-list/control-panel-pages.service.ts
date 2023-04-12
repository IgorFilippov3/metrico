import { Injectable, OnDestroy } from "@angular/core";
import { PageDto } from "@app/_core/models/page.dto";
import { PagesListData } from "@app/_core/models/pages-list/pages-list-data.model";
import { PagesListViewRequest } from "@app/_core/models/pages-list/pages-list-view-request.model";
import { NotificationsService } from "@app/_core/services/notifications.service";
import { BehaviorSubject, EMPTY, forkJoin, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { PagesApiService } from "@app/_core/services/pages-api.service";

@Injectable()
export class ControlPanelPagesService implements OnDestroy {
  private pagesListDataSource: BehaviorSubject<PagesListData> = new BehaviorSubject(null);
  pagesListData$: Observable<PagesListData> = this.pagesListDataSource.asObservable();

  constructor(
    private pagesApiService: PagesApiService,
    private notificationsService: NotificationsService,
  ) {}

  loadPagesListData(viewRequest: PagesListViewRequest): void {
    forkJoin([
      this.loadPages(viewRequest),
      this.loadPagesCount()
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
    return this.pagesApiService.getUserPages(viewRequest)
      .pipe(
        catchError((e) => {
          console.error(e);
          this.notificationsService.error("Unable to get your pages. Try again later.");
          return EMPTY;
        })
      );
  }

  private loadPagesCount(): Observable<number> {
    return this.pagesApiService.getUserPagesCount()
      .pipe(
        catchError((e) => {
          console.error(e);
          this.notificationsService.error("Unable to get your pages count. Try again later.");
          return EMPTY;
        }),
      );
  }

  ngOnDestroy(): void {
    this.pagesListDataSource.complete();
  }
}