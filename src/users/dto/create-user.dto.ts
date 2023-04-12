import { Subscription } from "src/_common/models/subscription.enum";

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  subscription?: Subscription;
  confirmHash?: string;
}