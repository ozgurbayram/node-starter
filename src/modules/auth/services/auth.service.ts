import { AppDataSource } from "../../../integrations/database";
import { User } from "../../user/models/user.entity";

class AuthService {
  /**
   * getTokenViaPasswordGrant
   */
  public async getTokenViaPasswordGrant(username: string, password: string) {
    const user = await AppDataSource.getRepository(User).findOne({
      where: { username: username },
    });

    if (!user?.validatePassword(password)) {
      return null;
    }

    return {
      username: user.username,
      token: user.email,
    };
  }
}

export default AuthService;
