import { Injectable, ConflictException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { UserService } from '../user/user.service';
import { CreateTodoDto } from './tdo/create-todo.dto.ts';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private userService: UserService,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    try {
      let todo: Todo = new Todo();
      todo.title = createTodoDto.title;
      todo.date = new Date().toLocaleString();
      todo.completed = true;
      todo.user = await this.userService.findUserById(userId);
      return this.todoRepository.save(todo);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  findAllTodoByUserNotCompleted(userId: number) {
    try {
      return this.todoRepository.find({
        relations: ['user'],
        where: { user: { id: userId }, completed: false },
      });
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  findAllTodoByUserCompleted(userId: number) {
    try {
      return this.todoRepository.find({
        relations: ['user'],
        where: { user: { id: userId }, completed: true },
      });
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  update(todoId: number) {
    try {
      return this.todoRepository.update(todoId, { completed: true });
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  remove(todoId: number) {
    try {
      return this.todoRepository.delete(todoId);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
