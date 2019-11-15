import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  modelNotConfigured: {
    display: 'flex',
    position: 'fixed',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ModelNotConfigured = props => {
  const { classes } = props;
  return (
    <div className={classes.modelNotConfigured}>
      <BrokenImageIcon fontSize="large" />
      <Typography>This model has not been configured.</Typography>
    </div>
  );
};

ModelNotConfigured.propTypes = {
  classes: PropTypes.shape({
    modelNotConfigured: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(ModelNotConfigured);
