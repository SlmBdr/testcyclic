import { Schema } from 'mongoose';

const person_name = new Schema({
  prefix: {
    type: String,
  },
  first: {
    type: String,
    required: true,
  },
  middle: {
    type: String,
  },
  last: {
    type: String,
    required: true,
  },
  suffix: {
    type: String,
  },
});

export default person_name;
