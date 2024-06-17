import { Test, TestingModule } from '@nestjs/testing';
import { FuelTypeController } from './fuel-type.controller';
import { FuelTypeService } from './fuel-type.service';

describe('FuelTypeController', () => {
  let controller: FuelTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuelTypeController],
      providers: [FuelTypeService],
    }).compile();

    controller = module.get<FuelTypeController>(FuelTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
