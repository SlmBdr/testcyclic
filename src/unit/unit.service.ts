import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
import { Model } from 'mongoose';
import { IFilterParams } from 'src/interfaces/filter.type';
import { unitDocument } from 'src/interfaces/mongoose.gen';
import { unit } from 'src/models/unit.schema';
import filterUtilities from 'src/utilities/filter';

@Injectable()
export class UnitService {
  constructor(
    @InjectModel(unit.name)
    private unitModel: Model<unitDocument>,
  ) {}

  async createUnit(unit: unitDocument) {
    const newUnit = new this.unitModel(unit);
    if (!newUnit) {
      return error;
    } else {
      return newUnit.save();
    }
  }

  async findAllUnit(filter: IFilterParams) {
    return this.unitModel.find(await filterUtilities(filter)).populate([
      {
        path: 'belongs_to',
      },
      {
        path: 'created_by',
      },
    ]);
  }

  async findOne(status: string) {
    const unitDetail = await this.unitModel.findOne({ status }).populate([
      {
        path: 'belongs_to',
      },
      {
        path: 'created_by',
      },
    ]);
    return unitDetail;
  }

  async update(id: string, body: unitDocument) {
    return this.unitModel.updateOne({ id }, { $set: { ...body } });
  }
}
