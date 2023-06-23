import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
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

  async invalidateAccessToken(token: string): Promise<void> {
    console.log('🚀 TODO ~> AuthService ~> invalidateAccessToken:', token);
  }

  public getJwtRefreshToken(userId: number) {
    // TODO
    const payload: TokenPayload = { userId };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    // await this.sessionRepository.save(refreshToken)
    return { refreshToken };
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const user = await this.usersService.findById(userId);

    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    const session = this.sessionRepository.create({
      currentHashedRefreshToken,
      user,
    });
    return await this.sessionRepository.save(session);
  }
}
