import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { getModels } from '../../../actions';

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class SearchForm extends Component {
  static propTypes = {
    dispatchGetModels: PropTypes.func.isRequired,
    classes: PropTypes.shape({}).isRequired,
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
    );
  }
}

const mapDispatchToProps = {
  dispatchGetModels: getModels,
};

const ConnectedComponent = connect(
  null,
  mapDispatchToProps
)(SearchForm);

export default withStyles(styles)(ConnectedComponent);
