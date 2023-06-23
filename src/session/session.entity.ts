import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../typeorm';

@Entity('session')
export class SessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  token: string;

  @Column()
  currentHashedRefreshToken: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
