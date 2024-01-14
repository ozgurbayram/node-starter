import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  Unique,
} from "typeorm";
import AbstactModel from "../../../core/model/abstract.model";
import { AccessToken } from "./acces-token.entity";

@Entity()
@Unique(["token", "access_token"])
export class RefreshToken extends AbstactModel {
  @Column({ type: "char" })
  @Index()
  token: string;

  @OneToOne(() => AccessToken)
  @JoinColumn({
    name: "access_token_id",
  })
  access_token: AccessToken;

  @CreateDateColumn()
  expires_at: string;

  @CreateDateColumn()
  private created_at: string;

  @Column({ type: "boolean", default: false })
  revoked: boolean;
}
