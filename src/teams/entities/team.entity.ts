import { Driver } from 'src/typeorm';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Team {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'team_id',
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

    @Column({
        name: 'base',
        nullable: false,
        default: '',
    })
    base: string;

    @Column({
        name: 'team_chief',
        nullable: false,
        default: '',
    })
    teamChief: string;

    @Column({
        name: 'chassis',
        nullable: false,
        default: '',
    })
    chassis: string;

    @Column({
        name: 'power_unit',
        nullable: false,
        default: '',
    })
    powerUnit: string;

    @Column({
        name: 'championships',
        nullable: false,
        default: 0,
    })
    championships: number;

    @Column({
        name: 'color',
        nullable: false,
        default: '',
    })
    color: string;

    @OneToMany(() => Driver, (driver) => driver.team)
    drivers: Driver[]
}