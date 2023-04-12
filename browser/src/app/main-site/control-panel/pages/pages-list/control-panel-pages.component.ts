import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { UserService } from "@app/_core/services/user.service";
import { filter, map, takeUntil, tap } from "rxjs/operators";
import { UserModel } from "@app/_core/models/user.model";
import { environment } from "@env/environment";
import { copyToClipboard } from "@app/_core/utils";
import { NotificationsService } from "@app/_core/services/notifications.service";
import { ControlPanelPagesService } from "./control-panel-pages.service";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { PagesListData } from "@app/_core/models/pages-list/pages-list-data.model";
import { PagesListViewRequest } from "@app/_core/models/pages-list/pages-list-view-request.model";
import { PageDto } from "@app/_core/models/page.dto";
import { UpdateWay } from "@app/_core/models/update-way.enum";

@Component({
  selector: "mt-control-panel-pages",
  templateUrl: "./control-panel-pages.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ControlPanelPagesService],
})
export class ControlPanelPagesComponent implements OnInit, OnDestroy {
  UpdateWay = UpdateWay;
  Math = Math;

  pagesListData$: Observable<PagesListData>;
  currentPage: number = 1;
  updateWithHookEndpoint: string;

  private isDestroyed$: Subject<void> = new Subject();

  constructor(
    private controlPanelPagesService: ControlPanelPagesService,
    private userService: UserService,
    private changeDetector: ChangeDetectorRef,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.pagesListData$ = this.controlPanelPagesService.pagesListData$;

    this.route.data
      .pipe(
        map((data: Data) => data.viewRequest),
        takeUntil(this.isDestroyed$)
      )
      .subscribe((viewRequest: PagesListViewRequest) => {
        this.controlPanelPagesService.loadPagesListData(viewRequest);
      })

    this.userService.getCurrentUser()
      .pipe(
        filter((user: UserModel | null) => user !== null),
        takeUntil(this.isDestroyed$)
      )
      .subscribe((user: UserModel) => {
        this.updateWithHookEndpoint =
          environment.serverAddress
          + `/api/metrics/hook/all?apiKey=${user.apiKey}`;
        this.changeDetector.markForCheck();
      });
  }

  changePage(pageIndex: number): void {
    this.router.navigate([], {
      queryParams: { page: pageIndex + 1 }
    });
  }

  navigateToPageDetails(page: PageDto): void {
    this.router.navigate(['/panel/pages/' + page.id]);
  }

  async copy(): Promise<void> {
    await copyToClipboard(this.updateWithHookEndpoint)
    this.notificationsService.success("Api hook was copied to your clipboard");
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }
}