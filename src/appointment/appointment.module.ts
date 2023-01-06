import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { appointment, appointmentModels } from 'src/models/appointment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: appointment.name, schema: appointmentModels.schema },
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
