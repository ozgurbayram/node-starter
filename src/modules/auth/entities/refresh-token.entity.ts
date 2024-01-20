import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  Unique,
} from "typeorm";
import AbstractModel from "../../../core/model/abstract.model";
import { AccessToken } from "./acces-token.entity";

@Entity()
@Unique(["token", "access_token_id"])
export class RefreshToken extends AbstractModel {
  @Column({ type: "varchar" })
  @Index()
  token: string;

  @OneToOne(() => AccessToken)
  @JoinColumn({
    name: "access_token_id",
  })
  accessToken: AccessToken; // This should be an entity reference, not a number

  @CreateDateColumn()
  private created_at: string;

  @CreateDateColumn()
  expires_at: string;

  @Column("boolean", { default: false })
  revoked: boolean;
}
