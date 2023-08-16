import { IsNotEmpty, IsEmail } from 'class-validator';

export class AuthLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
