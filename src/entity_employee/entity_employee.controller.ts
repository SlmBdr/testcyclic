import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { IFilterParams } from 'src/interfaces/filter.type';
import { entityEmployeeDocument } from 'src/interfaces/mongoose.gen';
import { EntityEmployeeService } from './entity_employee.service';

@Controller('/entity_employee')
export class EntityEmployeeController {
  constructor(private readonly entityEmployeeService: EntityEmployeeService) {}

  @Post()
  async create(@Res() res, @Payload() entityEmployee: entityEmployeeDocument) {
    const newEntityEmployee =
      await this.entityEmployeeService.createEntityEmployee(entityEmployee);
    if (!newEntityEmployee) {
      return res.status(HttpStatus.BAD_REQUEST);
    }
    {
      return res.status(HttpStatus.CREATED).json({ newEntityEmployee });
    }
  }

  @Post('find')
  async findAll(@Res() res, @Payload() filter: IFilterParams) {
    const entityEmployee = await this.entityEmployeeService.findEntityEmployee(
      filter,
    );
    return res.status(HttpStatus.ACCEPTED).json({ entityEmployee });
  }
  @Get('search/:id')
  async findOne(@Res() res, @Param('id') id: string) {
    const detailEntityEmployee = await this.entityEmployeeService.findOne(id);
    if (!detailEntityEmployee) {
      return res.status(HttpStatus.BAD_REQUEST);
    } else {
      return res.status(HttpStatus.OK).JSON({ detailEntityEmployee });
    }
  }

  @Patch('update/id')
  async update(@Res() res, @Payload() entityEmployee: entityEmployeeDocument) {
    const entityEmployeeUpdate = await this.entityEmployeeService.update(
      entityEmployee.id,
      entityEmployee,
    );
    if (!entityEmployeeUpdate) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'update failed',
      });
    }
    return res.status(HttpStatus.OK).json({ entityEmployeeUpdate });
  }
}
