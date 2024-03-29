import { Request, Response } from "express";
import SuccessResponse from "../../../core/response/success.response";
import AuthService from "../services/auth.service";
import UserService from "../../user/services/user.service";
import { Body, JsonController, Post, Req, Res } from "routing-controllers";
import { RegisterRequest } from "../dtos/auth.dto";

@JsonController("/auth")
class AuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  @Post("/login")
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    const data = await this.authService.loginViaPasswordGrant(email, password);

    return new SuccessResponse({ data });
  }

  @Post("/register")
  public async register(@Body({ validate: true }) body: RegisterRequest) {
    const { email, password, username, password_confirm } = body;

    const user = await this.userService.createUser({
      email,
      password,
      password_confirm,
      username,
    });

    const data = await this.authService.loginViaPasswordGrant(
      user.email,
      password
    );

    return new SuccessResponse({ data });
  }

  @Post("/refresh_token")
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const { refresh_token } = req.body;

    const data = await this.authService.refreshToken(refresh_token);

    return new SuccessResponse({ data }, "Refresh token sucecss").send(res);
  }

  @Post("/logout")
  async logout(@Req() req: Request, @Res() res: Response) {
    return new SuccessResponse({}, "hello from logout").send(res);
  }

  @Post("/deneme")
  async deneme(@Body() body: { email: string }) {
    return "Hello";
  }
}

export default AuthController;
