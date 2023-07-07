import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ default: 'your@email.com' })
  @IsNotEmpty()
  email: string;
}
