import { Test, TestingModule } from '@nestjs/testing';
import { LocationIqController } from './location-iq.controller';
import { LocationIqService } from './location-iq.service';

describe('LocationIqController', () => {
  let controller: LocationIqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationIqController],
      providers: [LocationIqService],
    }).compile();

    controller = module.get<LocationIqController>(LocationIqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
