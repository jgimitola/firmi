import dbConnect from '@/lib/dbConnect';
import Question from '@/models/Question';

export default async function handler(req, res) {
  await dbConnect();

  // Get /api/question

  if (req.method === 'GET') {
    const { questionType } = req.query;

    try {
      if (questionType) {
        const questions = await Question.find({
          isBoolean: questionType === 'BOOL',
        });

        return res.status(200).json({
          success: true,
          data: questions,
          messages: ['Get question successfully'],
        });
      } else {
        const questions = await Question.find({});
        return res.status(200).json({
          success: true,
          data: questions,
          messages: ['Get question successfully'],
        });
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        data: error,
        messages: ['Get question failed'],
      });
    }
  }

  // POST /api/question/

  if (req.method === 'POST') {
    const { question, isBoolean, key } = req.body;

    try {
      const newQuestion = await Question.create({ question, isBoolean, key });
      return res.status(200).json({
        success: true,
        data: newQuestion,
        messages: ['Create question successfully'],
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        data: error,
        messages: ['Create question failed'],
      });
    }
  }
}
