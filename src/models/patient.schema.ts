import mongoose, { Schema } from 'mongoose';
import { MARITAL_STATUS, RELIGION } from '../constants';
import {
  patientDocument,
  patientModel,
} from '../../src/interfaces/mongoose.gen';
import person_name from './sub-schema/person_name.schema';
import patient_additional from './sub-schema/patient_additional.schema';

const patientSchema = new Schema({
  mrn: {
    type: String,
    required: true,
  },
  ssn: {
    type: String,
    required: true,
  },
  name: {
    type: person_name,
    required: true,
  },
  religion: {
    type: String,
    required: true,
    enum: RELIGION,
  },
  occupation: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  marital_status: {
    type: String,
    required: true,
    enum: MARITAL_STATUS,
  },
  additional_data: {
    type: patient_additional,
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

export const patientModels = mongoose.model<patientDocument, patientModel>(
  'patient',
  patientSchema,
);
export class patient {}
