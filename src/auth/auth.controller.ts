import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  async signIn(@Body() signInUserData: Prisma.UserCreateInput) {
    try {
      return await this.authService.signIn(signInUserData);
    } catch (error) {
      throw new HttpException('Error during signing in', 500);
    }
  }
  @Post('/sign-up')
  async signUp(@Body() signUpUserData: Prisma.UserCreateInput) {
    try {
      return await this.authService.signUp(signUpUserData);
    } catch (error) {
      if (
        error.status === HttpStatus.BAD_REQUEST ||
        HttpStatus.NOT_FOUND ||
        error.status === HttpStatus.CONFLICT
      ) {
        throw error;
      }
      throw new HttpException('Error during signing up', 500);
    }
  }
}
