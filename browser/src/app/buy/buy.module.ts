import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BuyComponent } from "./buy.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: "", component: BuyComponent },
    ]),
  ],
  declarations: [BuyComponent]
})
export class BuyModule {}