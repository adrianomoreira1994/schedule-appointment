import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/dtos/user/create-user.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  public async find(@Param('id') id): Promise<User> {
    return await this.userService.findById(id);
  }

  @Get()
  public async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
