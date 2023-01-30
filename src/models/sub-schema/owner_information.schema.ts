import { Schema } from 'mongoose';

const owner_information = new Schema({
  owner_name: {
    type: String,
  },
  acount_id: {
    type: String,
  },
  account_type: {
    type: String,
  },
});
export default owner_information;
