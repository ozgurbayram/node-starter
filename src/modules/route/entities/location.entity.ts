import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import AbstractEntity from "../../../core/entities/abstract.entity";

@Entity()
export class Location extends AbstractEntity {
  @Column({ type: "double precision" })
  latitude: number;

  @Column({ type: "double precision" })
  longitude: number;
}
