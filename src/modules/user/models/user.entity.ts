import { Column, Entity, PrimaryColumn } from "typeorm";
import TimeStampModel from "../../../core/model/TimeStampModel";

@Entity()
export class User extends TimeStampModel {
  @PrimaryColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  role: string;

  @Column()
  created_at: string;

  @Column()
  type: string;
}
