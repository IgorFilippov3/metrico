import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MtHttpClientService } from "./services/mt-http-client.service";
import { TuiNotificationsModule } from "@taiga-ui/core";
import { NotificationsService } from "@app/_core/services/notifications.service";
import { UserService } from "@app/_core/services/user.service";
import { AuthenticatedGuard } from "@app/_core/guards/authenticated.guard";
import { AuthApiService } from "@app/_core/services/auth-api.service";
import { SiteNavigationService } from "./services/site-navigation.service";
import { PagesApiService } from "./services/pages-api.service";
import { ScriptInjectorService } from "./services/script-injector.service";
import { AnonymousGuard } from "./guards/anonymous.guard";
import { MetricsApiService } from "./services/metrics-api.serivce";
import { SubscriptionGuard } from "./guards/subscription.guard";
import { NotSubscribedGuard } from "./guards/not-subscribed.guard";
import { CodeCoverageApiService } from "./services/code-coverage-api.service";

@NgModule({
  imports: [
    HttpClientModule,
    TuiNotificationsModule,
  ],
  providers: [
    MtHttpClientService,
    AuthApiService,
    NotificationsService,
    UserService,
    SiteNavigationService,
    PagesApiService,
    ScriptInjectorService,
    MetricsApiService,
    CodeCoverageApiService,

    AuthenticatedGuard,
    AnonymousGuard,
    SubscriptionGuard,
    NotSubscribedGuard,
  ]
})
export class CoreModule {}