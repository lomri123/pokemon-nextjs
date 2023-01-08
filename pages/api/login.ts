import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const cookies = new Cookies(req, res);
  cookies.set('token', 'true');
  res.status(200).json({ message: 'login successful' });
}
