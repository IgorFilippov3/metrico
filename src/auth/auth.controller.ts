import { Controller, Logger, Post, Get, Body, Session } from "@nestjs/common";
import { GetUserId } from "src/_common/utils/get-user-id";
import { UserEntity } from "src/users/user.entity";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./models/login-user.dto";

@Controller("auth")
export class AuthController {
  private logger: Logger = new Logger(this.constructor.name);

  constructor(
    private authService: AuthService
  ) {}

  // @Get("/login-as-demo")
  // async loginAsDemoUser(
  //   @Session() session: Record<string, any>,
  // ): Promise<void> {
  //   const demoUser: UserEntity = await this.authService.getDemoUser();
  //   demoUser.subscription = Subscription.essential;
  //   demoUser.pagesLimit = 1;
  //   demoUser.role = UserRole.DEMO;
  //   await demoUser.save();
  //   session.user = demoUser;
  //   this.logger.verbose(`User with id: ${demoUser.id} was logged in`);
  // }

  @Post("/login")
  async login(
    @Body() { email, password }: LoginUserDto, 
    @Session() session: Record<string, any>
  ): Promise<void> {
    const validatedUser: UserEntity = await this.authService.validateUser({ email, password });
    session.user = validatedUser;
    this.logger.verbose(`User with id: ${validatedUser.id} was logged in`);
  }

  @Get("/logout")
  logout(@GetUserId() userId: number, @Session() session: Record<string, any>): void {
    this.logger.verbose(`User with id: ${userId} was logged out`);
    session.user = undefined;
  }

  // @Get("/confirm/:hash")
  // async confirmUserEmail(
  //   @Param("hash") hash: string,
  //   @Session() session: Record<string, any>
  // ): Promise<void> {
  //   const user: UserEntity = await this.authService.confirmEmail(hash);
  //   session.user = user;
  // }
}