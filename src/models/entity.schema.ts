import mongoose, { Schema } from 'mongoose';
import { ENTITIY_STATUS, ENTITY_TYPE } from '../constants';
import { entityDocument, entityModel } from 'src/interfaces/mongoose.gen';
import address from './sub-schema/address.schema';
import entity_warehouse from './sub-schema/entity_warehouse.schema';
import entity_medical from './sub-schema/entity_medical.schema';

const entitySchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'organization',
  },
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  type: {
    type: String,
    required: true,
    enum: ENTITY_TYPE,
  },
  status: {
    type: String,
    required: true,
    enum: ENTITIY_STATUS,
  },
  is_address_same_as_org: {
    type: Boolean,
    required: true,
  },
  address: {
    type: address,
    required: true,
  },
  warehouse: {
    type: entity_warehouse,
  },
  medical: {
    type: entity_medical,
  },
  created_at: {
    type: String,
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

export const entityModels = mongoose.model<entityDocument, entityModel>(
  'entity',
  entitySchema,
);
export class entity {}
