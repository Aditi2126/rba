

import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../lib/prisma';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const items = await prisma.menuItem.findMany();
    res.status(200).json(items);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

