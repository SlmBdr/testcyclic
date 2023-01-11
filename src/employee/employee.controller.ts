import { Controller, Get, Param, Post } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { EmployeeService } from './employee.service';
import { employeeDocument } from 'src/interfaces/mongoose.gen';
import { Patch, Res } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('inputEmployee')
  async create(@Res() res, @Payload() employee: employeeDocument) {
    const newEmployee = await this.employeeService.createEmployee(employee);
    if (!newEmployee) {
      return res.status(HttpStatus.BAD_REQUEST);
    }
    {
      return res.status(HttpStatus.CREATED).json({ newEmployee });
    }
  }

  @Get()
  async findAll(@Res() res) {
    const allEmployee = await this.employeeService.findAllEmployee();
    return res.status(HttpStatus.ACCEPTED).json({ allEmployee });
  }

  @Get(':position')
  async findOne(@Res() res, @Param('position') position: string) {
    const detailEmployee = await this.employeeService.findOne(position);
    if (!detailEmployee) {
      return res.status(HttpStatus.BAD_REQUEST);
    }
    {
      return res.status(HttpStatus.OK).JSON({ detailEmployee });
    }
  }

  @Patch()
  update(@Payload() employee: employeeDocument) {
    return this.employeeService.update(employee.id, employee);
  }
}
