import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Box, Grid, Skeleton } from '@mui/material';

import { hooks } from '../../../config/queryClient';
import { CONTAINER_HEIGHT } from '../../../constants/style';
import {
  getTopViewsPerMember,
  groupByDate,
  intervals,
  topMembersRangeOptions,
} from '../../../utils/chart';
import SelectInterval from './SelectInterval';
import SelectTopMembersRange from './SelectTopMembersRange';
import TopMembersChart from './TopMembersChart';
import ViewsOverTimeChart from './ViewsOverTimeChart';

const AnalyticView = (): JSX.Element => {
  const [interval, setInterval] = useState(intervals[0]);
  const [selectedMemberLimit, setSelectedMemberLimit] = useState(
    topMembersRangeOptions[0]
  );

  const { t } = useTranslation();
  const { data, isLoading } = hooks.useAppActions();

  const actionsGroupedByInterval = useMemo(
    () => groupByDate(data || [], interval.groupBy),
    [data, interval.groupBy]
  );

  const topActionsByMembers = useMemo(
    () => getTopViewsPerMember(data || [], Number(selectedMemberLimit.value)),
    [data, selectedMemberLimit.value]
  );

  if (data) {
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <SelectInterval interval={interval} setInterval={setInterval} />
          <ViewsOverTimeChart data={actionsGroupedByInterval} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <SelectTopMembersRange
            selectedMemberLimit={selectedMemberLimit}
            setSelectedMemberLimit={setSelectedMemberLimit}
          />
          <TopMembersChart data={topActionsByMembers} />
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

export default AnalyticView;
