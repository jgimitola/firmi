import dbConnect from '@/lib/dbConnect';
import Restaurant from '@/models/Restaurant';
import User from '@/models/User';

export default async function handler(req, res) {
  await dbConnect();

  const method = req.method;

  if (method === 'POST') {
    try {
      const accountType = req.body.accountType;

      if (accountType === 'CLIENT') {
        const { name, email, password, age, gender } = req.body;

        await User.create({
          name,
          email,
          password,
          age,
          gender,
        });

        return res
          .status(201)
          .json({ success: true, messages: ['User created'], data: null });
      }

      if (accountType === 'RESTAURANT') {
        const { name, address, phone, email, password } = req.body;

        await Restaurant.create({
          name,
          address,
          phone,
          email,
          password,
        });

        return res.status(201).json({
          success: true,
          messages: ['Restaurant created'],
          data: null,
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, messages: ['Unexpected error'], data: null });
    }
  }

  return res.status(400).json({
    success: true,
    messages: ['Unsupported HTTP method'],
    data: null,
  });
}
