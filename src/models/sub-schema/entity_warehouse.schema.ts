import { Schema } from 'mongoose';
import { STORAGE_TYPE } from '../../constants';

const entity_warehouse = new Schema({
  _id: {
    type: false,
  },
  storage_type: {
    type: String,
    required: true,
    enum: STORAGE_TYPE,
  },
});

export default entity_warehouse;
