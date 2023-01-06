import mongoose, { Schema } from 'mongoose';
import { EMPLOYEE_TYPE } from '../constants';
import { employeeDocument, employeeModel } from '../interfaces/mongoose.gen';
import account from './sub-schema/account.schema';
import person_name from './sub-schema/person_name.schema';

const employeeSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'organization',
  },
  name: {
    type: person_name,
    required: true,
  },
  position: {
    type: String,
  },
  account: {
    type: account,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: EMPLOYEE_TYPE,
  },
  created_at: {
    type: Date,
    required: true,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'employee',
  },
  updated_at: {
    type: Date,
  },
  updated_by: {
    type: Schema.Types.ObjectId,
    ref: 'employee',
  },
});

export const employeeModels = mongoose.model<employeeDocument, employeeModel>(
  'employee',
  employeeSchema,
);

export class employee {}
