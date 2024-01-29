import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import AbstactEntity from "../../../core/entities/abstract.entity";
import { Location } from "./location.entity";

@Entity()
export class Route extends AbstactEntity {
  @ManyToOne(() => Location)
  @JoinColumn({
    name: "deparature_id",
  })
  deparature: Location;

  @ManyToOne(() => Location)
  @JoinColumn({
    name: "destination_id",
  })
  destination: Location;

  @Column({ type: "varchar" })
  country_code: string;

  @Column({ type: "date" })
  start_date: Date;

  @Column({ type: "date" })
  end_date: Date;
}
