import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/user/entities/user.entity';
import { AuthSignupDto } from './tdo/auth-signup.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './tdo/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signupDto: AuthSignupDto): Promise<{ accessToken: string }> {
    try {
      const { name, email, password } = signupDto;

      // Check if email already exists
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      // Create user
      const newUser = this.userRepository.create({
        name,
        email,
        password,
      });
      await this.userRepository.save(newUser);
      const payload = { sub: newUser.id, email: newUser.email }; // Customize payload as needed
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async login(loginDto: AuthLoginDto): Promise<string> {
    try {
      const { email, password } = loginDto;

      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const passwordMatch = await user.comparePassword(password);

      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { id: user.id, email: user.email };
      const token = this.jwtService.sign(payload);

      return token;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new ConflictException('User not found');
      }
      // Verify old password
      const isPasswordValid = await user.comparePassword(oldPassword);

      if (!isPasswordValid) {
        throw new ConflictException('Invalid old password');
      }

      // Update password
      user.password = await bcrypt.hash(newPassword, Number(process.env.BCRYPT_KEY));
      await this.userRepository.save(user);

      return { message: 'Password changed successfully' };
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async validateUserById(userId: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new UnauthorizedException('Invalid user ID');
      }
      return user;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
