import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { QRCode as QrCode } from 'react-qr-svg';

const styles = theme => ({
  modelQrCode: {
    padding: theme.spacing.unit * 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ModelQrCode = ({ uid, classes }) => (
  <div className={classes.modelQrCode}>
    <QrCode
      bgColor="#FFFFFF"
      fgColor="#000000"
      level="Q"
      style={{ width: 256 }}
      value={`https://sketchfab.com/models/${uid}/embed?api_id=1_api-frame&api_version=1.4.2`}
    />
  </div>
);

ModelQrCode.propTypes = {
  uid: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    modelQrCode: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(ModelQrCode);
