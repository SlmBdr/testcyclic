import { Schema } from 'mongoose';

const location = new Schema({
  _id: {
    type: false,
  },
  floor: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
});
export default location;
