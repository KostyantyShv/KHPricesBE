import { Module } from '@nestjs/common';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LocationIqModule } from 'src/location-iq/location-iq.module';

@Module({
  imports: [PrismaModule, LocationIqModule],
  controllers: [StationsController],
  providers: [StationsService],
})
export class StationsModule {}
