// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import moduleName from '../../utils/moongose'

dbConnect();

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
}
