import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { createPageResolver } from "@app/_core/utils";
import { CodeCoverageComponent } from "./code-coverage.component";
import { CodeCoverageMetricsComponent } from "./pages/code-coverage-metrics/code-coverage-metrics.component";
import { CodeCoveragePagesComponent } from "./pages/code-coverage-pages/code-coverage-pages.component";

const routes: Routes = [
  {
    path: "",
    component: CodeCoverageComponent,
    children: [
      {
        path: "",
        component: CodeCoveragePagesComponent,
      },
      {
        path: ":id",
        component: CodeCoverageMetricsComponent,
        data: {
          title: "Code Coverage Metrics"
        },
        resolve: {
          page: "pageResolver",
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    createPageResolver("/code-coverage"),
  ],
})
export class CodeCoverageRoutingModule {}