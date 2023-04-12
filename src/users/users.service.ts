import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { hash as bcryptHash } from "bcrypt";
import { randomBytes } from "crypto";
import { UserEntity } from "./user.entity";
import { UsersError } from "./users-error.enum";
import { CreateUserDto } from "./dto/create-user.dto";
import { PostgresErrorCode } from "src/_common/models/postgres-error-codes.enum";
import { UserRole } from "src/_common/models/user-role.enum";
import { SeedService } from "src/seed/seed.service";

@Injectable()
export class UsersService {
  private logger: Logger = new Logger(this.constructor.name);

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private seedService: SeedService,
  ) {}

  async getDemoUser(): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.getUserByEmail("demo-user@pagehealth.me");
      return user;
    } catch (e) {
      const user: UserEntity = await this.createUser({
        username: "demo-user",
        email: "demo-user@pagehealth.me",
        password: "demo-user",
      });
      this.seedService.createPage(user, "https://example.com/", "Example Page");
      return user;
    }
  }

  async getUsers(): Promise<UserEntity[]> | never {
    try {
      const users: UserEntity[] = await this.usersRepository.find({
        join: {
          alias: "user",
          leftJoinAndSelect: {
            pages: "user.pages",
          }
        }
      });
      return users;
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }
  
  async createUser({ username, email, password, subscription }: CreateUserDto): Promise<UserEntity> | never {
    const user = new UserEntity();
    user.username = username;
    user.email = email;
    user.password = await bcryptHash(password, 10);
    user.apiKey = randomBytes(20).toString("hex");
    user.role = UserRole.USER;
    if (subscription) user.subscription = subscription;
    // user.confirmHash = confirmHash !== undefined
    //   ? confirmHash 
    //   : toHex(`${user.username}|${user.email}`);
    try {
      await user.save();
      this.logger.verbose(`User with id: ${user.id} was created`);

      return user;
    } catch ({ message, code }) {
      this.logger.error(`Error message: ${message}, code: ${code}`);
      if (code && code === PostgresErrorCode.UniqueViolation) {
        throw new ConflictException(`User with email ${email} already exists`);
      }
      throw new InternalServerErrorException();
    }
  }

  async getUserByEmail(email: string, relations: string[] = []): Promise<UserEntity> | never {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { email },
      relations,
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }
    return user;
  }

  async geUserById(id: number, relations: string[] = []): Promise<UserEntity> | never {
    const user: UserEntity = await this.usersRepository.findOne(id, { relations });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    return user;
  }

  async getUserByApiKey(apiKey: string): Promise<UserEntity> | never {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { apiKey },
      relations: ["pages"],
    });
    if (!user) {
      throw new NotFoundException(UsersError.USER_NOT_FOUND, `User with apiKey ${apiKey} not found.`);
    }
    return user;
  }

  async getUserByConfirmHash(confirmHash: string): Promise<UserEntity> | never {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { confirmHash }
    });
    if (!user) {
      throw new NotFoundException(UsersError.USER_NOT_FOUND, `User with confirm hash ${confirmHash} not found.`);
    }
    return user;
  }
}