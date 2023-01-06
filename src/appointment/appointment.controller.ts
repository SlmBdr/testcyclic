import { Controller, Post } from '@nestjs/common';
import { Get, Put } from '@nestjs/common/decorators';
import { Payload } from '@nestjs/microservices';
import { appointmentDocument } from 'src/interfaces/mongoose.gen';

import { AppointmentService } from './appointment.service';

@Controller('/appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Payload() appointment: appointmentDocument) {
    return this.appointmentService.createAppointment(appointment);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAllAppointment();
  }

  @Get('getone')
  findOne(@Payload() appointment_no: string) {
    return this.appointmentService.findOne(appointment_no);
  }

  @Put()
  update(@Payload() appointment: appointmentDocument) {
    return this.appointmentService.update(appointment.id, appointment);
  }
}
