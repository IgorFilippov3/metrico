import { Injectable } from "@angular/core";
import { CodeCoverageDto } from "@app/_core/models/code-coverage.dto";
import { DeviceType } from "@app/_core/models/device-type.enum";
import { GetPageCodeCoverageDataDto } from "@app/_core/models/get-page-code-coverage-data.model";
import { CodeCoverageApiService } from "@app/_core/services/code-coverage-api.service";
import { NotificationsService } from "@app/_core/services/notifications.service";
import { BehaviorSubject, EMPTY, Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable()
export class CodeCoverageService {
  private dataSource: BehaviorSubject<CodeCoverageDto[]> = new BehaviorSubject(null);
  data$: Observable<CodeCoverageDto[]> = this.dataSource.asObservable();

  constructor(
    private codeCoverageApiService: CodeCoverageApiService,
    private notificationsService: NotificationsService,
  ) {}

  getPageData(dto: GetPageCodeCoverageDataDto): void {
    this.codeCoverageApiService.getCodeCoverages(dto)
      .pipe(
        catchError(() => {
          this.notificationsService.error("Unable to get Code Coverages metrics");
          return EMPTY;
        }),
        tap((data: CodeCoverageDto[]) => this.dataSource.next(data)),
      ).subscribe();
  }
}