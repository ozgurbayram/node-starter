import { Request, Response } from "express";
import SuccessResponse from "../../../core/response/success.response";
import AuthService from "../services/auth.service";
import UserService from "../../user/services/user.service";
import { ICreateUser } from "../../user/services/user.service.interface";
import TokenService from "../services/token.service";

class AuthController {
  private authService: AuthService;
  private userService: UserService;
  private tokenService: TokenService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
    this.tokenService = new TokenService();
  }

  /**
   * login
   */
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await this.authService.loginUser(email, password);

    return new SuccessResponse({ user }, "User retrived succesfuly").send(res);
  }

  /**
   * register
   */
  public async register(req: Request, res: Response) {
    const { email, password, username, password_confirm } =
      req.body as ICreateUser;

    const user = await this.userService.createUser({
      email,
      password,
      password_confirm,
      username,
    });

    return new SuccessResponse({ user }, "Register Success").send(res);
  }

  public async refreshToken(req: Request, res: Response) {
    const { refresh_token } = req.body;

    const data = await this.tokenService.refreshToken(refresh_token);

    return new SuccessResponse({ data }, "Refresh token sucecss").send(res);
  }

  /**
   * logout
   */
  public logout() {
    console.log("logout worked");
  }
}

export default AuthController;
