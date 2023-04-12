import { UserRole } from "@app/_core/models/user-role.enum";
import { Subscription } from "./subscription.enum";

export interface UserModel {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  apiKey: string;
  subscription: Subscription;
  // pagesLimit: number;
  // cancelSubscriptionUrl: string;
}