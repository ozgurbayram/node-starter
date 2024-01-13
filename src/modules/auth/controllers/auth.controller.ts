import { Request, Response } from "express";
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
  public async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const user = await this?.authService.getTokenViaPasswordGrant(
        username,
        password
      );

      if (user === null) {
        return new ErrorResponse(undefined, "Wrong credentials").send(res);
      }

      return new SuccessResponse({ user }, "User retrived succesfuly").send(
        res
      );
    } catch (error) {
      return new ErrorResponse().send(res);
    }
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
