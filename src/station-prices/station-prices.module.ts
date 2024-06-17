import { Module } from '@nestjs/common';
import { StationPricesService } from './station-prices.service';
import { StationPricesController } from './station-prices.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StationPricesController],
  providers: [StationPricesService],
})
export class StationPricesModule {}
