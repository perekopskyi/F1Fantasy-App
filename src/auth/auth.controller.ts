import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.login(loginUserDto);

    if (!user) {
      throw new BadRequestException();
    }

    const token = this.authService.getJwtToken(user.id);

    return {
      success: true,
      data: {
        access_token: token,
      },
    };
  }

  // @ApiBearerAuth('Authorization')
  // @UseGuards(JwtAuthGuard)
  // @HttpCode(HttpStatus.OK)
  // @Post('logout')
  // public async logout(@Headers('Authorization') accessToken: string) {
  //   if (!accessToken) {
  //     throw new HttpException(
  //       'Access token is missing',
  //       HttpStatus.UNAUTHORIZED,
  //     );
  //   }

  //   const token = accessToken.split(' ')[1];
  //   await this.authService.logout(token);

  //   return {
  //     success: true,
  //   };
  // }

  @Post('register')
  public async register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgotPassword')
  public async forgotPassword(@Body() email: ForgotPasswordDto) {
    await this.authService.forgotPassword(email);
    return {
      success: true,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('resetPassword')
  public async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
