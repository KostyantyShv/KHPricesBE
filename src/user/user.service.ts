import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(userData: Prisma.UserCreateInput) {
    try {
      if (!userData.avatar) {
        userData.avatar = ''; // Default empty avatar
      }

      // Generate a random salt
      const hash = await this.hashPassword(userData.password);

      userData.password = hash;
      console.log(userData.password);
      if (!userData.role) {
        userData.role = {
          connect: {
            id: 1,
          },
        };
      }

      return this.prisma.user.create({
        data: userData,
      });
    } catch (e) {
      throw e;
    }
  }
  async hashPassword(password: string) {
    try {
      // const salt = await bcrypt.genSalt();
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      return hash;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const usersData = await this.prisma.user.findMany();
      usersData.forEach((user) => {
        delete user.password;
      });
      return usersData;
    } catch (error) {
      throw error;
    }
  }
  async findByLogin(login: string) {
    try {
      const userData = await this.prisma.user.findUnique({
        where: {
          username: login,
        },
      });
      if (userData) {
        delete userData.password;
        return userData;
      }
      return null;
    } catch (e) {
      throw e;
    }
  }

  async findByLoginAndPassword(login: string, password: string) {
    try {
      const userData = await this.prisma.user.findUnique({
        where: {
          username: login,
        },
      });
      if (userData) {
        const isMatch = await bcrypt.compare(password, userData.password);
        if (isMatch) {
          delete userData.password;
          return userData;
        }
      }
      return null;
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: number) {
    try {
      const userData = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      if (userData) {
        delete userData.password;
        return userData;
      }
      throw new HttpException('User not found', 404);
    } catch (e) {
      throw e;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
