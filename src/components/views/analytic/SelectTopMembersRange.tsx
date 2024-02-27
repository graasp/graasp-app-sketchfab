import { t } from 'i18next';
import React from 'react';

import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';

import { MemberLimit } from '../../../types/chart';
import { topMembersRangeOptions } from '../../../utils/chart';

interface Props {
  selectedMemberLimit: MemberLimit;
  setSelectedMemberLimit: (val: MemberLimit) => void;
}
const SelectTopMembersRange = ({
  selectedMemberLimit,
  setSelectedMemberLimit,
}: Props): JSX.Element => {
  const handleChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    const memberRange = topMembersRangeOptions.find(
      (ele) => ele.value === value
    );
    if (memberRange) {
      setSelectedMemberLimit(memberRange);
    }
  };
  return (
    <Grid ml={2} xs={8} item margin="0 auto">
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="viewLabel">{t('Top Member Range')}</InputLabel>
        <Select
          label={t('Top Member Range')}
          value={selectedMemberLimit.value}
          onChange={handleChange}
          renderValue={() => (
            <span style={{ textTransform: 'capitalize' }}>
              {t(selectedMemberLimit.label)}
            </span>
          )}
        >
          {topMembersRangeOptions.map((c) => (
            <MenuItem
              key={c.value}
              sx={{ textTransform: 'capitalize' }}
              value={c.value}
            >
              {t(c.label)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default SelectTopMembersRange;
