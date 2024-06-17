import { Module } from '@nestjs/common';
import { FuelTypeService } from './fuel-type.service';
import { FuelTypeController } from './fuel-type.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FuelTypeController],
  providers: [FuelTypeService],
})
export class FuelTypeModule {}
