import { Location } from "../entities/location.entity";
import RouteRepository from "../repository/route.repository";

class RouteService {
  private routeRepository: RouteRepository;

  constructor() {
    this.routeRepository = new RouteRepository();
  }

  /**
   * createRoute
   */
  public async createRoute(route: {
    depareture: Omit<Location, "id">;
    destination: Omit<Location, "id">;
  }) {
    return await this.routeRepository.save(route);
  }
}

export default RouteService;
