import { Prisma } from '@prisma/client';
import { isEmpty } from 'lodash-es';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { workItems, municipality } = req.body;
    if (isEmpty(workItems) || !municipality) {
      return res
        .status(400)
        .json({ message: 'workItems and municipality required' });
    }

    const permitRulesConnect: Prisma.PermitRuleWhereUniqueInput[] =
      workItems.map((item: string) => {
        return {
          locationMunicipalitySlug_workItemSlug: {
            locationMunicipalitySlug: municipality,
            workItemSlug: item,
          },
        } as Prisma.PermitRuleWhereUniqueInput;
      });

    const jobRequest = await prisma.jobRequest.create({
      data: {
        permitRules: { connect: permitRulesConnect },
      },
    });
    return res.status(200).json({ data: jobRequest });
  } else if (req.method === 'GET') {
    const jobRequests = await prisma.jobRequest.findMany({
      include: {
        permitRules: {
          include: {
            locationMunicipality: true,
            workItem: true,
            permitProcess: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json({ data: jobRequests });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
