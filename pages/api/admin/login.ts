import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const adminCredentials = {
  email: 'admin@cafe.com',
  password: 'adminpassword'
};

const secretKey = 'supersecretkey';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  if (email === adminCredentials.email && password === adminCredentials.password) {
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
}
