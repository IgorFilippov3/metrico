import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TuiButtonModule } from "@taiga-ui/core";
import { PageComponent } from "./page.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TuiButtonModule,
  ],
  declarations: [
    PageComponent,
  ],
  exports: [
    PageComponent,
  ]
})
export class PageModule {}