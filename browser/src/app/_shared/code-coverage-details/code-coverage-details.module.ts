import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TuiHintModule } from "@taiga-ui/core";
import { CodeSizeModule } from "../pipes/code-size/code-size.module";
import { CodeCoverageDetailsComponent } from "./code-coverage-details.component";

@NgModule({
  imports: [
    CommonModule,
    CodeSizeModule,
    TuiHintModule,
  ],
  declarations: [CodeCoverageDetailsComponent],
  exports: [CodeCoverageDetailsComponent],
})
export class CodeCoverageDetailsModule {}