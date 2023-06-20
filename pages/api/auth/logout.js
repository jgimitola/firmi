import setCookie from '../../../modules/auth/lib/setCookie';

async function handler(req, res) {
  const method = req.method;

  if (method === 'DELETE') {
    try {
      setCookie(res, 'firmi-cookie', '', {
        httpOnly: true,
        path: '/',
        maxAge: 0,
      });

      return res
        .status(200)
        .json({ success: true, messages: ['Successfull logout'], data: null });
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

export default handler;
