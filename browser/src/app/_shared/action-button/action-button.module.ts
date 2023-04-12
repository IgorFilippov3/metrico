import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TuiButtonModule } from "@taiga-ui/core";
import { ActionButtonComponent } from "./action-button.component";

@NgModule({
  imports: [
    CommonModule,
    TuiButtonModule
  ],
  declarations: [ActionButtonComponent],
  exports: [ActionButtonComponent],
})
export class ActionButtonModule {}