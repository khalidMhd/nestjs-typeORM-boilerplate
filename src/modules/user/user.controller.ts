import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { TransformInterceptor } from '../../Interceptor/transform.interceptor';
import { UserResponseDTO } from './tdo/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-users')
  getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-user-by-id')
  // @UseInterceptors(TransformInterceptor)
  async getUserById(@Request() req): Promise<UserResponseDTO> {
    const userId = req.user.id;
    const user = await this.userService.getUserById(userId);
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-user-by-email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }
}
