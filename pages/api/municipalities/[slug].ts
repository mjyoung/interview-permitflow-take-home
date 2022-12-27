// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { slug } = req.query;
    if (!slug) return res.status(400).json({ message: 'slug required' });

    const municipality = await prisma.locationMunicipality.findUnique({
      where: { slug: slug as string },
    });
    return res.status(200).json({ data: municipality });
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
