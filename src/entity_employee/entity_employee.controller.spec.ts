import { Test, TestingModule } from '@nestjs/testing';
import { EntityEmployeeController } from './entity_employee.controller';
import { EntityEmployeeService } from './entity_employee.service';

describe('EntityEmployeeController', () => {
  let controller: EntityEmployeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntityEmployeeController],
      providers: [EntityEmployeeService],
    }).compile();

    controller = module.get<EntityEmployeeController>(EntityEmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
