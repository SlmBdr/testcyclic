import { Controller, Get, Post, Put } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { EmployeeService } from './employee.service';
import { employeeDocument } from 'src/interfaces/mongoose.gen';

@Controller('/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('inputEmployee')
  create(@Payload() employee: employeeDocument) {
    return this.employeeService.createEmployee(employee);
  }

  @Get()
  findAll() {
    return this.employeeService.findAllEmployee();
  }

  @Get()
  findOne(@Payload() name: string) {
    return this.employeeService.findOne(name);
  }

  @Put()
  update(@Payload() employee: employeeDocument) {
    return this.employeeService.update(employee.id, employee);
  }
}
