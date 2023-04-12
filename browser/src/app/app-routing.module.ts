import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyResolver } from './buy/buy.resolver';
import { AuthenticatedGuard } from './_core/guards/authenticated.guard';
import { NotFoundComponent } from './_shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./main-site/main-site.module").then(m => m.MainSiteModule),
  },
  {
    path: "action/auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule),
  },
  // {
  //   path: "action/buy",
  //   resolve: {
  //     subscription: BuyResolver,
  //   },
  //   canActivate: [
  //     AuthenticatedGuard,
  //   ],
  //   loadChildren: () => import("./buy/buy.module").then(m => m.BuyModule),
  // },
  {
    path: "not-found",
    component: NotFoundComponent,
  },
  {
    path: "**",
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: "enabled",
    onSameUrlNavigation: "reload",
    scrollPositionRestoration: "disabled",
    urlUpdateStrategy: "eager",
    relativeLinkResolution: "corrected"
  })],
  exports: [RouterModule],
  providers: [BuyResolver],
})
export class AppRoutingModule { }
