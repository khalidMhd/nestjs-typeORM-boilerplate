import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class AuthSignupDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8) // Minimum password length
  password: string;
}
