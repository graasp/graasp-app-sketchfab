import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Box, Grid, Skeleton } from '@mui/material';

import { hooks } from '../../../config/queryClient';
import { CONTAINER_HEIGHT } from '../../../constants/style';
import { Interval } from '../../../types/chart';
import {
  getMembersWithMostViews,
  groupActionByTimeInterval,
} from '../../../utils/chart';
import Select from '../../common/Select';
import MostFrequentUsersChart from './MostFrequentUsersChart';
import ViewsOverTimeChart from './ViewsOverTimeChart';

const topMembersRangeOptions = [
  {
    value: '5',
    label: 5,
  },
  {
    value: '10',
    label: 10,
  },
  {
    value: '25',
    label: 25,
  },
  {
    value: 'all',
    label: 'all',
  },
];

const intervals: Interval[] = [
  { label: 'day', value: 'day', groupBy: 'yyyy-MM-dd' },
  {
    label: 'week',
    value: 'week',
    groupBy: 'yyyy-ww',
  },
  { label: 'month', value: 'month', groupBy: 'yyyy-MM' },
];

const AnalyticsView = (): JSX.Element => {
  const { t } = useTranslation();

  const [interval, setInterval] = useState(intervals[0]);
  const [displayedUsersLimit, setDisplayedUsersLimit] = useState(
    topMembersRangeOptions[0],
  );

  const { data, isLoading } = hooks.useAppActions();

  const actionsGroupedByInterval = useMemo(
    () => groupActionByTimeInterval(data || [], interval.groupBy),
    [data, interval.groupBy],
  );

  const topFrequentUsers = useMemo(
    () =>
      getMembersWithMostViews(
        data || [],
        displayedUsersLimit.value === 'all'
          ? 'all'
          : Number(displayedUsersLimit.value),
      ),
    [data, displayedUsersLimit.value],
  );

  const handleIntervalChange = ({
    target: { value },
  }: {
    target: { value: string };
  }): void => {
    const selectedInterval = intervals.find((ele) => ele.value === value);
    if (selectedInterval) {
      setInterval(selectedInterval);
    }
  };

  const handleUserRangeOnChange = ({
    target: { value },
  }: {
    target: { value: string };
  }): void => {
    const memberRange = topMembersRangeOptions.find(
      (ele) => ele.value === value,
    );

    if (memberRange) {
      setDisplayedUsersLimit(memberRange);
    }
  };

  if (data) {
    return (
      <Grid container>
        <Grid item xs={12} md={6}>
          <Select
            selectedOption={interval}
            options={intervals}
            onChange={handleIntervalChange}
            label={t('Intervals')}
          />
          <ViewsOverTimeChart data={actionsGroupedByInterval} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Select
            selectedOption={displayedUsersLimit}
            options={topMembersRangeOptions}
            onChange={handleUserRangeOnChange}
            label={t('Top Users Limit')}
          />
          <MostFrequentUsersChart data={topFrequentUsers} />
        </Grid>
      </Grid>
    );
  }
  if (isLoading) {
    return (
      <Grid container spacing={2} p={2}>
        {[1, 2].map((ele) => (
          <Grid item xs={12} sm={12} md={6} key={ele}>
            <Skeleton variant="rectangular" height={CONTAINER_HEIGHT} />
          </Grid>
        ))}
      </Grid>
    );
  }
  return (
    <Box pl={2} pr={2} mb={2} flexGrow={1}>
      <Alert severity="error">{t('GET_ITEM_ERROR')}</Alert>
    </Box>
  );
};

export default AnalyticsView;
