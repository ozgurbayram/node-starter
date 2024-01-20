import { User } from "../entities/user.entity";

export interface ICreateUser
  extends Omit<
    User,
    | "password"
    | "created_at"
    | "updated_at"
    | "provider"
    | "social_id"
    | "id"
    | "setPassword"
    | "validatePassword"
  > {
  password: string;
  password_confirm: string;
}
