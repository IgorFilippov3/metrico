import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { createPageResolver } from "@app/_core/utils";
import { ControlPanelComponent } from "./control-panel.component";
import { HowToComponent } from "./pages/how-to/how-to.component";
import { ControlPanelPageDetailsComponent } from "./pages/page-details/control-panel-page-details.component";
import { ControlPanelPagesComponent } from "./pages/pages-list/control-panel-pages.component";
import { ControlPanelPagesResolver } from "./pages/pages-list/control-panel-pages.resolver";

const routes: Routes = [
  {
    path: "",
    component: ControlPanelComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "pages",
      },
      {
        path: 'how-to',
        component: HowToComponent,
        data: {
          title: 'How To',
        }
      },
      {
        path: "pages",
        component: ControlPanelPagesComponent,
        resolve: {
          viewRequest: ControlPanelPagesResolver,
        },
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
        data: {
          title: "Your pages"
        }
      },
      {
        path: "pages/:id",
        component: ControlPanelPageDetailsComponent,
        resolve: {
          page: "pageResolver",
        },
        data: {
          title: "Page Details"
        }
      },
      {
        path: "add-page",
        loadChildren: () => import("@app/main-site/control-panel/pages/add-page/add-page.module")
          .then(m => m.AddPageModule),
        data: {
          title: "Add Page"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    createPageResolver("/panel/pages"),
    ControlPanelPagesResolver,
  ]
})
export class ControlPanelRoutingModule { }