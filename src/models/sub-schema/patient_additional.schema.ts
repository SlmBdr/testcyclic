import { Schema } from 'mongoose';
import { RELATION } from '../../constants';

const patient_additional = new Schema({
  dob: {
    type: Date,
  },
  pob: {
    type: String,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    subdistrict: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
    },
    zipcode: {
      type: String,
    },
  },
  temporary_address: {
    street: {
      type: String,
      required: true,
    },
    subdistrict: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
    },
    zipcode: {
      type: String,
    },
  },
  contact: {
    name: {
      type: String,
    },
    ssn: {
      type: String,
    },
    relation: {
      type: String,
      enum: RELATION,
    },
    email: {
      type: String,
      required: true,
    },
    phone_number: [
      {
        type: String,
      },
    ],
  },
  emergency_contact: {
    name: {
      type: String,
    },
    ssn: {
      type: String,
    },
    relation: {
      type: String,
      enum: RELATION,
    },
    email: {
      type: String,
      required: true,
    },
    phone_number: [{ type: String }],
  },
  status: {
    is_blacklisted: {
      type: Boolean,
      required: true,
    },
    is_alive: {
      type: Boolean,
      required: true,
    },
    deceased_at: {
      type: Date,
    },
  },
  notes: {
    type: String,
  },
  guarantor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'guarantor',
  },
  guarantor_no: {
    type: String,
  },
});

export default patient_additional;
