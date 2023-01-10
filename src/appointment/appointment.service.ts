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
    if (!newAppointment) {
      return null;
    } else {
      return newAppointment.save();
    }
  }

  async findAllAppointment() {
    return await this.appointmentModel.find().populate({
      path: 'employee',
      strictPopulate: false,
      select: ['name'],
    });
  }

  async findOne(mrn: string) {
    const data = await this.appointmentModel
      .findOne({
        mrn,
      })
      .populate([
        {
          path: 'unit',
          select: [
            'name',
            'type',
            'location',
            'status',
            'capacity',
            'created_at',
            'created_by',
          ],
        },
        {
          path: 'doctor',
          select: ['name', 'position'],
        },
        {
          path: 'created_by',
          select: 'name',
        },
      ]);
    // .populate({
    //   path: 'doctor',
    //   select: 'name',
    // });
    return data;
  }

  async update(id: string, body: appointmentDocument) {
    return this.appointmentModel.updateOne({ id }, { $set: { ...body } });
  }
}
