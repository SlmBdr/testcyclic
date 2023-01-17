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
registrationCobSchema.pre('save', function (next) {
  const now = new Date();
  this.created_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

export const registrationCobModels = mongoose.model<
  registrationCobDocument,
  registrationCobModel
>('registrationCob', registrationCobSchema);
export class registrationCob {}
