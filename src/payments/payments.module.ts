import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { PaymentsController } from "./payments.controller";

@Module({
  imports: [
    UsersModule,
  ],
  controllers: [
    PaymentsController,
  ]
})
export class PaymentsModule {}