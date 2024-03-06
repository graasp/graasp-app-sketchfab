import { format } from 'date-fns';
import groupBy from 'lodash.groupby';
import sortBy from 'lodash.sortby';

import { AppAction } from '@graasp/sdk';

import { IntervalGroupBy } from '../types/chart';

// Helper function to group by date format
export const groupActionByTimeInterval = (
  data: AppAction[],
  dateFormat: IntervalGroupBy
) => {
  const actionsGroupedByDate = groupBy(data, (item) =>
    format(item.createdAt, dateFormat)
  );
  const dateIntervals = Object.keys(actionsGroupedByDate);
  const averageCount = (data.length / dateIntervals.length).toFixed(2);

  return dateIntervals.map((key) => ({
    label: key,
    count: actionsGroupedByDate[key].length,
    averageCount,
  }));
};

export const getMembersWithMostViews = (
  data: AppAction[],
  userLimit: number | 'all'
) => {
  const groupedByMemberId = groupBy(data, 'member.id');

  const res = Object.keys(groupedByMemberId).map((key) => ({
    memberName: groupedByMemberId[key][0].member.name,
    count: groupedByMemberId[key].length,
  }));

  if (userLimit === 'all') {
    return sortBy(res, ['count']).reverse();
  }
  return sortBy(res, ['count']).reverse().slice(0, userLimit);
};
