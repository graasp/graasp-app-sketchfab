import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  noContentAvailable: {
    display: 'flex',
    position: 'fixed',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const NoContentAvailable = props => {
  const { classes } = props;
  return (
    <div className={classes.noContentAvailable}>
      <WarningIcon fontSize="large" />
      <Typography>This app has been configured to show no content.</Typography>
    </div>
  );
};

NoContentAvailable.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(NoContentAvailable);
