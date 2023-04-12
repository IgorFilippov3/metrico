import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticatedGuard } from "@app/_core/guards/authenticated.guard";
import { NotSubscribedGuard } from "@app/_core/guards/not-subscribed.guard";
import { MainSiteComponent } from "./main-site.component";

const routes: Routes = [
  {
    path: "",
    component: MainSiteComponent,
    canActivate: [
      AuthenticatedGuard,
      // NotSubscribedGuard,
    ],
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "panel",
      },
      {
        path: "faq",
        loadChildren: () => import("@app/main-site/faq/faq.module").then(m => m.FaqModule),
        data: {
          title: "FAQ"
        }
      },
      {
        path: "panel",
        loadChildren: () => import("@app/main-site/control-panel/control-panel.module").then(m => m.ControlPanelModule),
        data: {
          title: "Control Panel"
        }
      },
      {
        path: "lighthouse",
        loadChildren: () => import("@app/main-site/lighthouse/lighthouse.module").then(m => m.LighthouseModule),
        data: {
          title: "Lighthouse Metrics",
        }
      },
      {
        path: "user-experience",
        loadChildren: () => import("@app/main-site/page-speed/page-speed.module").then(m => m.PageSpeedModule),
        data: {
          title: "Chrome User Experience Reports",
        },
      },
      {
        path: "code-coverage",
        loadChildren: () => import("@app/main-site/code-coverage/code-coverage.module").then(m => m.CodeCoverageModule),
        data: {
          title: "Code Coverage"
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainSiteRoutingModule { }