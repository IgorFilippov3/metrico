import { NgModule } from "@angular/core";
import { LabDataComponent } from "./lab-data.component";
import { CommonModule } from "@angular/common";
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
  ],
  declarations: [
    LabDataComponent,
  ],
  exports: [
    LabDataComponent,
  ]
})
export class LabDataModule { }