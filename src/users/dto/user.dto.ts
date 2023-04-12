import { Subscription } from "src/_common/models/subscription.enum";
import { UserRole } from "src/_common/models/user-role.enum";
import { UserEntity } from "../user.entity";

export class UserDto {
  id: number;
  username: string;
  email: string;
  apiKey: string;
  role: UserRole;
  subscription: Subscription;
  // pagesLimit: number;
  // cancelSubscriptionUrl: string;

  static fromEntity({ id, username, email, role, apiKey, subscription }: UserEntity): UserDto {
    const dto = new UserDto();
    dto.id = id;
    dto.username = username;
    dto.email = email;
    dto.apiKey = apiKey;
    dto.role = role;
    dto.subscription = subscription;
    // dto.pagesLimit = pagesLimit;
    // dto.cancelSubscriptionUrl = cancelSubscriptionUrl;
    return dto;
  }
}