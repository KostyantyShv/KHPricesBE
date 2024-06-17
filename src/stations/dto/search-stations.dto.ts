import { IsNumber, IsOptional, IsString } from 'class-validator';

export class searchStationsDTO {
  @IsString()
  placeName: string;

  @IsNumber()
  maxDistance: number;

  @IsString()
  fuelTypeIds: string;

  @IsString()
  @IsOptional()
  facilityIds: string;

  @IsString()
  @IsOptional()
  brandIds: string;
}
