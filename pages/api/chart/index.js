import dbConnect from '@/lib/dbConnect';
import Answer from '@/models/Answer';
import Chart from '@/models/Chart';
import Question from '@/models/Question';
import Restaurant from '@/models/Restaurant';
import User from '@/models/User';
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
      for (const userAnswer of answers) {
        const answer = await Answer.create({
          chart: chart._id,
          question: userAnswer.questionId,
          value: userAnswer.value,
        });
        answersArray.push(answer);
      }

      return res.status(201).json({
        success: true,
        data: { chart, answersArray },
        messages: ['Chart created successfully'],
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        messages: ['Error creating chart'],
        data: error,
      });
    }
  }

  // GET CHARTS

  if (req.method === 'GET') {
    try {
      // get query params
      const { user, userType } = req.query;

      let charts = [];
      let answers = [];
      let questions = [];
      if (userType === 'CLIENT') {
        charts = await Chart.find({ user });
        // set restaurant id in chart for restaurant name
        for (const chart of charts) {
          const restaurant = await Restaurant.findById(chart.restaurant);
          chart.restaurant = restaurant;
        }
      } else {
        charts = await Chart.find({ restaurant: user });

        // set user id in chart for user name
        for (const chart of charts) {
          const user = await User.findById(chart.user);
          chart.user = user;
        }

        // get all answers for each chart
        answers = await Answer.find({ chart: { $in: charts.map((chart) => chart._id) } });

        // get all questions for each answer
        questions = await Question.find({ _id: { $in: answers.map((answer) => answer.question) } });

        
      }

      return res
        .status(200)
        .json({
          success: true,
          data: { charts, answers, questions },
          messages: ['Charts fetched successfully'],
        });
    } catch (error) {
      return res.status(400).json({ success: false, data: error });
    }
  }
}
