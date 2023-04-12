import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd } from "@angular/router";
import { SiteNavigationService } from "@app/_core/services/site-navigation.service";
import { TUI_IS_ANDROID, TUI_IS_IOS } from "@taiga-ui/cdk";
import { TUI_MOBILE_AWARE } from "@taiga-ui/kit";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "mt-control-panel",
  templateUrl: "./control-panel.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_MOBILE_AWARE,
      useValue: true,
    },
    {
      provide: TUI_IS_IOS,
      useValue: false,
    },
    {
      provide: TUI_IS_ANDROID,
      useValue: true,
    },
  ]
})
export class ControlPanelComponent implements OnInit, OnDestroy {

  currentUrl: string;
  activeItemIndex: number = 1;

  private isDestroyed$: Subject<void> = new Subject();

  constructor(private siteNavigationService: SiteNavigationService) { }

  ngOnInit(): void {
    this.siteNavigationService.navigationEndEvents$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(({ url }: NavigationEnd) => {
        this.currentUrl = url;
      })
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }
}