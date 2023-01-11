import mongoose, { Schema } from 'mongoose';
import { guarantorDocument, guarantorModel } from 'src/interfaces/mongoose.gen';
import { GUARANTOR_TYPE } from '../constants';

const guarantorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: GUARANTOR_TYPE,
  },
  contract: {
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
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

export const guarantorModels = mongoose.model<
  guarantorDocument,
  guarantorModel
>('guarantor', guarantorSchema);
export class guarantor {}
