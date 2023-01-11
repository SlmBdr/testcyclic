import { Schema } from 'mongoose';

const entity_medical = new Schema({
  _id: {
    type: false,
  },
  is_main_branch: {
    type: Boolean,
    required: true,
  },
});

export default entity_medical;
