import { Test, TestingModule } from '@nestjs/testing';
import { StationPricesController } from './station-prices.controller';
import { StationPricesService } from './station-prices.service';

describe('StationPricesController', () => {
  let controller: StationPricesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StationPricesController],
      providers: [StationPricesService],
    }).compile();

    controller = module.get<StationPricesController>(StationPricesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
