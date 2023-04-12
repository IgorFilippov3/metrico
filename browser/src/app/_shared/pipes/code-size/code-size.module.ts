import { NgModule } from "@angular/core";
import { CodeSizePipe } from "./code-size.pipe";

@NgModule({
  declarations: [CodeSizePipe],
  exports: [CodeSizePipe],
})
export class CodeSizeModule {}