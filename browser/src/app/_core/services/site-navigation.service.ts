import { Injectable } from "@angular/core";
import { ActivatedRoute, Data, NavigationEnd, Router } from "@angular/router";
import { ConnectableObservable, from, Observable, ReplaySubject, Subject } from "rxjs";
import { filter, map, publishReplay, shareReplay, switchMap, tap } from "rxjs/operators";
import { PageTitleInfo } from "@app/_core/models/page-title-info.model";

@Injectable()
export class SiteNavigationService {
  navigationEndEvents$: Observable<NavigationEnd>;

  private pageTitleInfoSource: ReplaySubject<PageTitleInfo> = new ReplaySubject(1);
  pageTitleInfo$: Observable<PageTitleInfo> = this.pageTitleInfoSource.asObservable();

  private isPageTitleGeneration: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.navigationEndEvents$ = this.createNavigationEndNotifier();
    this.startPageTitleGeneration();
  }

  startPageTitleGeneration() {
    if (!this.isPageTitleGeneration) {
      this.isPageTitleGeneration = true;
      this.navigationEndEvents$
        .pipe(
          map<NavigationEnd, Data>(() => {
            let child: ActivatedRoute | null = this.route.firstChild;
            while (child) {
              if (child.firstChild) {
                child = child.firstChild;
              } else if (child.snapshot.data) {
                return child.snapshot.data;
              } else {
                return null;
              }
            }
            return null;
          }),
          filter((data: Data | null) => data !== null),
          tap((data: Data) => this.pageTitleInfoSource.next({ name: data["title"] })),
        ).subscribe();
    }
  }

  private createNavigationEndNotifier(): Observable<NavigationEnd> {
    const navigationEndEvents = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => <NavigationEnd>event),
        publishReplay(1)
      ) as ConnectableObservable<NavigationEnd>;
    navigationEndEvents.connect();
    return navigationEndEvents;
  }
}