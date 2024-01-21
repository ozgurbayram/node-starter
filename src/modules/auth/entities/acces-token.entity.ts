import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  Unique,
} from "typeorm";
import AbstractModel from "../../../core/model/abstract.model";
import { User } from "../../user/entities/user.entity";
import { AuthScope } from "../auth.enum";

@Entity()
@Unique(["user", "token"])
export class AccessToken extends AbstractModel {
  @Column({ type: "varchar" })
  @Index()
  token: string;

  @CreateDateColumn()
  private expires_at: string;

  @CreateDateColumn()
  private created_at: string;

  @Column({ type: "boolean", default: false })
  revoked: boolean;

  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
  })
  user: User;

  @Column({
    type: "simple-array",
    default: [AuthScope.BASIC, AuthScope.REGULAR],
  })
  scopes: Array<string>;
}
