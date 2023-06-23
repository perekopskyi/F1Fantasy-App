import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { TokenPayload } from './interfaces/payload.interface';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from '../session/session.entity';

@Injectable()
export class AuthService {
  constructor(
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
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    try {
      const user = await this.usersService.create({
        ...userDto,
        password: hashedPassword,
      });
      return user;
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }

  getJwtToken(userId: number) {
    const payload: TokenPayload = { userId };

    const token = this.jwtService.sign(payload);
    return token;
  }

  async invalidateAccessToken(token: string): Promise<void> {
    // Find and remove active access token
    await this.sessionRepository.delete(token);
  }

  async saveAccessToken(token: string) {
    const activeToken = this.sessionRepository.create({ token });
    await this.sessionRepository.save(activeToken);
  }
}
