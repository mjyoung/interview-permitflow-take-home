// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { WorkArea, WorkType } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { sortWorkItemsAlphabetically } from '@/utils/helpers';
import { prisma } from '@/utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { municipality, workArea, workType } = req.query;
    if (!municipality || !workArea || !workType)
      return res.status(400).json({ message: 'Missing required query params' });
    const workItems = await prisma.workItem.findMany({
      where: {
        workArea: workArea as WorkArea,
        workType: workType as WorkType,
        locationMunicipalitySlug: municipality as string,
      },
    });
    return res
      .status(200)
      .json({ data: sortWorkItemsAlphabetically(workItems) });
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
