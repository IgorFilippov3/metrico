import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { RuntimePerfDataComponent } from "./runtime-perf-data.component";

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
  ],
  declarations: [
    RuntimePerfDataComponent,
  ],
  exports: [
    RuntimePerfDataComponent,
  ]
})
export class RuntimePerfDataModule {}