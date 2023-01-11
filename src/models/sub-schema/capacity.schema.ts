import { Schema } from 'mongoose';

const capacity = new Schema({
  total: {
    type: Number,
    required: true,
  },
  filled: {
    type: Number,
    required: true,
  },
  _id: {
    type: false,
  },
});

export default capacity;
