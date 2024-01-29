import { Repository } from "typeorm";
import { Route } from "../entities/route.entity";
import { AppDataSource } from "../../../integrations/database";

class RouteRepository extends Repository<Route> {
  constructor() {
    super(Route, AppDataSource.manager);
  }
}

export default RouteRepository;
