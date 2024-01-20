import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Todo } from 'src/modules/todo/entities/todo.entity';

@Entity('users') // Specify the table name
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  // one user can have multipe todos
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, Number(process.env.BCRYPT_KEY));
  }

  async comparePassword(password: string): Promise<boolean> {  
    const isVerified = await bcrypt.compare(password, this.password);
    return isVerified
  }
}
