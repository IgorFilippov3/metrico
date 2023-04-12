import { Controller, Get, Query, Res, Session } from "@nestjs/common";
import { UserEntity } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
import { GoogleOAuthUrlDto } from "./dto/google-oauth-url.dto";
import { GoogleService } from "./google.service";
import { GoogleUserModel } from "./models/google-user.model";
import { randomBytes } from "crypto";
import { Response } from "express";
import { Subscription } from "src/_common/models/subscription.enum";

@Controller("google")
export class GoogleController {

  constructor(
    private googleService: GoogleService,
    private usersService: UsersService,
  ) {}

  @Get("/auth/url")
  getGoogleAuthUrl(@Query("subscription") subscription: Subscription): GoogleOAuthUrlDto {
    return {
      url: this.googleService.getGoogleAuthUrl(subscription)
    };
  }

  @Get("/auth/callback")
  async googleAuthCallback(
    @Query("code") code: string,
    @Query("state") state: Subscription,
    @Session() session: Record<string, any>,
    @Res() res: Response
  ) {
    const googleUser: GoogleUserModel = await this.googleService.getGoogleUser(code);
    try {
      const existingUser: UserEntity = await this.usersService.getUserByEmail(googleUser.email);
      session.user = existingUser;
    } catch (err) {
      const newUser: UserEntity = await this.usersService.createUser({
        username: googleUser.name,
        email: googleUser.email,
        password: randomBytes(8).toString("hex"),
        subscription: Subscription.isValid(state) ? state : Subscription.basic,
      });
      session.user = newUser;
    }

    return res.redirect("/panel/pages");  
  }
}