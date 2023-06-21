import dbConnect from '@/lib/dbConnect';
import Answer from '@/models/Answer';
import Chart from '@/models/Chart';
import Restaurant from '@/models/Restaurant';
import isAuth from '@/modules/auth/lib/isAuth';

export default async function handler(req, res) {
  await dbConnect();

  const token = req.cookies['firmi-cookie'];

  try {
    const { authenticated, decoded } = await isAuth(token);

    if (req.method === 'POST') {
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
    }

    if (req.method === 'GET') {
      if (!authenticated)
        return res.status(401).json({
          success: false,
          messages: ['You are not logged in'],
          data: null,
        });

      const { userType } = req.query;
      const user = decoded._id;

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
      }

      if (userType === 'RESTAURANT') {
        charts = await Chart.aggregate([
          {
            $lookup: {
              from: 'users',
              localField: 'user',
              foreignField: '_id',
              as: 'user',
            },
          },
          {
            $lookup: {
              from: 'restaurants',
              localField: 'restaurant',
              foreignField: '_id',
              as: 'restaurant',
            },
          },
          {
            $unwind: {
              path: '$user',
              preserveNullAndEmptyArrays: false,
            },
          },
          {
            $unwind: {
              path: '$restaurant',
              preserveNullAndEmptyArrays: false,
            },
          },
          {
            $unset: ['user.password', 'restaurant.password'],
          },
          {
            $lookup: {
              from: 'answers',
              localField: '_id',
              foreignField: 'chart',
              as: 'answers',
            },
          },
        ]);
      }

      console.log(charts);

      return res.status(200).json({
        success: true,
        data: { charts },
        messages: ['Charts fetched successfully'],
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      messages: ['Unexpected error'],
      data: error,
    });
  }
}
