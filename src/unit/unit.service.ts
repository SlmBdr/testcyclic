import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
import { Model } from 'mongoose';
import { unitDocument } from 'src/interfaces/mongoose.gen';
import { unit } from 'src/models/unit.schema';

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

  findAll() {
    return `This action returns all unit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unit`;
  }

  update(id: string) {
    return `This action updates a #${id} unit`;
  }

  remove(id: number) {
    return `This action removes a #${id} unit`;
  }
}
