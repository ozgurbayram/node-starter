import { Request, Response } from "express";
import SuccessResponse from "../../../core/response/success.response";
import AuthService from "../services/auth.service";
import ErrorResponse from "../../../core/response/error.response";

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
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

      return new SuccessResponse(user, "User retrived succesfuly").send(res);
    } catch (error) {
      return new ErrorResponse().send(res);
    }
  }

  /**
   * register
   */
  public async register(req: Request, res: Response) {
    return new SuccessResponse(undefined, "hello").send(res);
  }

  /**
   * logout
   */
  public logout() {}
}

export default AuthController;
