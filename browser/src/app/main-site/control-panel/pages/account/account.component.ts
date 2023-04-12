import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { UserModel } from "@app/_core/models/user.model";
import { UserService } from "@app/_core/services/user.service";

@Component({
  selector: "mt-account",
  templateUrl: "./account.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnInit {
  user: UserModel;

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe((user: UserModel) => this.user = user);
  }
}