import { Prisma } from '@prisma/client';
import { prisma } from '../seed';

const NAME = 'LocationMunicipalities';

const ITEMS: Prisma.LocationMunicipalityCreateInput[] = [
  {
    slug: 'san-francisco-ca',
    displayText: 'San Francisco',
    locationState: {
      connect: {
        slug: 'CA',
      },
    },
  },
];

const main = async () => {
  console.info(`Seeding ${NAME}`);
  const promises = ITEMS.map((item) => {
    return prisma.locationMunicipality.upsert({
      create: item,
      update: item,
      where: {},
    });
  });
  await Promise.all(promises);
  console.info(`Done seeding ${NAME}`);
};

export default main;
