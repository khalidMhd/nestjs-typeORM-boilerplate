import { Exclude } from 'class-transformer';

export class UserResponseDTO {
  id: number;
  name: string;
  email: string;

  @Exclude() // Exclude this field from serialization
  password: string;

  createdAt: Date;
}
