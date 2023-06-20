import conectarDB from '@/lib/dbConnect';
import Restaurant from '@/models/Restaurant';
import User from '@/models/User';

export default async function handler(req, res) {
  await conectarDB();

  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'Please provide email and password',
          });
      }

      // Buscar el usuario
      const users = await User.find({ email, password });

      if (users.length === 0) {
        const restaurant = await Restaurant.find({ email, password });

        if (restaurant.length === 0) {
          return res
            .status(400)
            .json({ success: false, message: 'Invalid credentials' });
        }

        return res.status(200).json({ success: true, data: restaurant[0] });
      }

      res.status(200).json({ success: true, data: users[0] });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
