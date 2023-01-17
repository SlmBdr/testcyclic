import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationCobService } from './registration_cob.service';

describe('RegistrationCobService', () => {
  let service: RegistrationCobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrationCobService],
    }).compile();

    service = module.get<RegistrationCobService>(RegistrationCobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
