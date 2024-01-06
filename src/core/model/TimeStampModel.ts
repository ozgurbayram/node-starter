import { Column, Entity } from "typeorm";
import AbstactModel from "./AbstractModel";

@Entity()
class TimeStampModel extends AbstactModel {
  @Column()
  created_at: string;

  @Column()
  updated_at: string;
}

export default TimeStampModel;
