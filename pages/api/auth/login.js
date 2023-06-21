import { TOKEN_EXPIRATION_TIME } from '@/lib/constants';
import dbConnect from '@/lib/dbConnect';
import Restaurant from '@/models/Restaurant';
import User from '@/models/User';
import setCookie from '@/modules/auth/lib/setCookie';
import signJWT from '@/modules/auth/lib/signJWT';

export default async function handler(req, res) {
  await dbConnect();

  const method = req.method;

  if (method === 'POST') {
    const credentials = req.body;

    if (!credentials.email || !credentials.password) {
      return res.status(400).json({
        data: null,
        success: false,
        messages: ['Pease provide email and password'],
      });
    }

    try {
      const user = await User.findOne({
        email: credentials.email,
        password: credentials.password,
      });

      if (!user) {
        const restaurant = await Restaurant.findOne({
          email: credentials.email,
          password: credentials.password,
        });

        if (!restaurant) {
          return res.status(400).json({
            data: null,
            success: false,
            messages: ['Invalid credentials'],
          });
        }

        const token = await signJWT({
          _id: restaurant.id,
          accountType: 'RESTAURANT',
        });

        setCookie(res, 'firmi-cookie', token, {
          httpOnly: true,
          path: '/',
          maxAge: TOKEN_EXPIRATION_TIME,
        });

        return res.status(200).json({
          success: true,
          messages: ['Successfull login'],
          data: { accountType: 'RESTAURANT' },
        });
      }

      const token = await signJWT({ _id: user.id, accountType: 'CLIENT' });

      setCookie(res, 'firmi-cookie', token, {
        httpOnly: true,
        path: '/',
        maxAge: TOKEN_EXPIRATION_TIME,
      });

      return res.status(200).json({
        success: true,
        messages: ['Successfull login'],
        data: { accountType: 'CLIENT' },
      });
    } catch (error) {
      return res.status(500).json({
        data: null,
        success: false,
        messages: ['Unexpected error has occurred'],
      });
    }
  }

  return res.status(400).json({
    success: true,
    messages: ['Unsupported HTTP method'],
    data: null,
  });
}
