import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFilterParams } from 'src/interfaces/filter.type';
import { guarantorDocument } from 'src/interfaces/mongoose.gen';
import { guarantor } from 'src/models/guarantor.schema';
import filterUtilities from 'src/utilities/filter';

@Injectable()
export class GuarantorService {
  constructor(
    @InjectModel(guarantor.name)
    private guarantorModel: Model<guarantorDocument>,
  ) {}

  async createGuarantor(guarantor: guarantorDocument) {
    const newGuarantor = new this.guarantorModel(guarantor);
    if (!newGuarantor) {
      return null;
    } else {
      return newGuarantor.save();
    }
  }

  async findAllGuarantor(filter: IFilterParams) {
    return await this.guarantorModel.find(await filterUtilities(filter));
  }

  async findOne(id: string) {
    const data = await this.guarantorModel.findOne({ id });
    return data;
  }

  async update(id: string, body: guarantorDocument) {
    return this.guarantorModel.updateOne({ id }, { $set: { ...body } });
  }
}
