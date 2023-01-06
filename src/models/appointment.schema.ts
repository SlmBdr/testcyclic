import mongoose, { Schema } from 'mongoose';
import {
  appointmentDocument,
  appointmentModel,
} from 'src/interfaces/mongoose.gen';

import {
  APPOINTMENT_METHOD,
  APPOINTMENT_STATUS,
  VISIT_TYPE,
} from '../constants';

const appointmentSchema = new Schema({
  appointment_no: {
    type: String,
    required: true,
  },
  mrn: {
    type: String,
    required: true,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'employee',
  },
  unit: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'unit',
  },
  time: {
    type: String,
    required: true,
  },
  que_no: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  method: {
    type: String,
    required: true,
    enum: APPOINTMENT_METHOD,
  },
  visit_type: {
    type: String,
    required: true,
    enum: VISIT_TYPE,
  },
  guarantor: {
    type: String,
  },
  guarantor_no: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: APPOINTMENT_STATUS,
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
  canceled_at: {
    type: Date,
  },
  canceled_by: {
    type: Schema.Types.ObjectId,
    ref: 'employee',
  },
});

export const appointmentModels = mongoose.model<
  appointmentDocument,
  appointmentModel
>('appointment', appointmentSchema);

export class appointment {}
