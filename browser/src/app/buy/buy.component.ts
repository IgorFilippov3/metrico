import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "@app/_core/models/subscription.enum";
import { UserModel } from "@app/_core/models/user.model";
import { ScriptInjectorService } from "@app/_core/services/script-injector.service";
import { UserService } from "@app/_core/services/user.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "mt-buy",
  templateUrl: "./buy.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyComponent implements OnInit, OnDestroy {

  paddle: any;
  subscriptionID: number;
  subscriptionName: string;

  private isDestroyed$: Subject<void> = new Subject();

  constructor(
    private scriptInjectorService: ScriptInjectorService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.data
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((data) => {
        this.subscriptionID = Subscription.getId(data.subscription);
        this.subscriptionName = data.subscription;
      });

    this.scriptInjectorService.inject<any>({
      src: "https://cdn.paddle.com/paddle/paddle.js",
      globalVarName: "Paddle"
    }).subscribe((data) => {
      this.paddle = data.result;
      this.paddle.Setup({ vendor: 134873 });
    })
  }

  openCheckout(): void {
    this.userService.getCurrentUser()
      .subscribe((user: UserModel) => {
        this.paddle.Checkout.open({
          product: this.subscriptionID,
          email: user.email,
          success: "/panel/pages",
        });
      });
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }
}