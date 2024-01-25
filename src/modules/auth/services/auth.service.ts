import { isEmpty } from "lodash";
import UserNotFoundException from "../exceptions/userNotFound.exception";
import AbstractException from "../../../core/exception/abstract.exception";
import UserRepository from "../../user/repositories/user.repository";
import TokenService from "./token.service";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import SuccessResponse from "../../../core/response/success.response";
import { User } from "../../user/entities/user.entity";
import { Req, Res } from "routing-controllers";

class AuthService {
  private userRepo: UserRepository;
  private tokenService: TokenService;

  constructor() {
    this.userRepo = new UserRepository();
    this.tokenService = new TokenService();
  }

  public async verifyCredentials(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (isEmpty(user)) {
      throw new UserNotFoundException();
    }

    const isPasswordCorrect = await user.validatePassword(password);

    if (!isPasswordCorrect) {
      throw new AbstractException("Password is incorrect", 400);
    }

    return user;
  }

  public async authenticateUser(
    @Req() req: Request,
    @Res() res: Response,
    next: NextFunction
  ) {
    passport.authenticate(
      "local",
      (err: Error, user: User, info: { message: string }) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          return res.status(400).json(info);
        }

        this.tokenService.generateUserTokens(user).then((token) => {
          return new SuccessResponse(
            { user, token },
            "User retrived succesfuly"
          ).send(res);
        });
      }
    )(req, res, next);
  }

  /**
   * refreshToken
   */
  public async refreshToken(token: string) {
    const decoded = await this.tokenService.verifyToken(token);
    const { userId } = decoded as Record<string, unknown>;
    const user = await this.userRepo.findOne({
      where: { id: userId as number },
    });

    if (!user) {
      throw new AbstractException("User not found", 404);
    }

    const data = this.tokenService.generateUserTokens(user);

    return data;
  }
}

export default AuthService;
