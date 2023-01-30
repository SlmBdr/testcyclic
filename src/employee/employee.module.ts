import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { employee, employeeModels } from 'src/models/employee.schema';
import { firebaseService } from 'src/firebase/firebase.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: employee.name, schema: employeeModels.schema },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, firebaseService],
})
export class EmployeeModule {}
