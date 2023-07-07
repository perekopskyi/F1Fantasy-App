import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'resetPassword' })
export class ResetPasswordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'bigint',
    nullable: false,
  })
  code: number;
}
