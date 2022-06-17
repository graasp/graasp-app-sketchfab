import PropTypes from 'prop-types';
import React from 'react';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';

import { NO_CONTENT_CY } from '../../config/selectors';

const styles = (theme) => ({
  progress: {
    margin: theme.spacing(2),
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

const NoContentAvailable = (props) => {
  const { classes } = props;
  return (
    <div className={classes.noContentAvailable} data-cy={NO_CONTENT_CY}>
      <WarningIcon fontSize="large" />
      <Typography>This app has been configured to show no content.</Typography>
    </div>
  );
};

NoContentAvailable.propTypes = {
  classes: PropTypes.shape({
    noContentAvailable: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(NoContentAvailable);
