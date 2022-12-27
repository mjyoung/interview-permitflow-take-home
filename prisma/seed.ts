import { PrismaClient } from '@prisma/client';

import seedLocationMunicipalities from './seeds/locationMunicipalities';
import seedLocationStates from './seeds/locationStates';
import seedPermitRequirements from './seeds/permitRequirements';
import seedWorkItems from './seeds/workItems';

export const prisma = new PrismaClient();

export const main = async () => {
  console.info('Seeding DB...');

  const seeds = [
    seedLocationStates,
    seedLocationMunicipalities,
    seedPermitRequirements,
    seedWorkItems,
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
