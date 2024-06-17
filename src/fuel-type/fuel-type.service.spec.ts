import { Test, TestingModule } from '@nestjs/testing';
import { FuelTypeService } from './fuel-type.service';

describe('FuelTypeService', () => {
  let service: FuelTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuelTypeService],
    }).compile();

    service = module.get<FuelTypeService>(FuelTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
