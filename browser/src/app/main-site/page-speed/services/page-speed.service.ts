import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, Observable } from "rxjs";
import { FieldDataDto } from "@app/_core/models/field-data.to";
import { NotificationsService } from "@app/_core/services/notifications.service";
import { catchError, tap } from "rxjs/operators";
import { GetPageFieldDataDto } from "@app/_core/models/get-page-field-data.dto";
import { PageDto } from "@app/_core/models/page.dto";
import { PagesApiService } from "@app/_core/services/pages-api.service";

@Injectable()
export class PageSpeedService {
  private fieldDataSource: BehaviorSubject<FieldDataDto[]> = new BehaviorSubject<FieldDataDto[]>(null);
  fieldData$: Observable<FieldDataDto[]> = this.fieldDataSource.asObservable();

  constructor(
    private pagesApiSerivce: PagesApiService,
    private notificationsService: NotificationsService,
  ) { }

  getPageData(pageId: number): Observable<PageDto> {
    return this.pagesApiSerivce.getPageData(pageId)
      .pipe(
        catchError(() => {
          this.notificationsService.error("Unable to get page data");
          return EMPTY;
        })
      )
  }

  getFieldData(dto: GetPageFieldDataDto): void {
    this.pagesApiSerivce.getPageFieldData(dto)
      .pipe(
        catchError(() => {
          this.notificationsService.error("Unable to get Lab Data metrics");
          return EMPTY;
        }),
        tap((labData: FieldDataDto[]) => this.fieldDataSource.next(labData)),
      ).subscribe();
  }
}