import groupBy from 'lodash.groupby';
import moment from 'moment';

import { AppAction } from '@graasp/sdk';

import { Interval, IntervalGroupBy } from '../types/chart';

// Helper function to group by date format
export const groupByDate = (data: AppAction[], dateFormat: IntervalGroupBy) => {
  const groupedByActions = groupBy(data, (item) =>
    moment(item.createdAt).format(dateFormat)
  );
  return Object.keys(groupedByActions).map((key) => ({
    label: key,
    count: groupedByActions[key].length,
  }));
};

export const intervals: Interval[] = [
  {
    id: 'week',
    labelKey: 'week',
    value: 'week',
    groupBy: 'YYYY-ww',
  },
  { id: 'day', labelKey: 'day', value: 'day', groupBy: 'YYYY-MM-DD' },
  { id: 'month', labelKey: 'month', value: 'month', groupBy: 'YYYY-MM' },
];
