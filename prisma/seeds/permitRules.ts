import { Prisma, WorkArea, WorkType } from '@prisma/client';

import { prisma } from '../seed';
import {
  EXTERIOR_RESIDENTIAL_WORK_ITEMS,
  INTERIOR_RESIDENTIAL_WORK_ITEMS,
} from './workItems';

const NAME = 'PermitRules';

const INTERIOR_RESIDENTIAL_RULES: Prisma.PermitRuleCreateInput[] = [
  {
    locationMunicipality: {
      connect: { slug: 'san-francisco-ca' },
    },
    permitProcess: {
      connect: { slug: 'over-the-counter-with-plans' },
    },
    workItem: {
      connect: { slug: INTERIOR_RESIDENTIAL_WORK_ITEMS[0].slug },
    },
  },
  {
    locationMunicipality: {
      connect: { slug: 'san-francisco-ca' },
    },
    permitProcess: {
      connect: { slug: 'over-the-counter-with-plans' },
    },
    workItem: {
      connect: { slug: INTERIOR_RESIDENTIAL_WORK_ITEMS[1].slug },
    },
  },
  {
    locationMunicipality: {
      connect: { slug: 'san-francisco-ca' },
    },
    permitProcess: {
      connect: { slug: 'over-the-counter-no-plans' },
    },
    workItem: {
      connect: { slug: INTERIOR_RESIDENTIAL_WORK_ITEMS[2].slug },
    },
  },
  {
    locationMunicipality: {
      connect: { slug: 'san-francisco-ca' },
    },
    permitProcess: {
      connect: { slug: 'over-the-counter-no-plans' },
    },
    workItem: {
      connect: { slug: INTERIOR_RESIDENTIAL_WORK_ITEMS[3].slug },
    },
  },
  {
    locationMunicipality: {
      connect: { slug: 'san-jose-ca' },
    },
    permitProcess: {
      connect: { slug: 'over-the-counter-with-plans' },
    },
    workItem: {
      connect: { slug: INTERIOR_RESIDENTIAL_WORK_ITEMS[0].slug },
    },
  },
];

const EXTERIOR_RESIDENTIAL_RULES: Prisma.PermitRuleCreateInput[] = [
  {
    locationMunicipality: {
      connect: { slug: 'san-francisco-ca' },
    },
    permitProcess: {
      connect: { slug: 'over-the-counter-with-plans' },
    },
    workItem: {
      connect: { slug: EXTERIOR_RESIDENTIAL_WORK_ITEMS[0].slug },
    },
  },
  {
    locationMunicipality: {
      connect: { slug: 'san-francisco-ca' },
    },
    permitProcess: {
      connect: { slug: 'over-the-counter-with-plans' },
    },
    workItem: {
      connect: { slug: EXTERIOR_RESIDENTIAL_WORK_ITEMS[1].slug },
    },
  },
  {
    locationMunicipality: {
      connect: { slug: 'san-francisco-ca' },
    },
    permitProcess: {
      connect: { slug: 'over-the-counter-no-plans' },
    },
    workItem: {
      connect: { slug: EXTERIOR_RESIDENTIAL_WORK_ITEMS[2].slug },
    },
  },
  {
    locationMunicipality: {
      connect: { slug: 'san-francisco-ca' },
    },
    permitProcess: {
      connect: { slug: 'none' },
    },
    workItem: {
      connect: { slug: EXTERIOR_RESIDENTIAL_WORK_ITEMS[3].slug },
    },
  },
  {
    locationMunicipality: {
      connect: { slug: 'san-francisco-ca' },
    },
    permitProcess: {
      connect: { slug: 'in-house-review' },
    },
    workItem: {
      connect: { slug: EXTERIOR_RESIDENTIAL_WORK_ITEMS[4].slug },
    },
  },
];

const main = async () => {
  console.info(`Seeding ${NAME}`);
  const promises = [
    ...INTERIOR_RESIDENTIAL_RULES,
    ...EXTERIOR_RESIDENTIAL_RULES,
  ].map((item) => {
    return prisma.permitRule.upsert({
      create: item,
      update: item,
      where: {
        locationMunicipalitySlug_workItemSlug: {
          locationMunicipalitySlug: item.locationMunicipality.connect
            ?.slug as string,
          workItemSlug: item.workItem.connect?.slug as string,
        },
      },
    });
  });
  await Promise.all(promises);
  console.info(`Done seeding ${NAME}`);
};

export default main;
