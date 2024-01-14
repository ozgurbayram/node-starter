import { NextFunction, Request, Response } from "express";
import SuccessResponse from "../../../core/response/success.response";
import AuthService from "../services/auth.service";
import ErrorResponse from "../../../core/response/error.response";
import UserService from "../../user/services/user.service";

class AuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  /**
   * login
   */
  public async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const user = await this?.authService.getTokenViaPasswordGrant(
      email,
      password
    );

    return new SuccessResponse({ user }, "User retrived succesfuly").send(res);
  }

  /**
   * register
   */
  public async register(req: Request, res: Response) {
    const { email, password, username } = req.body;

    const user = await this.userService.createUser({
      email,
      password,
      username,
    });

    return new SuccessResponse({ user }, "hello").send(res);
  }

  /**
   * logout
   */
  public logout() {}
}

export default AuthController;
