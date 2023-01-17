import { Controller, Post, Param } from '@nestjs/common';
import { Body, Get, Patch, Res } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { Payload } from '@nestjs/microservices';
import { error } from 'console';
import { IFilterParams } from 'src/interfaces/filter.type';
import { appointmentDocument } from 'src/interfaces/mongoose.gen';
import { AppointmentService } from './appointment.service';

@Controller('/appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async create(@Res() res, @Body() appointment: appointmentDocument) {
    const newAppointment = await this.appointmentService.createAppointment(
      appointment,
    );
    if (newAppointment) {
      return res.status(HttpStatus.CREATED).json({ newAppointment });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        error,
      });
    }
  }

  @Post('find')
  async findAll(@Res() res, @Payload() filter: IFilterParams) {
    const data = await this.appointmentService.findAllAppointment(filter);
    if (data === null || '') {
      return res.status(HttpStatus.BAD_REQUEST), error;
    } else {
      return res.status(HttpStatus.OK).json({
        data,
      });
    }
  }

  @Get('search/:mrn')
  async findOne(@Res() res, @Param('mrn') mrn: string) {
    const AppointmentDetail = await this.appointmentService.findOne(mrn);
    if (AppointmentDetail === null || '') {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'not found',
      });
    }
    {
      return res.status(HttpStatus.OK).json({
        AppointmentDetail,
      });
    }
  }

  @Patch('update/:id')
  async update(@Res() res, @Payload() appointment: appointmentDocument) {
    const AppointmentUpdate = await this.appointmentService.update(
      appointment.id,
      appointment,
    );
    if (!AppointmentUpdate) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'update failed',
      });
    }
    {
      return res.status(HttpStatus.CREATED).json({
        AppointmentUpdate,
      });
    }
  }
}
