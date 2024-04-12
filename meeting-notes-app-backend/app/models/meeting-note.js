import mongoose from 'mongoose';

// Schema for Meeting Notes
const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  actionItems: {
    type: [String],
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const model = mongoose.model('meetingnote', Schema);

export default model;
