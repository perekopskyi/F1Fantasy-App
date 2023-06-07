import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from 'src/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriversService {

  constructor(
    @InjectRepository(Driver) private readonly driverRepository: Repository<Driver>,
  ) { }

  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    const newDriver = this.driverRepository.create(createDriverDto)
    return this.driverRepository.save(newDriver)
  }

  async findAll(): Promise<Driver[]> {
    return this.driverRepository.find();
  }

  async findOne(id: number): Promise<Driver> {
    return this.driverRepository.findOneBy({ id });
  }

  async update(id: number, updateDriverDto: UpdateDriverDto): Promise<UpdateResult> {
    return this.driverRepository.update(+id, updateDriverDto)
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.driverRepository.delete(id);
  }
}