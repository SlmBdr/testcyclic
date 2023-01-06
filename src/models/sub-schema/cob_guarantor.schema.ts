import { Schema } from 'mongoose';
import { COB_METHOD } from '../../constants';

const cob_guarantor = new Schema({
  guarantor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'guarantor',
  },
  guarantor_no: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
    enum: COB_METHOD,
  },
  plafond_amount: {
    type: String,
  },
});

export default cob_guarantor;
