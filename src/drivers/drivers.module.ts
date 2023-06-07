import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from 'src/typeorm';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Driver]),],
  controllers: [DriversController],
  providers: [DriversService]
})
export class DriversModule { }