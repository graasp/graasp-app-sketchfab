import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase, AppBar, Toolbar, Typography } from '@material-ui/core';
import { getModels } from '../../../actions';

const styles = theme => ({
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
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
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
});

class SearchForm extends Component {
  static propTypes = {
    dispatchGetModels: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      search: PropTypes.string.isRequired,
      searchIcon: PropTypes.string.isRequired,
      inputRoot: PropTypes.string.isRequired,
      inputInput: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  };

  handleSearch = event => {
    if (event.charCode === 13) {
      const { dispatchGetModels } = this.props;
      dispatchGetModels({ q: event.target.value });
    }
  };

  render() {
    const { classes } = this.props;
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
              placeholder="Search for models…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onKeyPress={this.handleSearch}
            />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapDispatchToProps = {
  dispatchGetModels: getModels,
};

const ConnectedComponent = connect(null, mapDispatchToProps)(SearchForm);

export default withStyles(styles)(ConnectedComponent);
