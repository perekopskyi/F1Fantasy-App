import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ required: true, default: 'testNick' })
  username: string;

  @ApiProperty({ required: true, default: 'password' })
  password: string;
}
