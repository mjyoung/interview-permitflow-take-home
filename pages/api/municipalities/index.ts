import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const municipalities = await prisma.locationMunicipality.findMany();
    return res.status(200).json({ data: municipalities });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
