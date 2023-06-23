import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from '../auth/decorators/user-id.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMe(@UserId() id: number) {
    return this.usersService.findById(id);
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @Put('/me')
  @UseGuards(JwtAuthGuard)
  update(@UserId() id: number, userDto: UpdateUserDto) {
    return this.usersService.update(id, userDto);
  }

  @Put('/delete')
  @UseGuards(JwtAuthGuard)
  removeUser(@Param('id') id: string) {
    // TODO
  }
}
