import dbConnect from '@/lib/dbConnect';
import Answer from '@/models/Answer';
import Chart from '@/models/Chart';
import isAuth from '@/modules/auth/lib/isAuth';

export default async function handler(req, res) {
  await dbConnect();

  // POST DO CHART

  if (req.method === 'POST') {
    const token = req.cookies['firmi-cookie'];

    try {
      const { decoded } = await isAuth(token);
      const user = decoded?._id || null;
      
      const { restaurant } = req.body;

      const chart = await Chart.create({
        user,
        restaurant,
        date: Date.now(),
      });

      const { answers } = req.body;

      const answersArray = [];
      for (let i = 0; i < answers.length; i++) {
        const answer = await Answer.create({
          chart: chart._id,
          question: answers[i].question,
          value: answers[i].value,
        });
        answersArray.push(answer);
      }

      res.status(201).json({ success: true, data: {chart, answersArray}, messages: ["Chart created successfully"]});
    } catch (error) {
      res.status(400).json({ success: false, messages: ["Error creating chart"], data: error });
    }
  }

  // GET CHARTS

  if (req.method === 'GET') {
    try {
      // get query params
      const { user, user_type } = req.query;

      let charts = [];
      if (user_type === 'user') {
        charts = await Chart.find({ user });
      } else {
        charts = await Chart.find({ restaurant: user });
      }

      res.status(200).json({ success: true, data: charts });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
