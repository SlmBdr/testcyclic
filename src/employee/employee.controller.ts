import { Controller, Get, Param, Post } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { EmployeeService } from './employee.service';
import { employeeDocument } from 'src/interfaces/mongoose.gen';
import { Patch, Res } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { IFilterParams } from 'src/interfaces/filter.type';

@Controller('/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Res() res, @Payload() employee: employeeDocument) {
    const newEmployee = await this.employeeService.createEmployee(employee);
    if (!newEmployee) {
      return res.status(HttpStatus.BAD_REQUEST);
    }
    {
      return res.status(HttpStatus.CREATED).json({ newEmployee });
    }
  }

  @Get('find')
  async findAll(@Res() res, @Payload() filter: IFilterParams) {
    const allEmployee = await this.employeeService.findAllEmployee(filter);
    return res.status(HttpStatus.ACCEPTED).json({ allEmployee });
  }

  @Post('search/:position')
  async findOne(@Res() res, @Param('position') position: string) {
    const detailEmployee = await this.employeeService.findOne(position);
    if (!detailEmployee) {
      return res.status(HttpStatus.BAD_REQUEST);
    }
    {
      return res.status(HttpStatus.OK).json({ detailEmployee });
    }
  }

  @Patch('update/:name')
  async update(@Res() res, @Payload() employee: employeeDocument) {
    const employeeUpdate = await this.employeeService.update(
      employee.id,
      employee,
    );
    if (employeeUpdate) {
      return res.status(HttpStatus.BAD_REQUEST);
    } else {
      return res.status(HttpStatus.OK).json({ employeeUpdate });
    }
  }
}
