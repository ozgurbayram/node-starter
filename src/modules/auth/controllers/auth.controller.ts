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

      const user = await this?.authService.getTokenViaPasswordGrant();

      console.log(user);

      return new SuccessResponse(user, "User retrived succesfuly").send(res);
    } catch (error) {
      console.log("err", error);
      return new ErrorResponse().send(res);
    }
  }

  /**
   * register
   */
  public static register() {}

  /**
   * logout
   */
  public logout() {}
}

export default AuthController;
