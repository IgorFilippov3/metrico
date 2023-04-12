import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HintModule } from "@app/_shared/hint/hint.module";
import { PageModule } from "@app/_shared/page/page.module";
import { TuiAccordionModule } from "@taiga-ui/kit";
import { FaqComponent } from "./faq.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: FaqComponent }
    ]),
    HintModule,
    PageModule,
    TuiAccordionModule,
  ],
  declarations: [
    FaqComponent,
  ]
})
export class FaqModule {}