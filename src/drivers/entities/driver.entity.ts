import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Team } from 'src/typeorm';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'driver_id',
  })
  id: number;

  @Column({
    name: 'short_name',
    nullable: false,
    default: '',
  })
  shortName: string;

  @Column({
    name: 'full_name',
    nullable: false,
    default: '',
  })
  fullName: string;

  @ManyToOne(() => Team, (team) => team.drivers)
    team: Team
}