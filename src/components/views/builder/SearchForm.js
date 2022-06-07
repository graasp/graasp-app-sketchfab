import PropTypes from 'prop-types';
import React from 'react';

import { AppBar, InputBase, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
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
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 200,
      '&:focus': {
        width: 300,
      },
    },
  },
}));

const SearchForm = ({ search, setSearch }) => {
  const classes = useStyles();

  const onKeyUp = (e) => {
    // Clear the timeout if it has already been set.
    // This will prevent the previous task from executing
    // if it has been less than <MILLISECONDS>
    clearTimeout(1000);

    // Make a new timeout set to go off in 1000ms (1 second)
    setTimeout(function () {
      setSearch(e.target.value);
    }, 1000);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h6" noWrap>
          Sketchfab
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            defaultValue={search}
            placeholder="Search for models…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onKeyUp={onKeyUp}
          />
        </div>
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
