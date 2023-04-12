import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { CodeSizeModule } from "../pipes/code-size/code-size.module";
import { CodeCoverageDataComponent } from "./code-coverage-data.component";

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    CodeSizeModule,
  ],
  declarations: [
    CodeCoverageDataComponent,
  ],
  exports: [
    CodeCoverageDataComponent,
  ]
})
export class CodeCoverageDataModule {}