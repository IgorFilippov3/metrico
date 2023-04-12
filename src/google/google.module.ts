import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { GoogleController } from "./google.controller";
import { GoogleService } from "./google.service";

@Module({
  imports: [UsersModule],
  controllers: [GoogleController],
  providers: [GoogleService]
})
export class GoogleModule {}