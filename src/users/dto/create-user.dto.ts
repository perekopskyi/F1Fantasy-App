import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'test@email.com' })
  email: string;

  @ApiProperty({ default: 'password' })
  password: string;

  @ApiProperty({ default: 'UA' })
  countryCode: string;

  @ApiProperty({ default: 'testNick' })
  nickname: string;

  @ApiProperty({ default: 'John' })
  firstName: string;

  @ApiProperty({ default: 'Dou' })
  lastName: string;
}
