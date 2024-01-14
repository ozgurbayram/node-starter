import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  Unique,
} from "typeorm";
import AbstactModel from "../../../core/model/abstract.model";
import { User } from "../../user/models/user.entity";

@Entity()
@Unique(["user", "token"])
export class AccessToken extends AbstactModel {
  @Column({ type: "char" })
  @Index()
  token: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
  })
  user: User;

  @CreateDateColumn()
  expires_at: string;

  @CreateDateColumn()
  private created_at: string;

  @Column({ type: "boolean", default: false })
  revoked: boolean;
}
