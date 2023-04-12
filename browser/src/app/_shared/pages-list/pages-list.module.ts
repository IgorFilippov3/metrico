import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PagesListComponent } from "./pages-list.component";
import { PageModule } from "../page/page.module";
import { PagesListService } from "./pages-list.service";
import { LoaderModule } from "../loader/loader.module";
import { RouterModule } from "@angular/router";
import { TuiButtonModule } from "@taiga-ui/core";
import { TuiPaginationModule } from "@taiga-ui/kit";

@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    PageModule, 
    LoaderModule, 
    TuiButtonModule,
    TuiPaginationModule,
  ],
  declarations: [PagesListComponent],
  exports: [PagesListComponent],
  providers: [PagesListService],
})
export class PagesListModule {}