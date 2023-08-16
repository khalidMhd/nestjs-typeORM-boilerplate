import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[] | null> {
    try {
      const user = await this.userRepository.find();
      if (!user) {
        throw new NotFoundException('No user records found');
      }
      return user;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  getUserById(): string {
    return 'Hello World!';
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });
      if (!user) {
        throw new NotFoundException('No user records found');
      }
      return user;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
