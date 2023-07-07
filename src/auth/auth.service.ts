import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { TokenPayload } from './interfaces/payload.interface';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from '../session/session.entity';
import { sendEmail } from '../utils/sendEmail';
import { createCode } from '../utils/createCode';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordEntity } from './entities/reset-password.entity';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
    @InjectRepository(ResetPasswordEntity)
    private resetPasswordRepository: Repository<ResetPasswordEntity>,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    return await this.usersService.getByEmailOrNickname(loginUserDto.username);
  }

  public async getAuthenticatedUser(username: string, hashedPassword: string) {
    try {
      const user = await this.usersService.getByEmailOrNickname(username);
      await this.verifyPassword(user.password, hashedPassword);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async register(userDto: CreateUserDto) {
    try {
      const createdUser = await this.usersService.create(userDto);
      return instanceToPlain(createdUser);
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }

  getJwtToken(userId: number): string {
    const payload: TokenPayload = { userId };
    return this.jwtService.sign(payload);
  }

  async validateUser({ userId }: TokenPayload) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return instanceToPlain(user);
  }

  async forgotPassword({ email }: ForgotPasswordDto) {
    // Check if user exists
    const user = await this.usersService.getByEmailOrNickname(email);
    // If user not existed do nothing
    if (!user) throw new BadRequestException();

    const code = createCode();
    try {
      const createdCode = this.resetPasswordRepository.create({ email, code });
      sendEmail(createdCode);
      await this.resetPasswordRepository.save(createdCode);

      return {
        success: true,
        message: 'Reset code was created!',
      };
    } catch (error) {
      console.log('🚀 ~> AuthService ~> error:', error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async resetPassword({ code, password }: ResetPasswordDto) {
    try {
      // Find the entity by code and remove it from the table
      const resetEntity = await this.resetPasswordRepository.findOne({
        where: { code },
      });

      if (resetEntity) {
        // Find the user by email from the usersService
        const user = await this.usersService.getByEmailOrNickname(
          resetEntity.email,
        );

        if (!user) throw new Error('User not found');

        // Save the updated user entity
        await this.usersService.update(user.id, { ...user, password });

        // Remove the reset entity from the table
        await this.resetPasswordRepository.remove(resetEntity);

        // Return a success message or perform any other necessary actions
        return { message: 'Password updated successful' };
      } else {
        // Handle the case when the reset entity is not found
        throw new Error('Reset entity not found');
      }
    } catch (error) {
      // Handle any errors that occurred during the process
      throw new Error('Failed to reset password');
    }
  }

  // TODO in next versions
  // async logout(token: string): Promise<void> {
  //   const { userId }: TokenPayload = await this.jwtService.verifyAsync(token);
  //   await this.jwtService.signAsync({ userId }, { expiresIn: '1' });
  // }

  // public getJwtRefreshToken(userId: number) {
  //   const payload: TokenPayload = { userId };
  //   const refreshToken = this.jwtService.sign(payload, {
  //     secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
  //     expiresIn: `${this.configService.get(
  //       'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
  //     )}s`,
  //   });
  //   await this.sessionRepository.save(refreshToken)
  //   return { refreshToken };
  // }

  // async setCurrentRefreshToken(refreshToken: string, userId: number) {
  //   const user = await this.usersService.findById(userId);

  //   const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
  //   const session = this.sessionRepository.create({
  //     currentHashedRefreshToken,
  //     user,
  //   });
  //   return await this.sessionRepository.save(session);
  // }
}
