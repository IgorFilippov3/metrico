import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { UserRole } from "@app/_core/models/user-role.enum";
import { UserModel } from "@app/_core/models/user.model";
import { NotificationsService } from "@app/_core/services/notifications.service";
import { UserService } from "@app/_core/services/user.service";
import { copyToClipboard } from "@app/_core/utils";
import { environment } from "@env/environment";

@Component({
  selector: "mt-faq",
  templateUrl: "./faq.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent implements OnInit {
  apiKey: string;
  serverAddress: string = environment.serverAddress;

  constructor(
    private userService: UserService,
    private changeDetector: ChangeDetectorRef,
    private notificationsService: NotificationsService,
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe((user: UserModel) => {
        this.apiKey = user.role === UserRole.DEMO 
        ? "This is a readonly mode. Get a real account to get an apikey"
        : user.apiKey;
        this.changeDetector.markForCheck();
      });
  }

  async copyApiKey(): Promise<void> {
    await copyToClipboard(this.apiKey);
    this.notificationsService.success("Api key was copied to your clipboard")
  }
}