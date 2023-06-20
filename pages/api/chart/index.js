import dbConnect from '@/lib/dbConnect';
import Answer from '@/models/Answer';
import Chart from '@/models/Chart';

export default async function handler(req, res) {
  dbConnect();

  // POST DO CHART

  if (req.method === 'POST') {
    try {
      const { user, restaurant } = req.body;

      const chart = await Chart.create({
        user,
        restaurant,
        date: Date.now(),
      });

      const { answers } = req.body;

      answers.forEach(async (ans) => {
        const { question, value } = ans;

        const answer = await Answer.create({
          question,
          value,
          chart,
        });
      });

      res.status(201).json({ success: true, data: chart });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }

  // GET CHARTS

  if (req.method === 'GET') {
    try {
      // get query params
      const { user, user_type } = req.query;

      if (user_type === 'user') {
        const charts = await Chart.find({ user });
      } else {
        const charts = await Chart.find({ restaurant: user });
      }

      res.status(200).json({ success: true, data: charts });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
