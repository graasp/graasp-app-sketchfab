import { useTranslation } from 'react-i18next';

import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';

import { MODEL_NOT_CONFIGURED_CY } from '../../config/selectors';

const StyledDiv = styled('div')(() => ({
  display: 'flex',
  position: 'fixed',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ModelNotConfigured = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <StyledDiv data-cy={MODEL_NOT_CONFIGURED_CY}>
      <BrokenImageIcon fontSize="large" sx={{ marginRight: 1 }} />
      <Typography>{t('This model has not been configured.')}</Typography>
    </StyledDiv>
  );
};

export default ModelNotConfigured;
