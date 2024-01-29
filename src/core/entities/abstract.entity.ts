import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class AbstractEntity {
  @PrimaryGeneratedColumn({})
  id: number | null;
}

export default AbstractEntity;
