import { NgModule } from "@angular/core";
import { TitleFromUrlPipe } from "./title-form-url.pipe";

@NgModule({
  declarations: [TitleFromUrlPipe],
  exports: [TitleFromUrlPipe],
})
export class TitleFromUrlModule {}