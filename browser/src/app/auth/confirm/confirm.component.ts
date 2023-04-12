import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthApiService } from "@app/_core/services/auth-api.service";
import { NotificationsService } from "@app/_core/services/notifications.service";
import { UserService } from "@app/_core/services/user.service";
import { EMPTY, Subject } from "rxjs";
import { catchError, switchMap, takeUntil } from "rxjs/operators";

@Component({
  selector: "mt-confirm",
  templateUrl: "./confirm.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent implements OnInit, OnDestroy {

  private isDestroyed$: Subject<void> = new Subject();
  hash: string;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authApiService: AuthApiService,
    private notificationsService: NotificationsService,
    private changeDetector: ChangeDetectorRef,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((params) => this.hash = params.hash);
  }

  confirm(): void {
    this.loading = true;
    this.changeDetector.markForCheck();
    this.authApiService.confirmEmail(this.hash)
      .pipe(
        catchError(({ error }) => {
          this.notificationsService.error(
            error
              ? error.message
              : "Something went wrong :("
          );
          return EMPTY;
        }),
        switchMap(() => this.userService.updateUserServiceState())
      )
      .subscribe({
        next: () => {
          this.notificationsService.success("Welcome!");
          this.router.navigate(["/"]);
        },
        complete: () => {
          this.loading = false;
          this.changeDetector.markForCheck();
        }
      })
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }
}