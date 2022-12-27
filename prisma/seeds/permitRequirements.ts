import { Prisma } from '@prisma/client';
import { prisma } from '../seed';

const NAME = 'PermitRequirements';

const ITEMS: Prisma.PermitRequirementCreateInput[] = [
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
    return prisma.permitRequirement.upsert({
      create: item,
      update: item,
      where: {},
    });
  });
  await Promise.all(promises);
  console.info(`Done seeding ${NAME}`);
};

export default main;
