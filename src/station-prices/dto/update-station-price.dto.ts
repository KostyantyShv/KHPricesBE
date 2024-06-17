import { PartialType } from '@nestjs/mapped-types';
import { CreateStationPriceDto } from './create-station-price.dto';

export class UpdateStationPriceDto extends PartialType(CreateStationPriceDto) {}
