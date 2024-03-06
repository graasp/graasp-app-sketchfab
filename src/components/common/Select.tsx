import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material';

interface Option {
  value: string;
  label: string | number;
}
interface Props {
  onChange: (event: SelectChangeEvent<string>) => void;
  options: Option[];
  selectedOption: Option;
  label: string;
}

const Select = ({
  options,
  onChange,
  selectedOption,
  label,
}: Props): JSX.Element => (
  <Grid ml={2} xs={8} item margin="0 auto">
    <FormControl sx={{ m: 1, width: '100%' }}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        value={selectedOption.value}
        onChange={onChange}
        renderValue={() => (
          <span style={{ textTransform: 'capitalize' }}>
            {selectedOption.label}
          </span>
        )}
      >
        {options.map((c) => (
          <MenuItem
            key={c.value}
            sx={{ textTransform: 'capitalize' }}
            value={c.value}
          >
            {c.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  </Grid>
);

export default Select;
