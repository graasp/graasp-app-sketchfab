import PropTypes from 'prop-types';
import React from 'react';
import { QRCode as QrCode } from 'react-qr-svg';

import { withStyles } from '@material-ui/core/styles';

import { QR_CODE_CY } from '../../config/selectors';

const styles = (theme) => ({
  modelQrCode: {
    padding: theme.spacing(5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ModelQrCode = ({ uid, classes }) => (
  <div className={classes.modelQrCode} data-cy={QR_CODE_CY}>
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
