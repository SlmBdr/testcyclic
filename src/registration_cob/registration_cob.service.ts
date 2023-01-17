import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFilterParams } from 'src/interfaces/filter.type';
import { registrationCobDocument } from 'src/interfaces/mongoose.gen';
import { registrationCob } from 'src/models/registration_cob.schema';
import filterUtilities from 'src/utilities/filter';

@Injectable()
export class RegistrationCobService {
  constructor(
    @InjectModel(registrationCob.name)
    private registrationCobModel: Model<registrationCobDocument>,
  ) {}

  async createregistrationCob(registrationCob: registrationCobDocument) {
    const newregistrationCob = new this.registrationCobModel(registrationCob);
    if (!newregistrationCob) {
      return null;
    } else {
      return newregistrationCob.save();
    }
  }

  async findAll(filter: IFilterParams) {
    return await this.registrationCobModel.find(await filterUtilities(filter));
  }

  async findOne(id: string) {
    const data = await this.registrationCobModel.findOne({ id });
    return data;
  }

  async update(id: string, body: registrationCobDocument) {
    return this.registrationCobModel.updateOne({ id }, { ...body });
  }
}
