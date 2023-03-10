import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { Payload } from '@nestjs/microservices';
import { error } from 'console';
import { IFilterParams } from 'src/interfaces/filter.type';
import { unitDocument } from 'src/interfaces/mongoose.gen';
import { UnitService } from './unit.service';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  async createUnit(@Res() res, @Body() unit: unitDocument) {
    const newUnit = await this.unitService.createUnit(unit);
    if (newUnit) {
      return res.status(HttpStatus.CREATED).json({ newUnit });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        error,
      });
    }
  }

  @Post('find')
  async findAll(@Res() res, @Payload() filter: IFilterParams) {
    const data = await this.unitService.findAllUnit(filter);
    if (data === null || '') {
      return res.status(HttpStatus.BAD_REQUEST), error;
    } else {
      return res.status(HttpStatus.OK).json({
        data,
      });
    }
  }

  @Get('search/:status')
  async findOne(@Param('status') status: string) {
    return this.unitService.findOne(status);
  }

  @Patch('update/:id')
  async update(@Res() res, @Payload() unit: unitDocument) {
    const unitUpdate = await this.unitService.update(unit.id, unit);
    if (!unitUpdate) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'update failed',
      });
    }
    return res.status(HttpStatus.OK).json({ unitUpdate });
  }
}
