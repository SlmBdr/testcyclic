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
});

export default account;
