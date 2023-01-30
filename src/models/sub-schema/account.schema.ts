import { Schema } from 'mongoose';

const account = new Schema({
  has_account: {
    type: Boolean,
    required: true,
  },
  account_id: {
    type: String,
  },
  account_email: {
    type: String,
    required: true,
  },
  account_password: {
    type: String,
    required: true,
  },
  account_role: {
    type: String,
  },
  registered_at: {
    type: Date,
  },
  registered_by: {
    type: Schema.Types.ObjectId,
    ref: 'employee',
  },
  _id: {
    type: false,
  },
});

export default account;
