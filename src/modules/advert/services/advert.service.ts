import RouteService from "../../route/services/route.service";
import { CreateAdvertRequest } from "../advert.type";
import { Advert } from "../entities/advert.entity";
import AdvertRepository from "../repositories/advert.repository";

class AdvertService {
  private advertRepo: AdvertRepository;
  private routeService: RouteService;

  constructor() {
    this.advertRepo = new AdvertRepository();
    this.routeService = new RouteService();
  }

  /**
   * storeAdvert
   */
  public async storeAdvert(data: CreateAdvertRequest) {
    const { body, route, title } = data;

    const _route = await this.routeService.createRoute(route);

    const advert = new Advert();
    advert.body = body;
    advert.title = title;
    advert.route = _route;

    return await this.advertRepo.save(advert);
  }
}

export default AdvertService;
