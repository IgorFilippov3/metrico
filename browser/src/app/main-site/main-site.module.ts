import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TuiMultiSelectModule, TuiTabsModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiDataListModule, TuiDropdownModule, TuiHostedDropdownModule, TuiSvgModule } from '@taiga-ui/core';
import { MainSiteRoutingModule } from "./main-site-routing.module";
import { MainSiteComponent } from "./main-site.component";
import { HeaderComponent } from "./_components/header/header.component";
import { SidebarComponent } from "./_components/sidebar/sidebar.component";
import { UserPanelComponent } from "./_components/header/components/user-panel/user-panel.component";

@NgModule({
  imports: [
    MainSiteRoutingModule,
    CommonModule,
    TuiTabsModule,
    TuiSvgModule,
    TuiDataListModule,
    TuiHostedDropdownModule,
    TuiButtonModule,
    TuiDropdownModule,
  ],
  declarations: [
    MainSiteComponent,
    HeaderComponent,
    SidebarComponent,
    UserPanelComponent,
  ]
})
export class MainSiteModule {}