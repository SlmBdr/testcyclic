import mongoose, { Schema } from 'mongoose';
import { UNIT_STATUS, UNIT_TYPE } from '../constants';
import { unitDocument, unitModel } from '../interfaces/mongoose.gen';
import capacity from './sub-schema/capacity.schema';
import location from './sub-schema/location.schema';

const unitSchema = new Schema({
  entity: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'entity',
  },
  name: {
    full: {
      type: String,
      required: true,
    },
    short: {
      type: String,
      required: true,
    },
  },
  type: {
    type: String,
    required: true,
    enum: UNIT_TYPE,
  },
  belongs_to: {
    type: Schema.Types.ObjectId,
    ref: 'employee',
  },
  location: {
    type: location,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: UNIT_STATUS,
  },
  capacity: {
    type: capacity,
    required: true,
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

export const unit = mongoose.model<unitDocument, unitModel>('unit', unitSchema);
