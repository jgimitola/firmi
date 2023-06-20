import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  question: {
    type: String,
    required: true,
    trim: true,
    maxlength: 250,
  },
  isBoolean: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.models.Question ||
  mongoose.model('Question', QuestionSchema);
