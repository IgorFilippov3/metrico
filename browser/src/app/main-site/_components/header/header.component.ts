import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { PageTitleInfo } from "@app/_core/models/page-title-info.model";
import { SiteNavigationService } from "@app/_core/services/site-navigation.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "mt-header",
  templateUrl: "./header.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {

  pageTitle: PageTitleInfo;

  private isDestroyed$: Subject<void> = new Subject();

  constructor(
    private siteNavigationService: SiteNavigationService,
    private changeDetector: ChangeDetectorRef,
    ) {}

  ngOnInit(): void {
    this.siteNavigationService.pageTitleInfo$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((pageTitleInfo: PageTitleInfo) => {
        this.pageTitle = pageTitleInfo;
        this.changeDetector.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }
}