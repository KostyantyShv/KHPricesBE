import { IsString } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  logo: string;
}
