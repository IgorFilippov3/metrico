import { Controller, Get, UseGuards } from "@nestjs/common";
import { GetUserId } from "src/_common/utils/get-user-id";
import { AuthenticatedGuard } from "src/_common/guards/authenticated.guard";
import { UserDto } from "./dto/user.dto";
import { UserEntity } from "./user.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthenticatedGuard)
  @Get("/me")
  async getCurrentUser(@GetUserId() userId: number): Promise<UserDto> {
    const userEntity: UserEntity = await this.usersService.geUserById(userId);
    return UserDto.fromEntity(userEntity);
  }

  // @Post("")
  // async createUser(
  //   @Body(ValidationPipe) createUserDto: CreateUserDto,
  // ): Promise<void> {
  //  return this.usersService.signup(createUserDto);
  // }
}