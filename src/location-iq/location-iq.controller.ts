import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { LocationIqService } from './location-iq.service';

@Controller('location-iq')
export class LocationIqController {
  constructor(private readonly locationIqService: LocationIqService) {}

  @Get('coords-by-location/:placeName')
  async getCoordsFromPlaceName(@Param('placeName') placeName: string) {
    try {
      return await this.locationIqService.getCoordsFromPlaceName(placeName);
    } catch (error) {
      console.log(error.status);
      if (error === 400) {
        throw new HttpException('Place not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
