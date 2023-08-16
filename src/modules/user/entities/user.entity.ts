import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, Number(process.env.BCRYPT_KEY));
  }

  async comparePassword(password: string): Promise<boolean> {  
    const isVerified = await bcrypt.compare(password, this.password);
    return isVerified
  }
}
