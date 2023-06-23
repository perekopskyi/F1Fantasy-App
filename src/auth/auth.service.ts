import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ActiveToken, TokenPayload } from './interfaces/payload.interface';
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
    try {
      const createdUser = await this.usersService.create(userDto);
      return instanceToPlain(createdUser);
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }

  getJwtToken(userId: number): ActiveToken {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    return { userId, token };
  }

  async validateUser(payload: ActiveToken) {
    const activeToken = await this.sessionRepository.findOne({
      where: { token: payload.token },
    });

    const user = await this.usersService.findById(activeToken.user);
    return instanceToPlain(user);
  }

  async invalidateAccessToken(token: string): Promise<void> {
    // Find and remove active access token
    const activeToken = await this.sessionRepository.findOne({
      where: { token },
    });
    await this.sessionRepository.delete(activeToken.id);
  }

  async saveAccessToken(activeToken: ActiveToken) {
    const createdActiveToken = this.sessionRepository.create({
      ...activeToken,
    });
    await this.sessionRepository.save(createdActiveToken);
  }
}
