import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FieldDataModule } from "@app/_shared/field-data/field-data.module";
import { PageModule } from "@app/_shared/page/page.module";
import { PagesListModule } from "@app/_shared/pages-list/pages-list.module";
import { MathRoundModule } from "@app/_shared/pipes/math-round/math-round.module";
import { TuiAccordionModule, TuiInputDateRangeModule, TuiTabsModule } from "@taiga-ui/kit";
import { PageSpeedRoutingModule } from "./page-speed-routing.module";
import { PageSpeedComponent } from "./page-speed.component";
import { PageSpeedMetricsComponent } from "./pages/page-speed-metrics/page-speed-metrics.component";
import { PageSpeedPagesComponent } from "./pages/page-speed-pages/page-speed-pages.component";
import { PageSpeedService } from "./services/page-speed.service";

@NgModule({
  imports: [
    PageSpeedRoutingModule,
    CommonModule,
    RouterModule,
    PagesListModule,
    PageModule,
    MathRoundModule,
    FieldDataModule,
    TuiAccordionModule,
    TuiTabsModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputDateRangeModule,
  ],
  declarations: [
    PageSpeedComponent,
    PageSpeedPagesComponent,
    PageSpeedMetricsComponent,
  ],
  providers: [
    PageSpeedService,
  ]
})
export class PageSpeedModule { }