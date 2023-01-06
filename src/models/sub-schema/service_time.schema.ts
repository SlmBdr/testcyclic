import { Schema } from 'mongoose';

const service_time = new Schema({
  arrived_at: {
    type: Date,
  },
  confirmed_at: {
    type: Date,
  },
  served_at: {
    type: Date,
  },
  finished_at: {
    type: Date,
  },
});

export default service_time;
