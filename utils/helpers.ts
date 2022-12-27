import { WorkItem } from '@prisma/client';
import { orderBy } from 'lodash-es';

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
