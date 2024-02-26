import { useTranslation } from 'react-i18next';

import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';

import { Interval } from '../../types/chart';
import { intervals } from '../../utils/chart';

interface Props {
  interval: Interval;
  setInterval: (val: Interval) => void;
}
const SelectInterval = ({ interval, setInterval }: Props): JSX.Element => {
  const { t } = useTranslation();

  const handleChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    const selectedInterval = intervals.find((ele) => ele.value === value);
    if (selectedInterval) {
      setInterval(selectedInterval);
    }
  };
  return (
    <Grid ml={2} xs={8} item>
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="viewLabel">{t('Intervals')}</InputLabel>
        <Select
          label={t('Intervals')}
          value={interval.value}
          onChange={handleChange}
          renderValue={() => (
            <span style={{ textTransform: 'capitalize' }}>
              {t(interval.labelKey)}
            </span>
          )}
        >
          {intervals.map((c) => (
            <MenuItem
              key={c.id}
              sx={{ textTransform: 'capitalize' }}
              value={c.value}
            >
              {t(c.labelKey)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default SelectInterval;
