import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HintComponent } from "./hint.component";

@NgModule({
  imports: [CommonModule],
  declarations: [HintComponent],
  exports: [HintComponent],
})
export class HintModule {}