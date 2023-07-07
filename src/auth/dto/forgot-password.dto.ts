import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ default: 'yevheniiperekopskyi@gmail.com' })
  @IsNotEmpty()
  email: string;
}
