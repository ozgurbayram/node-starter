import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class AbstactModel {
  @PrimaryGeneratedColumn({})
  id: number;
}

export default AbstactModel;
