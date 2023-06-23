import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  public email: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  public nickname: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar' })
  public password: string;

  @Column({ type: 'varchar', default: '' })
  public firstName: string;

  @Column({ type: 'varchar', default: '' })
  public lastName: string;
}
