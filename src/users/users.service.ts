import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(userDto: CreateUserDto) {
    return await this.userRepository.save(userDto);
  }

  update() {
    // TODO
  }

  remove() {
    // TODO need to add flag for removed users
  }

  async findById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
