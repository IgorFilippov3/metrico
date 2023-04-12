import { Injectable } from "@angular/core";
import { PageDto } from "@app/_core/models/page.dto";
import { MetricsApiService } from "@app/_core/services/metrics-api.serivce";
import { NotificationsService } from "@app/_core/services/notifications.service";
import { PagesApiService } from "@app/_core/services/pages-api.service";
import { BehaviorSubject, EMPTY, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { CreatePageDto } from "../pages/add-page/models/create-page.dto";
import { UpdatePageDto } from "../pages/page-details/models/update-page.dto";

@Injectable()
export class ControlPanelService {
  private pagesSource: BehaviorSubject<PageDto[]> = new BehaviorSubject(null);
  pages$: Observable<PageDto[]> = this.pagesSource.asObservable();

  private pagesCountSource: BehaviorSubject<number> = new BehaviorSubject(null);
  pagesCount$: Observable<number> = this.pagesCountSource.asObservable();

  constructor(
    private pagesApiService: PagesApiService,
    private metricsApiService: MetricsApiService,
    private notificationsService: NotificationsService,
  ) { }

  loadPage(pageID: number): Observable<PageDto> {
    return this.pagesApiService.getUserPage(pageID);
  }

  createPage(dto: CreatePageDto): Observable<PageDto> {
    return this.pagesApiService.createPage(dto)
      .pipe(
        catchError(() => {
          this.notificationsService.error("Unable to create your page. Try again later");
          return EMPTY;
        })
      );
  }

  updatePage(pageID: number, updatePageDto: UpdatePageDto): Observable<PageDto> {
    return this.pagesApiService.updatePage(pageID, updatePageDto)
      .pipe(
        catchError((e) => {
          console.error(e);
          this.notificationsService.error("Unable to update your page. Try again later");
          return EMPTY;
        })
      );
  }

  deletePage(pageID: number): Observable<void> {
    return this.pagesApiService.deletePage(pageID)
      .pipe(
        catchError((e) => {
          console.error(e);
          this.notificationsService.error("Unable to delete your page. Try again later");
          return EMPTY;
        })
      );
  }

  collectPageMetrics(apiKey: string, pageId: number): Observable<void> {
    return this.metricsApiService.collectPageMetrics(apiKey, pageId);
  }

  clearPagesSource(): void {
    this.pagesSource.next(null);
  }
}