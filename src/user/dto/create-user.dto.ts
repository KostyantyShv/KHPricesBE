import { IsNotEmpty, IsString, IsOptional, Matches } from 'class-validator';
import { LOGIN_REGEX, PWD_REGEX } from 'src/regex';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(LOGIN_REGEX, {
    message: 'Error validation username',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @Matches(PWD_REGEX, {
    message: 'password too weak',
  })
  password: string;

  // @IsOptional()
  // @IsInt()
  // role: Prisma.RoleCreateNestedOneWithoutUsersInput;

  @IsOptional()
  @IsString()
  avatar?: string; // Optional since avatars may not be provided during user creation
}
