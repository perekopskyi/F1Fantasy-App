import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from '../auth/decorators/user-id.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  getMe(@UserId() id: number) {
    return this.usersService.findById(id);
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @Put('/me')
  updateUser(id: string) {
    // TODO
    // params: id, userDto: UpdateUserDto
    // return this.usersService.update(+id, userDto);
  }

  @Put('/delete')
  removeUser(@Param('id') id: string) {
    // TODO
  }
}
