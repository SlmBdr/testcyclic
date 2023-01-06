import mongoose, { Schema } from 'mongoose';
import {
  registrationCobDocument,
  registrationCobModel,
} from 'src/interfaces/mongoose.gen';
import cob_guarantor from './sub-schema/cob_guarantor.schema';

const registrationCobSchema = new Schema({
  guarantors: [
    {
      type: cob_guarantor,
      required: true,
    },
  ],
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

export const registrationCob = mongoose.model<
  registrationCobDocument,
  registrationCobModel
>('registrationCob', registrationCobSchema);
