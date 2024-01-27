import { Column, Entity, ManyToOne } from "typeorm";
import AbstactEntity from "../../../core/entities/abstract.entity";

@Entity()
export class Route extends AbstactEntity {
  @ManyToOne(() => Location)
  deparature: Location;

  @ManyToOne(() => Location)
  destination: Location;

  @Column({ type: "varchar" })
  country_code: string;

  @Column({ type: "date" })
  start_date: Date;

  @Column({ type: "date" })
  end_date: Date;
}
