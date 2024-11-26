import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newBarista = await prisma.barista.create({
        data: { name, email, password: hashedPassword },
      });
      res.status(200).json(newBarista);
    } catch (error: any) {
      console.error('Error creating barista:', error); // Log detailed error for Vercel

      if (error.code === 'P2002') {
        // Handle unique constraint violation error
        res.status(400).json({ error: 'Email already exists. Please use a different email.' });
      } else {
        // Handle all other database or server errors generically
        res.status(500).json({ error: 'Server error. Check logs for more details.' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
