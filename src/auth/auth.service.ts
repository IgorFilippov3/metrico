import { Injectable, Res, UnauthorizedException } from "@nestjs/common";
import { UserEntity } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
import { compare as bcryptCompare } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  getDemoUser(): Promise<UserEntity> {
    return this.usersService.getDemoUser();
  }

  // async confirmEmail(hash: string): Promise<UserEntity> | never {
  //   const user: UserEntity = await this.usersService.getUserByConfirmHash(hash);
  //   user.confirmHash = null;
  //   await user.save();
  //   return user;
  // }

  async validateUser(
    { email, password }: { email: string, password: string }
  ): Promise<UserEntity> | never {
    const user: UserEntity = await this.usersService.getUserByEmail(email);

    // if (user.confirmHash !== null) {
    //   throw new UnauthorizedException("User email is not verified");
    // }

    const isPasswordMatching: boolean = await bcryptCompare(password, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException("Invalid password");
    }

    return user;
  }
}