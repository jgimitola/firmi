import dbConnect from '@/lib/dbConnect';
import Restaurant from '@/models/Restaurant';
import isAuth from '@/modules/auth/lib/isAuth';

export default async function handler(req, res) {
  await dbConnect();

  const token = req.cookies['firmi-cookie'];

  try {
    const { authenticated, decoded } = await isAuth(token);

    // GET by ID restaurant
    if (req.method === 'GET') {
      if (!authenticated)
        return res.status(401).json({
          success: false,
          messages: ['You are not logged in'],
          data: null,
        });

      const { id } = req.query;

      const restaurant = await Restaurant.findById(
        id || decoded._id,
        '-password'
      );

      if (restaurant) {
        return res.status(200).json({
          success: true,
          messages: ['Get restaurant by ID successfully'],
          data: restaurant,
        });
      }

      return res.status(400).json({
        success: false,
        messages: ['Get restaurant by ID failed'],
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      messages: ['Unexpected error'],
      data: null,
    });
  }
}
