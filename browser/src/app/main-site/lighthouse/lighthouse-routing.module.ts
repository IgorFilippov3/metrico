import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { createPageResolver } from "@app/_core/utils";
import { LighthouseComponent } from "./lighthouse.component";
import { LighthouseMetricsComponent } from "./pages/lighthouse-metrics/lighthouse-metrics.component";
import { LighthousePagesComponent } from "./pages/lighthouse-pages/lighthouse-pages.component";

const routes: Routes = [
  {
    path: "",
    component: LighthouseComponent,
    children: [
      {
        path: "",
        component: LighthousePagesComponent,
      },
      {
        path: ":id",
        component: LighthouseMetricsComponent,
        data: {
          title: "Lighthouse Page Metrics"
        },
        resolve: {
          page: "pageResolver",
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    createPageResolver("/lighthouse"),
  ],
})
export class LighthouseRoutingModule {}