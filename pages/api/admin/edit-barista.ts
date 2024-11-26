// pages/api/admin/edit-barista.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Make sure this path is correct

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { id } = req.query;
    const { name, email, password } = req.body;

    try {
      // Update barista in the database
      const updatedBarista = await prisma.barista.update({
        where: { id: Number(id) },
        data: {
          name,
          email,
          password,
        },
      });
      res.status(200).json(updatedBarista);
    } catch (error) {
      console.error('Error updating barista:', error);
      res.status(500).json({ error: 'Failed to update barista' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
