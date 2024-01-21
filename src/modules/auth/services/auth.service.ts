import { isEmpty } from "lodash";
import UserNotFoundException from "../exceptions/userNotFound.exception";
import AbstractException from "../../../core/exception/abstract.exception";
import UserRepository from "../../user/repositories/user.repository";
import TokenService from "./token.service";

class AuthService {
  private userRepo: UserRepository;

  private tokenService: TokenService;

  constructor() {
    this.userRepo = new UserRepository();
    this.tokenService = new TokenService();
  }

  public async loginUser(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (isEmpty(user)) {
      throw new UserNotFoundException();
    }

    const isPasswordCorrect = await user.validatePassword(password);

    if (!isPasswordCorrect) {
      throw new AbstractException("Password is incorrect", 400);
    }

    await this.tokenService.revokeUserTokens(user);

    const { access_token, refresh_token } =
      await this.tokenService?.generateUserTokens(user);

    return {
      access_token,
      refresh_token,
    };
  }
}

export default AuthService;
