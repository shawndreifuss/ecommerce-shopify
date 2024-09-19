// src/pages/api/orders/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const orders = await prisma.order.findMany({
        include: { user: true }, // Include related user/customer information
        orderBy: { createdAt: 'desc' }, // Sort by createdAt in descending order
      });

      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
