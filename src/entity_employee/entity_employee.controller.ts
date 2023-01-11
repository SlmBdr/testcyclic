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

  @Get()
  async findAll(@Res() res) {
    const entityEmployee =
      await this.entityEmployeeService.findEntityEmployee();
    return res.status(HttpStatus.ACCEPTED).json({ entityEmployee });
  }
  @Get('detail/:id')
  async findOne(@Res() res, @Param('id') id: string) {
    const detailEntityEmployee = await this.entityEmployeeService.findOne(id);
    if (!detailEntityEmployee) {
      return res.status(HttpStatus.BAD_REQUEST);
    }
    {
      return res.status(HttpStatus.OK).JSON({ detailEntityEmployee });
    }
  }

  @Patch()
  update(@Payload() entityEmployee: entityEmployeeDocument) {
    return this.entityEmployeeService.update(entityEmployee.id, entityEmployee);
  }
}
