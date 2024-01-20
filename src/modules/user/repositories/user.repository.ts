import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../../../integrations/database";

class UserRepository extends Repository<User> {
  constructor() {
    super(User, AppDataSource.manager);
  }

  /**
   *getSubscribedUsers
   */
  public async getRegularUsers(): Promise<Array<User>> {
    const users = this.find({ where: { provider: "regular" } });
    return users;
  }
}

export default UserRepository;
