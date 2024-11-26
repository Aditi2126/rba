// pages/api/admin/delete-barista.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.query; // Ensure the ID is passed as a query parameter

    try {
      const deletedBarista = await prisma.barista.delete({
        where: { id: Number(id) }, // Convert ID to a number if it's stored as an integer in your DB
      });

      return res.status(200).json(deletedBarista); // Success response
    } catch (error) {
      console.error("Error deleting barista:", error);
      return res.status(500).json({ error: 'Failed to delete barista' }); // Error response
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
