import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { LocationIqModule } from './location-iq/location-iq.module';
import { StationsModule } from './stations/stations.module';
import { BrandsModule } from './brands/brands.module';
import { FacilityModule } from './facility/facility.module';
import { StationPricesModule } from './station-prices/station-prices.module';
import { FuelTypeModule } from './fuel-type/fuel-type.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    LocationIqModule,
    StationsModule,
    BrandsModule,
    FacilityModule,
    StationPricesModule,
    FuelTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
