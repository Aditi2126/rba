// // pages/api/barista/login.ts

// import { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken';

// const baristaCredentials = {
//   email: 'barista@cafe.com',
//   password: 'barista123',
// };

// const secretKey = 'your_secret_key'; // Replace with your actual secret key

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { email, password } = req.body;

//     if (email === baristaCredentials.email && password === baristaCredentials.password) {
//       const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
//       return res.status(200).json({ token });
//     } else {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }



// pages/api/barista/login.ts

// pages/api/barista/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Make sure the path to prisma is correct
import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  const barista = await prisma.barista.findUnique({ where: { email } });
  
  if (barista && barista.password === password) { // Adjust your password handling if encrypted
    const token = jwt.sign({ id: barista.id, email: barista.email }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}
