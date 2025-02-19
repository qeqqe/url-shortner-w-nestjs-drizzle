import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUser() {
    return this.userService.getAllUser();
  }

  @Post()
  async createUser(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }
}
