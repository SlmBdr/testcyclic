import { Schema } from 'mongoose';

const address = new Schema({
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
});

export default address;
