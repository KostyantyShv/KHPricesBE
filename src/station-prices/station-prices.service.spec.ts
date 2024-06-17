import { Test, TestingModule } from '@nestjs/testing';
import { StationPricesService } from './station-prices.service';

describe('StationPricesService', () => {
  let service: StationPricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StationPricesService],
    }).compile();

    service = module.get<StationPricesService>(StationPricesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
