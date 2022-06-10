import PropTypes from 'prop-types';
import React from 'react';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';

import { MODEL_NOT_CONFIGURED_CY } from '../../config/selectors';

const styles = () => ({
  modelNotConfigured: {
    display: 'flex',
    position: 'fixed',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ModelNotConfigured = (props) => {
  const { classes } = props;
  return (
    <div
      className={classes.modelNotConfigured}
      data-cy={MODEL_NOT_CONFIGURED_CY}
    >
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
