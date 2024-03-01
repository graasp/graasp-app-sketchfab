import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader } from '@graasp/ui';

import SettingsIcon from '@mui/icons-material/Settings';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  FormControlLabel,
  FormGroup,
  Switch,
  styled,
} from '@mui/material';

import { useSettings } from '../../config/hooks';
import {
  SETTINGS_BUTTON_CY,
  SHOW_MODEL_SWITCH_CY,
  SHOW_QR_CODE_SWITCH_CY,
} from '../../config/selectors';

const StyledFab = styled(Fab)(({ theme }) => ({
  right: theme.spacing(4),
  bottom: theme.spacing(4),
  position: 'fixed',
}));

const Settings = (): JSX.Element => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const { showQrCode, showModel, saveShowQrCode, saveShowModel, isLoading } =
    useSettings();

  if (isLoading) {
    return <Loader />;
  }

  const handleCloseModal = (): void => {
    setOpenModal(false);
  };

  const handleToggleModal = (): void => {
    setOpenModal(!openModal);
  };

  const handleToggleShowQrCode = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    saveShowQrCode(e.target.checked);
  };

  const handleToggleShowModel = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    saveShowModel(e.target.checked);
  };

  const qrSwitch = (
    <Switch
      data-cy={SHOW_QR_CODE_SWITCH_CY}
      onChange={handleToggleShowQrCode}
      checked={showQrCode}
      id={SHOW_QR_CODE_SWITCH_CY}
    />
  );
  const modelSwitch = (
    <Switch
      data-cy={SHOW_MODEL_SWITCH_CY}
      onChange={handleToggleShowModel}
      checked={showModel}
      id={SHOW_MODEL_SWITCH_CY}
    />
  );
  return (
    <>
      <StyledFab
        color="primary"
        aria-label="Settings"
        onClick={handleToggleModal}
        data-cy={SETTINGS_BUTTON_CY}
      >
        <SettingsIcon />
      </StyledFab>
      <Dialog
        aria-labelledby="Settings Model"
        aria-describedby="Configure your application."
        open={openModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>
          {/* <Typography align="center" variant="h4"> */}
          {t('Settings')}
          {/* </Typography> */}
        </DialogTitle>
        <DialogContent>
          <FormGroup row>
            <FormControlLabel control={qrSwitch} label={t('Show QR Code')} />
          </FormGroup>
          <FormGroup row>
            <FormControlLabel control={modelSwitch} label={t('Show Model')} />
          </FormGroup>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Settings;
