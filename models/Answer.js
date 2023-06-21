import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  },
  value: {
    type: Number,
    required: true,
    maxlength: 6,
  },
  chart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chart',
  },
});

export default mongoose.models.Answer || mongoose.model('Answer', AnswerSchema);
