import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create-user')
  async create(@Body() createUserDto: Prisma.UserCreateInput) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException('Error during creating user', 500);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new HttpException('Error during finding all users', 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Get('/find/:login')
  async findByLogin(@Param('login') login: string) {
    try {
      return await this.userService.findByLogin(login);
    } catch (error) {
      throw new HttpException('User not found', 404);
    }
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
