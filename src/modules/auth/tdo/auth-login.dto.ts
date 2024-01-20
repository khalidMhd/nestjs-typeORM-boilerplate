import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class AuthLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
