import React from 'react';
import { ResponsiveContainer } from 'recharts';

import { Box } from '@mui/material';

import { CONTAINER_HEIGHT } from '../../constants/style';
import ChartTitle from './ChartTitle';

interface Props {
  children: JSX.Element;
  title: string;
}

const ChartContainer = ({ children, title }: Props): JSX.Element => {
  return (
    <>
      <ChartTitle title={title} />
      <Box
        sx={{
          marginTop: 3,
          marginBottom: 2,
          marginLeft: 2,
          marginRight: 2,
        }}
      >
        <ResponsiveContainer width="95%" height={CONTAINER_HEIGHT}>
          {children}
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default ChartContainer;
