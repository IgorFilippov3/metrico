import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoaderModule } from "@app/_shared/loader/loader.module";
import { PageModule } from "@app/_shared/page/page.module";
import { ActionButtonModule } from "@app/_shared/action-button/action-button.module";
import { TuiButtonModule, TuiGroupModule } from "@taiga-ui/core";
import { TuiAccordionModule, TuiCheckboxLabeledModule, TuiInputModule, TuiInputTimeModule, TuiPaginationModule, TuiRadioBlockModule, TuiTabsModule } from "@taiga-ui/kit";
import { ControlPanelRoutingModule } from "./control-panel-routing.module";
import { ControlPanelComponent } from "./control-panel.component";
import { ControlPanelPageDetailsComponent } from "./pages/page-details/control-panel-page-details.component";
import { ControlPanelPagesComponent } from "./pages/pages-list/control-panel-pages.component";
import { ControlPanelServicesPipe } from "./pages/pages-list/control-panel-services.pipe";
import { ControlPanelService } from "./services/control-panel.service";
import { HowToComponent } from "./pages/how-to/how-to.component";

@NgModule({
  imports: [
    CommonModule,
    ControlPanelRoutingModule,
    TuiTabsModule,
    TuiAccordionModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiCheckboxLabeledModule,
    TuiRadioBlockModule,
    TuiGroupModule,
    TuiInputTimeModule,
    TuiButtonModule,
    PageModule,
    TuiPaginationModule,
    LoaderModule,
    ActionButtonModule,
  ],
  declarations: [
    ControlPanelComponent,
    ControlPanelPagesComponent,
    ControlPanelServicesPipe,
    ControlPanelPageDetailsComponent,
    HowToComponent,
  ],
  providers: [
    ControlPanelService,
  ]
})
export class ControlPanelModule { }