import { IsNotEmpty, MinLength } from 'class-validator';

export class AuthChangePasswordDto {
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
