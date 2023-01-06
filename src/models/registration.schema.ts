import mongoose, { Schema } from 'mongoose';
import {
  registrationDocument,
  registrationModel,
} from 'src/interfaces/mongoose.gen';
import service_time from './sub-schema/service_time.schema';

const registrationSchema = new Schema({
  registration_no: {
    type: String,
    required: true,
  },
  appointment_no: {
    type: String,
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
  sep: {
    type: String,
  },
  guarantor: {
    type: String,
  },
  guarantor_no: {
    type: String,
  },
  note: {
    type: String,
  },
  referral_from: {
    type: String,
  },
  service_time: {
    type: service_time,
    required: true,
  },
  cob: {
    type: Schema.Types.ObjectId,
    ref: 'registrationCob',
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

export const registration = mongoose.model<
  registrationDocument,
  registrationModel
>('registration', registrationSchema);
