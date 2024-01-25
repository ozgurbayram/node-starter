import { Request, Response } from "express";
import SuccessResponse from "../../../core/response/success.response";
import UserService from "../services/user.service";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async me(req: Request, res: Response) {
    return new SuccessResponse({}, "me worked", 200).send(res);
  }

  public async getAllUsers(req: Request, res: Response) {
    const users = await this.userService.getAllUsers();

    return new SuccessResponse({ users }, "User list success", 200).send(res);
  }
}

export default UserController;
