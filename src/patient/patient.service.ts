import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { error } from 'console';
import { patientDocument } from 'src/interfaces/mongoose.gen';
import { patient } from 'src/models/patient.schema';
import { IFilterParams } from 'src/interfaces/filter.type';
import filterUtilities from 'src/utilities/filter';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(patient.name)
    private patientModel: Model<patientDocument>,
  ) {}

  async createPatient(patient: patientDocument) {
    const newPatient = new this.patientModel(patient);
    if (!newPatient) {
      return error;
    } else {
      return newPatient.save();
    }
  }
  async findAll(filter: IFilterParams) {
    return await this.patientModel.find(await filterUtilities(filter));
  }

  async findOne(id: string) {
    const searchPatient = await this.patientModel.findOne({ id });
    return searchPatient;
  }

  async update(id: string, patient: patientDocument) {
    return this.patientModel.updateOne({ id }, { $set: { patient } });
  }
}
