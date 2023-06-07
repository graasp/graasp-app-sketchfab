import { useTranslation } from 'react-i18next';

import WarningIcon from '@mui/icons-material/Warning';
import { Box, styled } from '@mui/material';
import Typography from '@mui/material/Typography';

import { NO_CONTENT_CY } from '../../config/selectors';

const Wrapper = styled(Box)({
  display: 'flex',
  position: 'fixed',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
});

const NoContentAvailable = () => {
  const { t } = useTranslation();
  return (
    <Wrapper data-cy={NO_CONTENT_CY}>
      <WarningIcon fontSize="large" />
      <Typography>
        {t('This app has been configured to show no content.')}
      </Typography>
    </Wrapper>
  );
};

export default NoContentAvailable;
