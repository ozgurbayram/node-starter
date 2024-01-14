import { isEmpty } from "lodash";
import UserRepository from "../../user/repositories/user.repository";
import UserNotFoundException from "../exceptions/userNotFound.exception";
import AbstractException from "../../../core/exception/abstract.exception";

class AuthService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  /**
   * getTokenViaPasswordGrant
   */
  public async getTokenViaPasswordGrant(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (isEmpty(user)) {
      throw new UserNotFoundException();
    }

    const isPasswordCorrect = await user?.validatePassword(password);

    if (!isPasswordCorrect) {
      throw new AbstractException("Password is incorrect", 400);
    }

    return user;
  }

  /**
   * registerUser
   */
  public async registerUser(data: Record<string, unknown>) {}
}

export default AuthService;
