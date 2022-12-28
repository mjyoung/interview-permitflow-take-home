import { Prisma, WorkArea, WorkType } from '@prisma/client';

import { prisma } from '../seed';

const NAME = 'PermitRequirements';

export const INTERIOR_RESIDENTIAL_WORK_ITEMS: Prisma.WorkItemCreateInput[] = [
  {
    slug: 'ri_new-bathroom',
    displayText: 'New bathroom',
    workType: WorkType.RESIDENTIAL,
    workArea: WorkArea.INTERIOR,
  },
  {
    slug: 'ri_new-laundry-room',
    displayText: 'New laundry room',
    workType: WorkType.RESIDENTIAL,
    workArea: WorkArea.INTERIOR,
  },
  {
    slug: 'ri_bathroom-remodel',
    displayText: 'Bathroom remodel',
    workType: WorkType.RESIDENTIAL,
    workArea: WorkArea.INTERIOR,
  },
  {
    slug: 'ri_other',
    displayText: 'Other',
    workType: WorkType.RESIDENTIAL,
    workArea: WorkArea.INTERIOR,
  },
];

export const EXTERIOR_RESIDENTIAL_WORK_ITEMS: Prisma.WorkItemCreateInput[] = [
  {
    slug: 're_garage-door-replacement',
    displayText: 'Garage door replacement',
    workType: WorkType.RESIDENTIAL,
    workArea: WorkArea.EXTERIOR,
  },
  {
    slug: 're_exterior-doors',
    displayText: 'Work on exterior doors',
    workType: WorkType.RESIDENTIAL,
    workArea: WorkArea.EXTERIOR,
  },
  {
    slug: 're_roofing',
    displayText: 'Re-roofing',
    workType: WorkType.RESIDENTIAL,
    workArea: WorkArea.EXTERIOR,
  },
  {
    slug: 're_fences_less_than_6_feet',
    displayText: 'Building fences less than 6 feet',
    workType: WorkType.RESIDENTIAL,
    workArea: WorkArea.EXTERIOR,
  },
  {
    slug: 're_other',
    displayText: 'Other',
    workType: WorkType.RESIDENTIAL,
    workArea: WorkArea.EXTERIOR,
  },
];

const main = async () => {
  console.info(`Seeding ${NAME}`);
  const promises = [
    ...INTERIOR_RESIDENTIAL_WORK_ITEMS,
    ...EXTERIOR_RESIDENTIAL_WORK_ITEMS,
  ].map((item) => {
    return prisma.workItem.upsert({
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
