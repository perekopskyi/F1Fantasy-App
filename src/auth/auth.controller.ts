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

  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  public async logout(@Headers('Authorization') accessToken: string) {
    if (!accessToken) {
      throw new HttpException(
        'Access token is missing',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = accessToken.split(' ')[1];
    await this.authService.invalidateAccessToken(token);

    return {
      success: true,
    };
  }

  @Post('register')
  public async register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  @Post()
  public async forgotPassword() {
    // TODO
  }

  @Post()
  public async resetPassword() {
    // TODO
  }
}
