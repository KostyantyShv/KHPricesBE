import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationIqDto } from './create-location-iq.dto';

export class UpdateLocationIqDto extends PartialType(CreateLocationIqDto) {}
