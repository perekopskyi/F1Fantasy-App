import { IsNotEmpty, IsNumberString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ default: '000000' })
  @IsNotEmpty()
  @IsNumberString()
  code: number;

  @ApiProperty({ default: 'n3wPa$$w0rd' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
