export interface ICreateUser {
  username?: string;
  password: string;
  password_confirm: string;
  user_type?: string;
  email: string;
}
