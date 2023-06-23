import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Repository } from 'typeorm';
import { PostgresErrorCode } from '../database/postgresErrorCodes.enum';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userDto: CreateUserDto) {
    try {
      const createdUser = this.userRepository.create(userDto);
      return await this.userRepository.save(createdUser);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('User already exists');
      }

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async update(id: number, userDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!updatedUser) {
      throw new NotFoundException(`User was not found`);
    }

    return await this.userRepository.save({ ...updatedUser, ...userDto });
  }

  remove() {
    // TODO need to add flag for removed users
  }

  async findById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return instanceToPlain(user);
  }

  async getByEmailOrNickname(username: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :username OR user.nickname = :username', {
        username,
      })
      .getOne();
  }
}
