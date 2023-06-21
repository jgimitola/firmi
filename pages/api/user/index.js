import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import isAuth from '@/modules/auth/lib/isAuth';

export default async function handler(req, res) {
  await dbConnect();

  const token = req.cookies['firmi-cookie'];

  try {
    const { decoded } = await isAuth(token);

    if (req.method === 'POST') {
      const user = await User.create(req.body);

      return res.status(201).json({ success: true, messages: [], data: user });
    }

    if (req.method === 'GET') {
      if (token) {
        const user = await User.findOne({ _id: decoded._id }, '-password');

        return res
          .status(200)
          .json({ success: true, messages: [], data: user });
      }

      const users = await User.find({});

      return res.status(200).json({ success: true, messages: [], data: users });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      messages: ['Unexpected error'],
      data: null,
    });
  }
}
