import { Module } from '@nestjs/common';
import { EntityEmployeeService } from './entity_employee.service';
import { EntityEmployeeController } from './entity_employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  entityEmployee,
  entityEmployeeModels,
} from 'src/models/entity_employee.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: entityEmployee.name, schema: entityEmployeeModels.schema },
    ]),
  ],
  controllers: [EntityEmployeeController],
  providers: [EntityEmployeeService],
})
export class EntityEmployeeModule {}
