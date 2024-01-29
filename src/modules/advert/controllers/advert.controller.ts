import { Body, Controller, Get, Post, UseBefore } from "routing-controllers";
import { IsAuthenticated } from "../../../core/middlewares/authentication.middleware";
import { CreateAdvertRequest } from "../advert.type";
import AdvertService from "../services/advert.service";
import SuccessResponse from "../../../core/response/success.response";

@Controller("/advert")
@UseBefore(IsAuthenticated)
class AdvertController {
  private advertService: AdvertService;

  constructor() {
    this.advertService = new AdvertService();
  }

  /**
   * Store
   */
  @Post("/store")
  public async store(@Body({ validate: true }) body: CreateAdvertRequest) {
    const data = await this.advertService.storeAdvert(body);

    return new SuccessResponse({ data });
  }

  /**
   * getAll
   */
  @Get("/all")
  public async getAll() {}
}

export default AdvertController;
