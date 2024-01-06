import { Column, Entity, PrimaryColumn } from "typeorm";
import TimeStampModel from "../../../core/model/TimeStampModel";

@Entity()
export class Advert extends TimeStampModel {
  @PrimaryColumn()
  id: number;
  @Column()
  created_at: string;

  @Column()
  name: string;
}
