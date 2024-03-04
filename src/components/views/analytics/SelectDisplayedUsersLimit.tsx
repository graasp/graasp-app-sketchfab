import React from 'react';
import { useTranslation } from 'react-i18next';

import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';

import { UserLimitOption } from '../../../types/chart';
import { topMembersRangeOptions } from '../../../utils/chart';

interface Props {
  displayedUsersLimit: UserLimitOption;
  setDisplayedUsersLimit: (val: UserLimitOption) => void;
}
const SelectDisplayedUsersLimit = ({
  displayedUsersLimit,
  setDisplayedUsersLimit,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const handleChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    const memberRange = topMembersRangeOptions.find(
      (ele) => ele.value === value
    );
    if (memberRange) {
      setDisplayedUsersLimit(memberRange);
    }
  };
  return (
    <Grid ml={2} xs={8} item margin="0 auto">
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="viewLabel">{t('Top Users Limit')}</InputLabel>
        <Select
          label={t('Top Users Limit')}
          value={displayedUsersLimit.value}
          onChange={handleChange}
          renderValue={() => (
            <span style={{ textTransform: 'capitalize' }}>
              {t(displayedUsersLimit.label)}
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

export default SelectDisplayedUsersLimit;
