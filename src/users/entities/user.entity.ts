import { hash } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { IsEmail, IsOptional, IsString, isString } from 'class-validator';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  @IsEmail()
  public email: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  @IsString()
  public nickname: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar' })
  @IsString()
  public password: string;

  @Column({ type: 'varchar', default: '' })
  @IsString()
  @IsOptional()
  public firstName: string;

  @Column({ type: 'varchar', default: '' })
  @IsString()
  @IsOptional()
  public lastName: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
