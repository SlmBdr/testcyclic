import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
import { Model } from 'mongoose';
import { IFilterParams } from 'src/interfaces/filter.type';
import { entityDocument } from 'src/interfaces/mongoose.gen';
import { entity } from 'src/models/entity.schema';
import filterUtilities from 'src/utilities/filter';

@Injectable()
export class EntityService {
  constructor(
    @InjectModel(entity.name)
    private entityModel: Model<entityDocument>,
  ) {}

  async createEntity(entity: entityDocument) {
    const newEntity = new this.entityModel(entity);
    newEntity.created_at;
    if (!newEntity) {
      return null;
    } else {
      return newEntity.save();
    }
  }

  async findAllEntity(filter: IFilterParams) {
    return await this.entityModel.find(await filterUtilities(filter));
  }

  async findOne(id: string) {
    const data = await this.entityModel.findOne({
      id,
    });

    if (data == null) {
      return { data: null, error };
    }
    return { data, error: null };
  }

  async update(id: string, entity: entityDocument) {
    return await this.entityModel.updateOne(
      {
        id,
      },
      { $set: { entity } },
    );
  }
}
