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
    label: 'Top five',
  },
  {
    value: '10',
    label: 'Top ten',
  },
  {
    value: '25',
    label: 'Top 25',
  },
];

// Helper function to group by date format
export const groupByDate = (data: AppAction[], dateFormat: IntervalGroupBy) => {
  const groupedByActions = groupBy(data, (item) =>
    moment(item.createdAt).format(dateFormat)
  );
  const groupedArr = Object.keys(groupedByActions);
  const averageCount = (data.length / groupedArr.length).toFixed(2);

  return groupedArr.map((key) => ({
    label: key,
    count: groupedByActions[key].length,
    averageCount,
  }));
};

export const getTopViewsPerMember = (
  data: AppAction[],
  memberLimit: number
) => {
  const groupedByMemberId = groupBy(data, 'member.id');

  const res = Object.keys(groupedByMemberId).map((key) => ({
    memberName: groupedByMemberId[key][0].member.name,
    count: groupedByMemberId[key].length,
  }));

  return sortBy(res, ['count']).reverse().slice(0, memberLimit);
};
