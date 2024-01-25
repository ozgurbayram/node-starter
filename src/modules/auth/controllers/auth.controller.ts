import { NextFunction, Request, Response } from "express";
import SuccessResponse from "../../../core/response/success.response";
import AuthService from "../services/auth.service";
import UserService from "../../user/services/user.service";
import { ICreateUser } from "../../user/services/user.service.interface";
import { Body, Controller, Get, Post, Req, Res } from "routing-controllers";
import { validateOrReject } from "class-validator";

@Controller("/auth")
class AuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  @Get("/login")
  public async login(
    @Req() req: Request,
    @Res() res: Response,
    next: NextFunction
  ) {
    return this.authService.authenticateUser(req, res, next);
  }

  @Post("/register")
  public async register(
    @Req() req: Request,
    @Res() res: Response,
    next: NextFunction
  ) {
    console.log(req.body);

    const { email, password, username, password_confirm } =
      req.body as ICreateUser;

    await this.userService.createUser({
      email,
      password,
      password_confirm,
      username,
    });

    return this.authService.authenticateUser(req, res, next);
  }

  @Post("/refresh_token")
  public async refreshToken(@Req() req: Request, @Res() res: Response) {
    const { refresh_token } = req.body;

    const data = await this.authService.refreshToken(refresh_token);

    return new SuccessResponse({ data }, "Refresh token sucecss").send(res);
  }

  @Post("/logout")
  public async logout(@Req() req: Request, @Res() res: Response) {
    return new SuccessResponse({}, "hello from logout").send(res);
  }

  @Post("/deneme")
  async deneme(@Body() body: { email: string }) {
    console.log(body);

    return "Hello";
  }
}

export default AuthController;
