import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {

  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
  ) { }

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const newDriver = this.teamRepository.create(createTeamDto)
    return this.teamRepository.save(newDriver)
  }

  async findAll(): Promise<Team[]> {
    return this.teamRepository.find();
  }

  async findOne(id: number): Promise<Team> {
    return this.teamRepository.findOneBy({ id });
  }

  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<UpdateResult> {
    return this.teamRepository.update(+id, updateTeamDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.teamRepository.delete(id);
  }
}