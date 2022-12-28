import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: 'id required' });

    const jobRequest = await prisma.jobRequest.findUnique({
      where: { id: id as string },
      include: {
        permitRules: {
          include: {
            locationMunicipality: true,
            workItem: true,
            permitProcess: true,
          },
        },
      },
    });
    return res.status(200).json({ data: jobRequest });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
