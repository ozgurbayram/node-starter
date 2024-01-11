import { FindOneOptions, Repository } from "typeorm";
import { User } from "../models/user.entity";

class UserRepository extends Repository<User> {
  /**
   *getSubscribedUsers
   */
  public async getRegularUsers(): Promise<Array<User>> {
    return this.find({ where: { provider: "regular" } });
  }
}

export default UserRepository;
