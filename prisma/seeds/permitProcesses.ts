import { Prisma } from '@prisma/client';

import { prisma } from '../seed';

const NAME = 'PermitProcesses';

const ITEMS: Prisma.PermitProcessCreateInput[] = [
  {
    slug: 'none',
    displayText: 'No Permit',
    requiresPlans: false,
  },
  {
    slug: 'in-house-review',
    displayText: 'In House Review Process',
    requiresPlans: true,
  },
  {
    slug: 'over-the-counter-with-plans',
    displayText: 'Over-the-Counter Submission Process (With Plans)',
    requiresPlans: true,
  },
  {
    slug: 'over-the-counter-no-plans',
    displayText: 'Over-the-Counter Submission Process (No Plans Required)',
    requiresPlans: false,
  },
];

const main = async () => {
  console.info(`Seeding ${NAME}`);
  const promises = ITEMS.map((item) => {
    return prisma.permitProcess.upsert({
      create: item,
      update: item,
      where: {
        slug: item.slug,
      },
    });
  });
  await Promise.all(promises);
  console.info(`Done seeding ${NAME}`);
};

export default main;
