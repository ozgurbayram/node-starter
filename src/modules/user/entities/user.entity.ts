import { Entity, Column, Unique, Index } from "typeorm";
import bcrypt from "bcrypt";
import TimeStampModel from "../../../core/model/timestamp.model";

@Entity()
@Unique(["email"])
@Unique(["username"])
export class User extends TimeStampModel {
  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  @Index()
  username: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  private password: string | null;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 50, nullable: true, default: "regular" })
  provider: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  social_id: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  avatar_url: string | null;

  async setPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password || "");
  }
}
