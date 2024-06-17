import { Test, TestingModule } from '@nestjs/testing';
import { LocationIqService } from './location-iq.service';

describe('LocationIqService', () => {
  let service: LocationIqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationIqService],
    }).compile();

    service = module.get<LocationIqService>(LocationIqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
