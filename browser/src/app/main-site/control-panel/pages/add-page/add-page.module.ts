import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AddPageService } from "./add-page.service";
import { AddPageComponent } from "./add-page.component";
import { ReactiveFormsModule } from "@angular/forms";
import { PageModule } from "@app/_shared/page/page.module";
import { TuiButtonModule, TuiGroupModule } from "@taiga-ui/core";
import { TuiCheckboxLabeledModule, TuiInputModule, TuiInputTimeModule, TuiRadioBlockModule } from "@taiga-ui/kit";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: "", component: AddPageComponent }
    ]),
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiCheckboxLabeledModule,
    TuiRadioBlockModule,
    TuiGroupModule,
    TuiInputTimeModule,
    TuiButtonModule,
    PageModule,
  ],
  declarations: [AddPageComponent],
  providers: [AddPageService],
})
export class AddPageModule {}