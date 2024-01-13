import { User } from "../models/user.entity";
import UserRepository from "../repositories/user.repository";
import { ICreateUser } from "./user.service.interface";

class UserService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  /**
   * createUser
   */
  public async createUser({ email, password, username }: ICreateUser) {
    try {
      const isExist = await this.userRepo.findOne({
        where: { email: email },
      });

      if (isExist) {
        return;
      }

      if (isExist === null) {
        const user = new User();

        (user.username = username), (user.email = email);

        await user.setPassword(password);

        this.userRepo.save(user);
        return user;
      }
    } catch (error) {
      return error;
    }
  }
}

export default UserService;
