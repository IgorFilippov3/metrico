import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { FieldDataComponent } from "./field-data.component";

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
  ],
  declarations: [FieldDataComponent],
  exports: [FieldDataComponent],
})
export class FieldDataModule {}