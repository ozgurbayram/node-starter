import UserRepository from "../../user/repositories/user.repository";

class AuthService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  /**
   * getTokenViaPasswordGrant
   */
  public async getTokenViaPasswordGrant(username: string, password: string) {
    const user = await this.userRepo.findOne({
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

  /**
   * registerUser
   */
  public async registerUser(data: Record<string, unknown>) {}
}

export default AuthService;
