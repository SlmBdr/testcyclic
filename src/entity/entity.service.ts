import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
import { Model } from 'mongoose';
import { entityDocument } from 'src/interfaces/mongoose.gen';
import { entity } from 'src/models/entity.schema';

@Injectable()
export class EntityService {
  constructor(
    @InjectModel(entity.name)
    private entityModel: Model<entityDocument>,
  ) {}

  async createEntity(entity: entityDocument) {
    const newEntity = new this.entityModel(entity);
    if (!newEntity) {
      return null;
    } else {
      return newEntity.save();
    }
  }

  async findAllEntity() {
    return await this.entityModel.find();
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

  update(id: string, entity: entityDocument) {
    return this.entityModel.updateOne(
      {
        id,
      },
      { $set: { entity } },
    );
  }
}
