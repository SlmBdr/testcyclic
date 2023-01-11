import { Test, TestingModule } from '@nestjs/testing';
import { EntityEmployeeService } from './entity_employee.service';

describe('EntityEmployeeService', () => {
  let service: EntityEmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntityEmployeeService],
    }).compile();

    service = module.get<EntityEmployeeService>(EntityEmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
