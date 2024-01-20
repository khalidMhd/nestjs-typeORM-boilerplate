import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto.ts';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}