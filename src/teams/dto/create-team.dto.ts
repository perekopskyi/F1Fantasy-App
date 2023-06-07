import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
    @ApiProperty()
    @IsNotEmpty()
    shortName: string;

    @ApiProperty()
    @IsNotEmpty()
    fullName: string;

    @ApiProperty()
    @IsNotEmpty()
    base: string;

    @ApiProperty()
    @IsNotEmpty()
    teamChief: string;

    @ApiProperty()
    @IsNotEmpty()
    chassis: string;

    @ApiProperty()
    @IsNotEmpty()
    powerUnit: string;

    @ApiProperty()
    @IsNotEmpty()
    championships: number;

    @ApiProperty()
    @IsNotEmpty()
    color: string;
}