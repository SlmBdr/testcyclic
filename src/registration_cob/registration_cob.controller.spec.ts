import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationCobController } from './registration_cob.controller';
import { RegistrationCobService } from './registration_cob.service';

describe('RegistrationCobController', () => {
  let controller: RegistrationCobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrationCobController],
      providers: [RegistrationCobService],
    }).compile();

    controller = module.get<RegistrationCobController>(
      RegistrationCobController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
