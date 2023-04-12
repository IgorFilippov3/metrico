import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { createPageResolver } from "@app/_core/utils";
import { PageSpeedComponent } from "./page-speed.component";
import { PageSpeedMetricsComponent } from "./pages/page-speed-metrics/page-speed-metrics.component";
import { PageSpeedPagesComponent } from "./pages/page-speed-pages/page-speed-pages.component";

const routes: Routes = [
  {
    path: "",
    component: PageSpeedComponent,
    children: [
      {
        path: "",
        component: PageSpeedPagesComponent,
      },
      {
        path: ":id",
        component: PageSpeedMetricsComponent,
        data: {
          title: "Chrome User Experience Report"
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
    createPageResolver("/user-experience"),
  ],
})
export class PageSpeedRoutingModule {}