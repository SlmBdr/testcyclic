import { Schema } from 'mongoose';
import { RELATION } from '../../constants';

const contact = new Schema({
  _id: {
    type: false,
  },
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
});
export default contact;
