import { Global, Module } from "@nestjs/common";
import { ImagesUploadService } from "./services/images-upload.service";
import { SendMailService } from "./services/send-mail.service";

@Global()
@Module({
  providers: [
    ImagesUploadService,
    SendMailService,
  ],
  exports: [
    ImagesUploadService,
    SendMailService,
  ]
})
export class CoreModule {}