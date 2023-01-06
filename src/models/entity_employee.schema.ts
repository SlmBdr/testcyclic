import mongoose, { Schema } from 'mongoose';
import {
  entityEmployeeDocument,
  entityEmployeeModel,
} from 'src/interfaces/mongoose.gen';

const entityEmployeeSchema = new Schema({
  entity: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'entity',
  },
  employees: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'employee',
    },
  ],
});

export const entityEmployee = mongoose.model<
  entityEmployeeDocument,
  entityEmployeeModel
>('entityEmployee', entityEmployeeSchema);
