import { isEmpty } from "lodash";
import jwt from "jsonwebtoken";
import UserNotFoundException from "../exceptions/userNotFound.exception";
import AbstractException from "../../../core/exception/abstract.exception";
import { User } from "../../user/entities/user.entity";
import { AccessToken } from "../entities/acces-token.entity";
import AccessTokenRepository from "../repositories/access-token.repository";
import RefreshTokenRepository from "../repositories/refresh-token.repository";
import UserRepository from "../../user/repositories/user.repository";
import { RefreshToken } from "../entities/refresh-token.entity";

class AuthService {
  private userRepo: UserRepository;
  private accessTokenRepository: AccessTokenRepository;
  private refreshTokenRepository: RefreshTokenRepository;

  constructor() {
    this.userRepo = new UserRepository();
    this.accessTokenRepository = new AccessTokenRepository();
    this.refreshTokenRepository = new RefreshTokenRepository();
  }

  /**
   * getTokenViaPasswordGrant
   */
  public async loginUser(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (isEmpty(user)) {
      throw new UserNotFoundException();
    }

    const isPasswordCorrect = await user?.validatePassword(password);

    if (!isPasswordCorrect) {
      throw new AbstractException("Password is incorrect", 400);
    }

    await this.revokeUserTokens(user);

    const { access_token, refresh_token } = await this.generateUserTokens(user);

    return {
      access_token,
      refresh_token,
    };
  }

  public async revokeUserTokens(user: User) {
    const tokens = await this.accessTokenRepository.find({
      where: {
        user_id: user.id,
        revoked: false,
      },
    });

    if (!isEmpty(tokens)) {
      tokens.forEach(async (token) => {
        token.revoked = true;
        await this.accessTokenRepository.save(token);
      });
    }
  }

  public async generateUserTokens(
    user: User
  ): Promise<{ access_token: string; refresh_token: string }> {
    const access_token = await this.generateAccessToken(user);
    const refresh_token = await this.generateRefreshToken(
      user,
      access_token.id
    );

    return {
      access_token: access_token.token,
      refresh_token: refresh_token.token,
    };
  }
  /**
   * generateAccessToken
   */
  public async generateAccessToken(
    user: User
  ): Promise<{ id: number; token: string }> {
    const payload = {
      userId: user.id,
      email: user.email,
    };

    const accessToken = new AccessToken();

    accessToken.token = jwt.sign(payload, "token-secret", {
      expiresIn: 60,
    });

    accessToken.user_id = user.id;

    const token = await this.accessTokenRepository.save(accessToken);

    return {
      id: token.id,
      token: token.token,
    };
  }

  /**
   * generateRefreshToken
   */
  public async generateRefreshToken(
    user: User,
    accessTokenId: number
  ): Promise<{ id: number; token: string }> {
    const payload = {
      userId: user.id,
      email: user.email,
    };

    const refreshToken = new RefreshToken();

    refreshToken.token = jwt.sign(payload, "token-secret", {
      expiresIn: 60,
    });

    const accessToken = await this.accessTokenRepository.findOne({
      where: { id: accessTokenId },
    });

    if (!accessToken) {
      throw new AbstractException("Token Error");
    }

    refreshToken.access_token_id = accessTokenId;

    const token = await this.refreshTokenRepository.save(refreshToken);

    return token;
  }
}

export default AuthService;
