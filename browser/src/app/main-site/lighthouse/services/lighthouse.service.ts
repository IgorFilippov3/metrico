import { Injectable } from "@angular/core";
import { GetPageLabDataDto } from "@app/_core/models/get-page-lab-data.dto";
import { LabDataDto } from "@app/_core/models/lab-data.dto";
// import { PageDto } from "@app/_core/models/page.dto";
import { NotificationsService } from "@app/_core/services/notifications.service";
import { PagesApiService } from "@app/_core/services/pages-api.service";
import { BehaviorSubject, EMPTY, Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable()
export class LighthouseService {
  private labDataSource: BehaviorSubject<LabDataDto[]> =
    new BehaviorSubject<LabDataDto[]>(null);
  labData$: Observable<LabDataDto[]> = this.labDataSource.asObservable();

  constructor(
    private pagesApiService: PagesApiService,
    private notificationsService: NotificationsService,
  ) { }

  // getPageData(pageId: number): Observable<PageDto> {
  //   return this.pagesApiService.getPageData(pageId)
  //     .pipe(
  //       catchError(() => {
  //         this.notificationsService.error("Unable to get page data");
  //         return EMPTY;
  //       })
  //     )
  // }

  getPageLabData(dto: GetPageLabDataDto): void {
    this.pagesApiService.getPageLabData(dto)
      .pipe(
        catchError(() => {
          this.notificationsService.error("Unable to get Lab Data metrics");
          return EMPTY;
        }),
        tap((labData: LabDataDto[]) => this.labDataSource.next(labData)),
      ).subscribe();
  }
}