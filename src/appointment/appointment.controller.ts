import { Controller, Post, Param } from '@nestjs/common';
import { Body, Get, Patch, Put, Res } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { Payload } from '@nestjs/microservices';
import { error } from 'console';
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

  @Get()
  findAll() {
    return this.appointmentService.findAllAppointment();
  }

  @Get('getone/:mrn')
  findOne(@Param('mrn') mrn: string) {
    return this.appointmentService.findOne(mrn);
  }

  @Patch(':id')
  update(@Payload() appointment: appointmentDocument) {
    return this.appointmentService.update(appointment.id, appointment);
  }
}
