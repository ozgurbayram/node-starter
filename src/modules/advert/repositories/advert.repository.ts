import { Repository } from "typeorm";
import { Advert } from "../entities/advert.entity";
import { AppDataSource } from "../../../integrations/database";

class AdvertRepository extends Repository<Advert> {
  constructor() {
    super(Advert, AppDataSource.manager);
  }
}

export default AdvertRepository;
