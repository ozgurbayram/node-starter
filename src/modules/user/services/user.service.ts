import AbstractException from "../../../core/exception/abstract.exception";
import { RegisterRequest } from "../../auth/dtos/auth.dto";
import { User } from "../entities/user.entity";
import UserRepository from "../repositories/user.repository";
import { UserProvider } from "../user.enums";
class UserService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  /**
   * createUser
   */
  public async createUser({
    email,
    username,
    password,
    password_confirm,
  }: RegisterRequest) {
    const isExist = await this.userRepo.findOne({
      where: { email: email },
    });

    if (isExist) {
      throw new AbstractException("User already exist", 400);
    }

    if (password !== password_confirm) {
      throw new AbstractException("Password Mismatch", 400);
    }

    const user = new User();

    user.email = email;
    user.username = username ? username : null;
    user.provider = UserProvider.REGULAR;
    user.avatar_url = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`;

    await user.setPassword(password);

    await this.userRepo.save(user);

    return user;
  }

  /**
   * getAllUsers
   */
  public async getAllUsers() {
    return this.userRepo.getRegularUsers();
  }
}

export default UserService;
