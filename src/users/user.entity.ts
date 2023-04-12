import { PageEntity } from "src/pages/page.entity";
import { Subscription } from "src/_common/models/subscription.enum";
import { UserRole } from "src/_common/models/user-role.enum";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "users"
})
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  apiKey: string;

  @Column()
  role: UserRole;

  @Column({
    default: null,
  })
  subscription: Subscription;

  @OneToMany(
    type => PageEntity,
    pageEntity => pageEntity.user, { eager: false, onDelete: "CASCADE" }
  )
  pages: PageEntity[];

  // @Column({ 
  //   default: null 
  // })
  // subscriptionEnd: string;

  // @Column({
  //   default: null
  // })
  // cancelSubscriptionUrl: string;
}