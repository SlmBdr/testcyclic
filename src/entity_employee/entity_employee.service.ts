import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
import { Model } from 'mongoose';
import { entityEmployeeDocument } from 'src/interfaces/mongoose.gen';
import { entityEmployee } from 'src/models/entity_employee.schema';

@Injectable()
export class EntityEmployeeService {
  constructor(
    @InjectModel(entityEmployee.name)
    private entityEmployeeModel: Model<entityEmployeeDocument>,
  ) {}

  async createEntityEmployee(entityEmployee: entityEmployeeDocument) {
    const newEntityEmployee = new this.entityEmployeeModel(entityEmployee);
    if (!newEntityEmployee) {
      return null;
    } else {
      return newEntityEmployee.save();
    }
  }

  async findEntityEmployee() {
    return await this.entityEmployeeModel.find();
  }

  async findOne(id: string) {
    const data = await this.entityEmployeeModel.findOne({
      id,
    });

    if (data == null) {
      return { data: null, error };
    }
    return { data, error: null };
  }

  async update(id: string, entityEmployee: entityEmployeeDocument) {
    return await this.entityEmployeeModel.updateOne(
      {
        id,
      },
      { $set: { entityEmployee } },
    );
  }
}
