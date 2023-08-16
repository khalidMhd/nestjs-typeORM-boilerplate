import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-users')
  getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-user-by-id')
  getUserById(@Request() req,) {
    console.log(req.user);
    return req.user
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-user-by-email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }
}