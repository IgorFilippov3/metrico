import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Params, Router } from "@angular/router";
import { MetricDataType } from "@app/_core/models/metric-data-type.enum";
import { PageDto } from "@app/_core/models/page.dto";
import { PagesListData } from "@app/_core/models/pages-list/pages-list-data.model";
import { PagesListViewRequest } from "@app/_core/models/pages-list/pages-list-view-request.model";
import { Observable, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { PagesListService } from "./pages-list.service";

@Component({
  selector: "mt-pages-list",
  templateUrl: "./pages-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesListComponent implements OnInit, OnDestroy {
  Math = Math;

  @Input() linkPattern: string;
  @Input() metricDataType: MetricDataType;

  pagesListData$: Observable<PagesListData>;
  currentPage: number = 1;
  addPageLink: string;

  private isDestroyed$: Subject<void> = new Subject();

  constructor(
    private pagesListService: PagesListService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.pagesListData$ = this.pagesListService.pagesListData$;

    this.route.queryParams
      .pipe(
        map((queryParams: Params) => {
          const viewRequest = new PagesListViewRequest();

          if (queryParams.page && queryParams.page > 0) {
            viewRequest.page = +queryParams.page;
          }
          return viewRequest;
        }),
        takeUntil(this.isDestroyed$)
      )
      .subscribe((viewRequest: PagesListViewRequest) => {
        viewRequest.dataType = this.metricDataType;
        this.pagesListService.loadPagesListData(viewRequest);
      })
  }

  changePage(pageIndex: number): void {
    this.router.navigate([], {
      queryParams: { page: pageIndex + 1 }
    });
  }

  navigateToPageDetails(page: PageDto): void {
    this.router.navigate([this.linkPattern + page.id]);
  }

  buildLinkPath(pageId: number): string {
    return this.linkPattern.replace(/{pageId}/, pageId.toString());
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }
}