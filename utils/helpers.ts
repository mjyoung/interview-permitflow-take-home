import { WorkItem } from '@prisma/client';
import { orderBy } from 'lodash-es';

import { JobRequestGetPayload } from './types';

export const sortWorkItemsAlphabetically = (workItems: WorkItem[]) => {
  let otherItem;
  const filteredItems = workItems.filter((i) => {
    if (i.displayText === 'Other') {
      otherItem = i;
      return false;
    }
    return true;
  });
  const orderedItems = orderBy(filteredItems, ['displayText'], ['asc']);
  if (otherItem) return orderedItems.concat(otherItem);
  return orderedItems;
};

export const getPermitProcessForJobRequest = (
  jobRequest: JobRequestGetPayload | null
) => {
  if (!jobRequest) return null;
  const permitRules = jobRequest.permitRules;
  let permitProcess;
  for (const rule of permitRules) {
    if (rule.permitProcess.slug === 'in-house-review') {
      permitProcess = rule.permitProcess;
      break;
    }

    if (rule.permitProcess.slug === 'over-the-counter-with-plans') {
      permitProcess = rule.permitProcess;
    } else if (
      rule.permitProcess.slug === 'over-the-counter-no-plans' &&
      permitProcess?.slug !== 'over-the-counter-with-plans'
    ) {
      permitProcess = rule.permitProcess;
    } else if (rule.permitProcess.slug === 'none' && !permitProcess) {
      permitProcess = rule.permitProcess;
    }
  }

  return permitProcess;
};

export const formatDate = (date: string) =>
  new Date(date).toLocaleString('en-us', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: undefined,
  });
