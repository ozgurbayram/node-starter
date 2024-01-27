import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Min,
  isEAN,
} from "class-validator";

export class LoginRequest {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 100)
  password: string;
}

export class RegisterRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(4)
  username: string;

  @IsString()
  @Length(8)
  password: string;

  @IsString()
  @Length(8)
  password_confirm: string;
}
