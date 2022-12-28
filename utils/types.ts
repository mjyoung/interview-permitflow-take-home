import { Prisma } from '@prisma/client';

export type JobRequestGetPayload = Prisma.JobRequestGetPayload<{
  include: {
    permitRules: {
      include: {
        locationMunicipality: true;
        workItem: true;
        permitProcess: true;
      };
    };
  };
}>;
