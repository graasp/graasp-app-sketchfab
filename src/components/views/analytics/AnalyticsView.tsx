import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Box, Grid, Skeleton } from '@mui/material';

import { hooks } from '../../../config/queryClient';
import { CONTAINER_HEIGHT } from '../../../constants/style';
import {
  getMembersWithMostViews,
  groupActionByTimeInterval,
  intervals,
  topMembersRangeOptions,
} from '../../../utils/chart';
import MostFrequentUsersChart from './MostFrequentUsersChart';
import SelectDisplayedUsersLimit from './SelectDisplayedUsersLimit';
import SelectInterval from './SelectInterval';
import ViewsOverTimeChart from './ViewsOverTimeChart';

const AnalyticsView = (): JSX.Element => {
  const [interval, setInterval] = useState(intervals[0]);
  const [displayedUsersLimit, setDisplayedUsersLimit] = useState(
    topMembersRangeOptions[0]
  );

  const { t } = useTranslation();
  const { data, isLoading } = hooks.useAppActions();

  const actionsGroupedByInterval = useMemo(
    () => groupActionByTimeInterval(data || [], interval.groupBy),
    [data, interval.groupBy]
  );

  const topFrequentUsers = useMemo(
    () =>
      getMembersWithMostViews(data || [], Number(displayedUsersLimit.value)),
    [data, displayedUsersLimit.value]
  );

    if (data) {
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <SelectInterval interval={interval} setInterval={setInterval} />
          <ViewsOverTimeChart data={actionsGroupedByInterval} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <SelectDisplayedUsersLimit
            displayedUsersLimit={displayedUsersLimit}
            setDisplayedUsersLimit={setDisplayedUsersLimit}
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
