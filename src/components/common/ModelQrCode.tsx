import PropTypes from 'prop-types';
import { QRCode as QrCode } from 'react-qr-svg';

import { styled } from '@mui/material/styles';

import { QR_CODE_CY } from '../../config/selectors';

const Wrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModelQrCode = ({ uid }: { uid: string }): JSX.Element => (
  <Wrapper data-cy={QR_CODE_CY}>
    <QrCode
      bgColor="#FFFFFF"
      fgColor="#000000"
      level="Q"
      style={{ width: 256 }}
      value={`https://sketchfab.com/models/${uid}/embed?api_id=1_api-frame&api_version=1.4.2`}
    />
  </Wrapper>
);

ModelQrCode.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default ModelQrCode;
