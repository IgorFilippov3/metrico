import { Body, Controller, InternalServerErrorException, Logger, Post } from "@nestjs/common";
import { UserEntity } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
import { Subscription } from "src/_common/models/subscription.enum";
import { PaddlePaymentDto } from "./dto/paddle-payment.dto";
import { PaddleAlert } from "./models/paddle-alert.enum";

@Controller("payments")
export class PaymentsController {

  private logger: Logger = new Logger(this.constructor.name);

  constructor(
    private usersService: UsersService,
  ) { }

  @Post("/paddle-webhook")
  async paddleWebhook(@Body() payment: PaddlePaymentDto) {
    console.dir({ payment });

    const { alert_name, email, next_bill_date, subscription_plan_id, cancel_url } = payment;

    switch (alert_name) {
      case PaddleAlert.subscription_created:
      case PaddleAlert.subscription_updated:
        try {
          const subscriptionPlanID = parseInt(subscription_plan_id)

          const user: UserEntity = await this.usersService.getUserByEmail(email);
          // user.subscription = Subscription.getValue(subscriptionPlanID);
          // user.subscriptionEnd = next_bill_date;
          // user.pagesLimit = Subscription.getPagesLimit(subscriptionPlanID);
          // user.cancelSubscriptionUrl = cancel_url;
          await user.save();
          this.logger.log(`User - ${user.email}. Subscription - ${user.subscription}. Alert name - ${alert_name}.`);
        } catch (err) {
          this.logger.error(err);
          throw new InternalServerErrorException(`Unable to create/update subscription for user ${email}`);
        }
        break;
      case PaddleAlert.subscription_cancelled:
        try {
          const user: UserEntity = await this.usersService.getUserByEmail(email);
          user.subscription = null;
          // user.subscriptionEnd = null;
          // user.pagesLimit = 0;
          await user.save();
        } catch (err) {
          this.logger.error(err);
          throw new InternalServerErrorException(`Unable to cancel subscription for user ${email}`);
        }
        break;
      default:
        this.logger.error(`Invalid payment alert_name`, payment.alert_name);
        throw new InternalServerErrorException(`Invalid payment alert_name`, payment.alert_name);
    }
  }
}