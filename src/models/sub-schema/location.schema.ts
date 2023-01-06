import { Schema } from 'mongoose';

const location = new Schema({
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
