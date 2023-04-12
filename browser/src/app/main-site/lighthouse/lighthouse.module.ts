import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LabDataModule } from "@app/_shared/lab-data/lab-data.module";
import { PageModule } from "@app/_shared/page/page.module";
import { TuiAccordionModule, TuiInputDateRangeModule, TuiTabsModule } from "@taiga-ui/kit";
import { LighthouseRoutingModule } from "./lighthouse-routing.module";
import { LighthouseComponent } from "./lighthouse.component";
import { LighthouseMetricsComponent } from "./pages/lighthouse-metrics/lighthouse-metrics.component";
import { LighthouseService } from "./services/lighthouse.service";
import { PagesListModule } from "@app/_shared/pages-list/pages-list.module";
import { LighthousePagesComponent } from "./pages/lighthouse-pages/lighthouse-pages.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LabDataReportModule } from "@app/_shared/lab-data-report/lab-data-report.module";

@NgModule({
  imports: [
    LighthouseRoutingModule,
    CommonModule,
    TuiTabsModule,
    TuiAccordionModule,
    PageModule,
    PagesListModule,
    LabDataModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputDateRangeModule,
    LabDataReportModule,
  ],
  declarations: [
    LighthouseComponent,
    LighthousePagesComponent,
    LighthouseMetricsComponent,
  ],
  providers: [
    LighthouseService,
  ]
})
export class LighthouseModule {}