import { NgModule } from "@angular/core";
import { MathRoundPipe } from "./math-round.pipe";

@NgModule({
  declarations: [MathRoundPipe],
  exports: [MathRoundPipe],
})
export class MathRoundModule {}