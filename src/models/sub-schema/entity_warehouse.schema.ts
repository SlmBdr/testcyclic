import { Schema } from 'mongoose';
import { STORAGE_TYPE } from '../../constants';

const entity_warehouse = new Schema({
  storage_type: {
    type: String,
    required: true,
    enum: STORAGE_TYPE,
  },
});

export default entity_warehouse;
