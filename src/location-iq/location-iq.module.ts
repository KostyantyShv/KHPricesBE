import { Module } from '@nestjs/common';
import { LocationIqService } from './location-iq.service';
import { LocationIqController } from './location-iq.controller';

@Module({
  controllers: [LocationIqController],
  providers: [LocationIqService],
  exports: [LocationIqService],
})
export class LocationIqModule {}
