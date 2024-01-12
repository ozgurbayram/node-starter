import { FindOneOptions, Repository } from "typeorm";
import { User } from "../models/user.entity";
import { AppDataSource } from "../../../integrations/database";

class UserRepository extends Repository<User> {
  constructor() {
    super(User, AppDataSource.manager);
  }
  /**
   *getSubscribedUsers
   */
  public async getRegularUsers(): Promise<Array<User>> {
    try {
      const res = await this.query("select * from user");
      console.log(res);
    } catch (error) {
      console.log("res", error);
    }

    return this.find({ where: { provider: "regular" } });
  }
}

export default UserRepository;
