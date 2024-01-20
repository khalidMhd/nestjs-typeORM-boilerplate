import {
  Controller,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Req,
  Request,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignupDto } from './tdo/auth-signup.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AuthLoginDto } from './tdo/auth-login.dto';
import { AuthChangePasswordDto } from './tdo/auth-change-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/modules/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe()) // Apply ValidationPipe
  async signUp(@Body() signupDto: AuthSignupDto): Promise<{ message: string }> {
    try {
      await this.authService.signUp(signupDto);
      return { message: 'Signup successful' };
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() loginDto: AuthLoginDto,
  ): Promise<{ accessToken: string }> {
    try {
      const token = await this.authService.login(loginDto);
      return { accessToken: token };
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('change-password')
  async changePassword(
    @Request() req,
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    try {
      const userId = req.user.id;
      const result = await this.authService.changePassword(
        userId,
        oldPassword,
        newPassword,
      );
      return result;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
