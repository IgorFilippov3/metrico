import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CodeCoverageDataModule } from "@app/_shared/code-coverage-data/code-coverage-data.module";
import { CodeCoverageDetailsModule } from "@app/_shared/code-coverage-details/code-coverage-details.module";
import { PageModule } from "@app/_shared/page/page.module";
import { PagesListModule } from "@app/_shared/pages-list/pages-list.module";
import { TuiAccordionModule, TuiInputDateRangeModule, TuiTabsModule } from "@taiga-ui/kit";
import { CodeCoverageRoutingModule } from "./code-coverage-routing.module";
import { CodeCoverageComponent } from "./code-coverage.component";
import { CodeCoverageMetricsComponent } from "./pages/code-coverage-metrics/code-coverage-metrics.component";
import { CodeCoveragePagesComponent } from "./pages/code-coverage-pages/code-coverage-pages.component";
import { CodeCoverageService } from "./services/code-coverage.serivce";

@NgModule({
  imports: [
    CodeCoverageRoutingModule,
    CommonModule,
    PageModule,
    PagesListModule,
    TuiTabsModule,
    TuiAccordionModule,
    CodeCoverageDataModule,
    TuiInputDateRangeModule,
    FormsModule,
    ReactiveFormsModule,
    CodeCoverageDetailsModule,
  ],
  declarations: [
    CodeCoverageComponent,
    CodeCoveragePagesComponent,
    CodeCoverageMetricsComponent,
  ],
  providers: [CodeCoverageService],
})
export class CodeCoverageModule {}