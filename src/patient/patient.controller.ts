import { Controller, Post } from '@nestjs/common';
import { Body, Get, Put, Res } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { Payload } from '@nestjs/microservices';
import { error } from 'console';
import { PatientService } from './patient.service';
import { patientDocument } from 'src/interfaces/mongoose.gen';
import { IFilterParams } from 'src/interfaces/filter.type';

@Controller('/pat')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('input')
  async create(@Res() res, @Body() patient: patientDocument) {
    const newPatient = await this.patientService.createPatient(patient);
    console.log(newPatient);

    if (newPatient) {
      return res.status(HttpStatus.CREATED).json({ newPatient });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        error,
      });
    }
  }

  @Post('find')
  async findAll(@Res() res, @Payload() filter: IFilterParams) {
    const data = await this.patientService.findAll(filter);
    if (data === null || '') {
      return res.status(HttpStatus.BAD_REQUEST), error;
    } else {
      return res.status(HttpStatus.OK).json({
        data,
      });
    }
  }

  @Get('search/:id')
  async findOne(@Payload() id: string) {
    return this.patientService.findOne(id);
  }

  @Put('update/:id')
  async update(@Payload() patient: patientDocument) {
    return this.patientService.update(patient.id, patient);
  }
}
