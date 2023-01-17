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
    private regcobModel: Model<registrationCobDocument>,
  ) {}

  async createRegCob(registrationCob: registrationCobDocument) {
    const newRegCob = new this.regcobModel(registrationCob);
    if (!newRegCob) {
      return null;
    } else {
      return newRegCob.save();
    }
  }

  async findAll(filter: IFilterParams) {
    return await this.regcobModel.find(await filterUtilities(filter));
  }

  async findOne(id: string) {
    const data = await this.regcobModel.findOne({ id });

    return data;
  }

  async update(id: string, body: registrationCobDocument) {
    return this.regcobModel.updateOne({ id }, { ...body });
  }
}
