import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
import { Model } from 'mongoose';
import { appointmentDocument } from 'src/interfaces/mongoose.gen';
import { appointment } from 'src/models/appointment.schema';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(appointment.name)
    private appointmentModel: Model<appointmentDocument>,
  ) {}

  async createAppointment(appointment: appointmentDocument) {
    const newAppointment = new this.appointmentModel(appointment);
    console.log(newAppointment);

    return newAppointment.save();
  }

  async findAllAppointment() {
    return await this.appointmentModel.find();
    // .populate({
    //   path: 'employee',
    //   select: ['name'],
    // });
  }

  async findOne(appointment_no: string) {
    const data = await this.appointmentModel.findOne({
      appointment_no: appointment_no,
    });
    if (data == null) {
      return { data: null, error };
    }
    return { data, error: null };
  }

  async update(appointment_no: string, appointment: appointmentDocument) {
    return this.appointmentModel.updateOne(
      { appointment_no },
      { $set: { ...appointment } },
    );
  }
}
