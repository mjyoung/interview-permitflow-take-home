import { Prisma, WorkArea, WorkType } from '@prisma/client';
import { prisma } from '../seed';

const NAME = 'PermitRequirements';

const INTERIOR_RESIDENTIAL: Prisma.WorkItemCreateInput[] = [
  {
    displayText: 'New bathroom',
    workType: WorkType.RESIDENTIAL,
    workArea: WorkArea.INTERIOR,
    locationMunicipality: {
      connect: {
        slug: 'san-francisco-ca',
      },
    },
    permitRequirement: {
      connect: {
        slug: 'over-the-counter-with-plans',
      },
    },
  },
  {
    displayText: 'New laundry room',
    workType: WorkType.RESIDENTIAL,
    workArea: WorkArea.INTERIOR,
    locationMunicipality: {
      connect: {
        slug: 'san-francisco-ca',
      },
    },
    permitRequirement: {
      connect: {
        slug: 'over-the-counter-with-plans',
      },
    },
  },
  {
    displayText: 'Bathroom remodel',
    workType: WorkType.RESIDENTIAL,
    workArea: WorkArea.INTERIOR,
    locationMunicipality: {
      connect: {
        slug: 'san-francisco-ca',
      },
    },
    permitRequirement: {
      connect: {
        slug: 'over-the-counter-no-plans',
      },
    },
  },
  {
    displayText: 'Other',
    workType: WorkType.RESIDENTIAL,
    workArea: WorkArea.INTERIOR,
    locationMunicipality: {
      connect: {
        slug: 'san-francisco-ca',
      },
    },
    permitRequirement: {
      connect: {
        slug: 'over-the-counter-no-plans',
      },
    },
  },
];

const EXTERIOR_RESIDENTIAL: Prisma.WorkItemCreateInput[] = [
  {
    displayText: 'Garage door replacement',
    workType: WorkType.RESIDENTIAL,
    workArea: WorkArea.EXTERIOR,
    locationMunicipality: {
      connect: {
        slug: 'san-francisco-ca',
      },
    },
    permitRequirement: {
      connect: {
        slug: 'over-the-counter-with-plans',
      },
    },
  },
  {
    displayText: 'Work on exterior doors',
    workType: WorkType.RESIDENTIAL,
    workArea: WorkArea.EXTERIOR,
    locationMunicipality: {
      connect: {
        slug: 'san-francisco-ca',
      },
    },
    permitRequirement: {
      connect: {
        slug: 'over-the-counter-with-plans',
      },
    },
  },
  {
    displayText: 'Re-roofing',
    workType: WorkType.RESIDENTIAL,
    workArea: WorkArea.EXTERIOR,
    locationMunicipality: {
      connect: {
        slug: 'san-francisco-ca',
      },
    },
    permitRequirement: {
      connect: {
        slug: 'over-the-counter-no-plans',
      },
    },
  },
  {
    displayText: 'Building fences less than 6 feet',
    workType: WorkType.RESIDENTIAL,
    workArea: WorkArea.EXTERIOR,
    locationMunicipality: {
      connect: {
        slug: 'san-francisco-ca',
      },
    },
    permitRequirement: {
      connect: {
        slug: 'none',
      },
    },
  },
  {
    displayText: 'Other',
    workType: WorkType.RESIDENTIAL,
    workArea: WorkArea.EXTERIOR,
    locationMunicipality: {
      connect: {
        slug: 'san-francisco-ca',
      },
    },
    permitRequirement: {
      connect: {
        slug: 'in-house-review',
      },
    },
  },
];

const main = async () => {
  console.info(`Seeding ${NAME}`);
  const promises = [...INTERIOR_RESIDENTIAL, ...EXTERIOR_RESIDENTIAL].map(
    (item) => {
      return prisma.workItem.upsert({
        create: item,
        update: item,
        where: {
          displayText_workType_workArea_locationMunicipalitySlug_permitRequirementSlug:
            {
              displayText: item.displayText,
              workArea: item.workArea,
              workType: item.workType,
              locationMunicipalitySlug: item.locationMunicipality.connect
                ?.slug as string,
              permitRequirementSlug: item.permitRequirement.connect
                ?.slug as string,
            },
        },
      });
    }
  );
  await Promise.all(promises);
  console.info(`Done seeding ${NAME}`);
};

export default main;
