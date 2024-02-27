import groupBy from 'lodash.groupby';
import sortBy from 'lodash.sortby';
import moment from 'moment';

import { AppAction } from '@graasp/sdk';

import { Interval, IntervalGroupBy } from '../types/chart';

export const intervals: Interval[] = [
  { id: 'day', labelKey: 'day', value: 'day', groupBy: 'YYYY-MM-DD' },
  {
    id: 'week',
    labelKey: 'week',
    value: 'week',
    groupBy: 'YYYY-ww',
  },
  { id: 'month', labelKey: 'month', value: 'month', groupBy: 'YYYY-MM' },
];

export const topMembersRangeOptions = [
  {
    value: '5',
    label: 'Five',
  },
  {
    value: '10',
    label: 'Ten',
  },
  {
    value: '25',
    label: '25',
  },
];

// Helper function to group by date format
export const groupActionByTimeInterval = (
  data: AppAction[],
  dateFormat: IntervalGroupBy
) => {
  const actionsGroupedByDate = groupBy(data, (item) =>
    moment(item.createdAt).format(dateFormat)
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
  userLimit: number
) => {
  const groupedByMemberId = groupBy(data, 'member.id');

  const res = Object.keys(groupedByMemberId).map((key) => ({
    memberName: groupedByMemberId[key][0].member.name,
    count: groupedByMemberId[key].length,
  }));

  return sortBy(res, ['count']).reverse().slice(0, userLimit);
};
