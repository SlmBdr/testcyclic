import mongoose, { Schema } from 'mongoose';
import { ORGANIZATION_STATUS } from '../constants';
import {
  organizationDocument,
  organizationModel,
} from 'src/interfaces/mongoose.gen';
import address from './sub-schema/address.schema';
import contact from './sub-schema/contact.schema';

const organizationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  logo: {
    type: String,
  },
  subscription_plan: {
    type: String,
    required: true,
  },
  contact_person: {
    type: contact,
    required: true,
  },
  address: {
    type: address,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ORGANIZATION_STATUS,
  },
  registered_at: {
    type: Date,
    required: true,
  },
});

export const organization = mongoose.model<
  organizationDocument,
  organizationModel
>('organization', organizationSchema);
