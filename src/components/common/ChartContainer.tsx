import React from 'react';
import { ResponsiveContainer } from 'recharts';

import { Box } from '@mui/material';

import { CONTAINER_HEIGHT } from '../../constants/style';
import ChartTitle from './ChartTitle';

interface Props {
  children: JSX.Element;
  title: string;
}
const ChartContainer = ({ children, title }: Props): JSX.Element => (
  <>
    <ChartTitle title={title} />
    <Box width="100%" p={2}>
      <ResponsiveContainer width="100%" height={CONTAINER_HEIGHT}>
        {children}
      </ResponsiveContainer>
    </Box>
  </>
);

export default ChartContainer;
