import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
import { Model } from 'mongoose';
import { IFilterParams } from 'src/interfaces/filter.type';
import { registrationDocument } from 'src/interfaces/mongoose.gen';
import { registration } from 'src/models/registration.schema';
import filterUtilities from 'src/utilities/filter';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectModel(registration.name)
    private registrationModel: Model<registrationDocument>,
  ) {}

  async createRegistration(registration: registrationDocument) {
    const newRegistration = new this.registrationModel(registration);
    if (registration) {
      return newRegistration.save();
    } else {
      return error;
    }
  }

  async findAll(filter: IFilterParams) {
    return await this.registrationModel.find(await filterUtilities(filter));
  }

  async findOne(id: string) {
    const search = await this.registrationModel.findOne({ id });
    return search;
  }

  async update(id: string, body: registrationDocument) {
    return this.registrationModel.updateOne({ id }, { $set: { ...body } });
  }
}
