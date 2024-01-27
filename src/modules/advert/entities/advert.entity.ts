import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import TimeStampModel from "../../../core/entities/timestamp.entity";
import { User } from "../../user/entities/user.entity";
import { AdvertStatus } from "../enums/advert-status.enum";
import { Route } from "../../route/entities/route.entity";

@Entity()
export class Advert extends TimeStampModel {
  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "varchar" })
  body: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "creator_id" })
  creator: User;

  @Column({ type: "varchar", default: AdvertStatus.ACTIVE })
  status: AdvertStatus;

  @ManyToOne(() => Route)
  @JoinColumn({ name: "route_id" })
  route: Route;
}
