import { Column, Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import AbstactModel from "./abstract.model";

@Entity()
class TimeStampModel extends AbstactModel {
  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export default TimeStampModel;
