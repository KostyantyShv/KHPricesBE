import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(signInUserData: Prisma.UserCreateInput) {
    try {
      const userData = await this.userService.findByLoginAndPassword(
        signInUserData.username,
        signInUserData.password,
      );
      if (!userData) {
        throw new HttpException(
          'Wrong login or password',
          HttpStatus.BAD_REQUEST,
        );
      }
      const token = this.jwtService.sign(userData, {
        expiresIn: '30d',
        secret: process.env.JWT_SECRET,
      });
      return {
        auth: true,
        access_token: token,
        userData: userData,
      };
      // return await this.userService.createUser(signInUserData);
    } catch (error) {
      throw error;
    }
  }

  async signUp(signUpUserData: Prisma.UserCreateInput) {
    try {
      const checkForUser = await this.userService.findByLogin(
        signUpUserData.username,
      );
      if (checkForUser) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }
      const userData = await this.userService.createUser(signUpUserData);
      if (userData) {
        return { message: 'User created', login: userData.username };
      }
      throw new HttpException(
        'Error during signing up',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (error) {
      throw error;
    }
  }
}
