import dbConnect from '@/lib/dbConnect';
import Restaurant from '@/models/Restaurant';

export default async function handler(req, res) {
  await dbConnect();

  // GET by ID restaurant
  if (req.method === 'GET') {
    const { id } = req.query;
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      res.status(200).json({
        success: true,
        data: restaurant,
        messages: ['Get restaurant by ID successfully'],
      });
    } else {
      res.status(400).json({
        success: false,
        messages: ['Get restaurant by ID failed'],
      });
    }
  }
}
