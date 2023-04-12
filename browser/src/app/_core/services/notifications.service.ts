import { Inject, Injectable } from "@angular/core";
import { TuiNotification, TuiNotificationsService } from "@taiga-ui/core";

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(TuiNotificationsService)
    private tuiNotificationsService: TuiNotificationsService,
  ) {}

  error(errorText: string): void {
    this.tuiNotificationsService.show(errorText, {
      status: TuiNotification.Error,
      autoClose: true,
      hasIcon: true,
    }).subscribe();
  }

  success(infoText: string): void {
    this.tuiNotificationsService.show(infoText, {
      status: TuiNotification.Success,
      autoClose: true,
      hasIcon: true,
    }).subscribe();
  }
}