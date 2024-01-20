import { isEmpty } from "lodash";
import { User } from "../../user/entities/user.entity";
import AccessTokenRepository from "../repositories/access-token.repository";
import RefreshTokenRepository from "../repositories/refresh-token.repository";
import { AccessToken } from "../entities/acces-token.entity";
import jwt from "jsonwebtoken";
import AbstractException from "../../../core/exception/abstract.exception";
import { RefreshToken } from "../entities/refresh-token.entity";

class TokenService {
  private accessTokenRepository: AccessTokenRepository;
  private refreshTokenRepository: RefreshTokenRepository;

  constructor() {
    this.accessTokenRepository = new AccessTokenRepository();
    this.refreshTokenRepository = new RefreshTokenRepository();
  }

  public async revokeUserTokens(user: User) {
    const tokens = await this.accessTokenRepository.find({
      where: {
        user: user,
        revoked: false,
      },
    });

    if (!isEmpty(tokens)) {
      for (const token in tokens) {
        if (Object.prototype.hasOwnProperty.call(tokens, token)) {
          const element = tokens[token];
          element.revoked = true;
          await this.accessTokenRepository.save(element);
        }
      }
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

    accessToken.user = user;

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

    refreshToken.accessToken = accessToken;

    const token = await this.refreshTokenRepository.save(refreshToken);

    return token;
  }

  /**
   * refreshToken
   */
  public async refreshToken(token: string) {
    if (!token) {
      throw new AbstractException("Refresh token is required", 400);
    }

    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { token: token, revoked: false },
      relations: ["accessToken", "accessToken.user"],
    });

    if (!refreshToken) {
      throw new AbstractException("Invalid refresh token", 401);
    }

    const accessToken = refreshToken.accessToken;

    if (!accessToken) {
      throw new AbstractException("Access token not found", 401);
    }

    const user = accessToken.user;
    if (!user) {
      throw new AbstractException("User not found", 401);
    }

    refreshToken.revoked = true;
    await this.refreshTokenRepository.save(refreshToken);

    const { access_token, refresh_token } = await this.generateUserTokens(user);

    return {
      access_token,
      refresh_token,
    };
  }
}

export default TokenService;
