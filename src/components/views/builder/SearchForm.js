import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import SearchIcon from '@mui/icons-material/Search';
import { AppBar, InputBase, Toolbar, Typography, alpha } from '@mui/material';

import { SEARCH_INPUT_CY } from '../../../config/selectors';

const StyledTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const SearchForm = ({ search, setSearch }) => {
  const { t } = useTranslation();
  const onKeyUp = (e) => {
    // Clear the timeout if it has already been set.
    // This will prevent the previous task from executing
    // if it has been less than <MILLISECONDS>
    clearTimeout(1000);

    // Make a new timeout set to go off in 1000ms (1 second)
    setTimeout(() => {
      setSearch(e.target.value);
    }, 1000);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <StyledTitle variant="h6" noWrap>
          Sketchfab
        </StyledTitle>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            data-cy={SEARCH_INPUT_CY}
            defaultValue={search}
            placeholder={t('Search for models…')}
            onKeyUp={onKeyUp}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
};

SearchForm.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
  search: null,
};

export default SearchForm;
