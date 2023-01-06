import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { employee, employeeModels } from 'src/models/employee.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: employee.name, schema: employeeModels.schema },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
