import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
import { Model } from 'mongoose';
import { employeeDocument } from 'src/interfaces/mongoose.gen';
import { employee } from 'src/models/employee.schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(employee.name)
    private employeeeModel: Model<employeeDocument>,
  ) {}

  async createEmployee(employee: employeeDocument) {
    const newEmployee = new this.employeeeModel(employee);

    return newEmployee.save();
  }

  async findAllEmployee() {
    return await this.employeeeModel.find();
  }

  async findOne(name: string) {
    const data = await this.employeeeModel.findOne({
      name: name,
    });
    if (data == null) {
      return { data: null, error };
    }
    return { data, error: null };
  }

  update(name: string, employee: employeeDocument) {
    return this.employeeeModel.updateOne(
      {
        name,
      },
      { $set: { employee } },
    );
  }
}
