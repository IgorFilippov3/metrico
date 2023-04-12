import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "@app/_core/models/subscription.enum";
import { UserModel } from "@app/_core/models/user.model";
import { AuthApiService } from "@app/_core/services/auth-api.service";
import { UserService } from "@app/_core/services/user.service";
import { TuiDialogService, TuiHostedDropdownComponent } from "@taiga-ui/core";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "mt-user-panel",
  templateUrl: "./user-panel.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPanelComponent implements OnInit {
  @ViewChild(TuiHostedDropdownComponent)
  component?: TuiHostedDropdownComponent;

  Subscription = Subscription;

  user$: Observable<UserModel | null>;

  open = false;

  constructor(
    private userService: UserService,
    private authApiService: AuthApiService,
    private dialogService: TuiDialogService,
  ) { }

  ngOnInit(): void {
    this.user$ = this.userService.user$;
  }

  redirectToPricing(): void {
    window.location.href = "/pricing";
  }

  logout(): void {
    this.authApiService.logout()
      .pipe(
        switchMap(() => this.userService.updateUserServiceState())
      )
      .subscribe(() => window.location.href = "/about");
  }

  openCancelSubscriptionDialog(template: any): void {
    this.closeDropdown();
    this.authApiService
    this.dialogService
      .open(template)
      .subscribe();
  }

  cancelSubscription(cancelSubUrl: string): void {
    window.location.href = cancelSubUrl;
  }

  openDropdown() {
    this.open = true;
  }

  closeDropdown() {
    this.open = false;

    if (this.component && this.component.nativeFocusableElement) {
      this.component.nativeFocusableElement.focus();
    }
  }
}