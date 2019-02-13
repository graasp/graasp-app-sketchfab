import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  loader: {
    display: 'flex',
    position: 'fixed',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Loader(props) {
  const { classes } = props;
  return (
    <div className={classes.loader}>
      <CircularProgress className={classes.progress} />
    </div>
  );
}

Loader.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Loader);
