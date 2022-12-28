import { PrismaClient } from '@prisma/client';

import seedLocationMunicipalities from './seeds/locationMunicipalities';
import seedLocationStates from './seeds/locationStates';
import seedPermitProcesses from './seeds/permitProcesses';
import seedPermitRules from './seeds/permitRules';
import seedWorkItems from './seeds/workItems';

export const prisma = new PrismaClient();

export const main = async () => {
  console.info('Seeding DB...');

  const seeds = [
    seedLocationStates,
    seedLocationMunicipalities,
    seedPermitProcesses,
    seedWorkItems,
    seedPermitRules,
  ];

  for (const seed of seeds) {
    await seed();
  }

  console.info('Done seeding DB');
  return;
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('All done! Disconnecting from prisma.');
    await prisma.$disconnect();
  });
