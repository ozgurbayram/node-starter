import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import TimeStampModel from "../../../core/model/timestamp.model";
import { User } from "../../user/models/user.entity";

@Entity()
export class Advert extends TimeStampModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @OneToOne(() => User)
  @JoinColumn()
  creator: User;

  @Column()
  status: string;
}
