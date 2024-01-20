import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  Unique,
} from "typeorm";
import AbstactModel from "../../../core/model/abstract.model";
import { AccessToken } from "./acces-token.entity";

@Entity()
@Unique(["token", "access_token_id"])
export class RefreshToken extends AbstactModel {
  @Column({ type: "varchar" })
  @Index()
  token: string;

  @OneToOne(() => AccessToken)
  @JoinColumn({
    name: "access_token_id",
  })
  access_token_id: number;

  @CreateDateColumn()
  private created_at: string;

  @CreateDateColumn()
  expires_at: string;
}
