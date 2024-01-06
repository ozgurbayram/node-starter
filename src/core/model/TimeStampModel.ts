import { Column, Entity } from "typeorm";
import AbstactModel from "./AbstractModel";

@Entity()
class TimeStampModel extends AbstactModel {
  @Column({
    type: "timestamp",
  })
  created_at: string;

  @Column({
    type: "timestamp",
  })
  updated_at: string;
}

export default TimeStampModel;
