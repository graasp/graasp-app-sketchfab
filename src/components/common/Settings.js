import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader } from '@graasp/ui';

import {
  Divider,
  Fab,
  FormControlLabel,
  FormGroup,
  Modal,
  Switch,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';

import { useSettings } from '../../config/hooks';

const useStyles = makeStyles((theme) => ({
  settingsFab: {
    right: theme.spacing(4),
    bottom: theme.spacing(4),
    position: 'fixed',
  },
  settingsModal: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: theme.spacing(2),
  },
}));

const Settings = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const { showQrCode, showModel, saveShowQrCode, saveShowModel, isLoading } =
    useSettings();

  if (isLoading) {
    return <Loader />;
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleToggleShowQrCode = (e) => {
    saveShowQrCode(e.target.checked);
  };

  const handleToggleShowModel = (e) => {
    saveShowModel(e.target.checked);
  };

  const qrSwitch = (
    <Switch
      onChange={handleToggleShowQrCode}
      checked={showQrCode}
      id="showQrCode"
    />
  );
  const modelSwitch = (
    <Switch
      onChange={handleToggleShowModel}
      checked={showModel}
      id="showModel"
    />
  );
  return (
    <>
      <Fab
        color="primary"
        aria-label="Settings"
        onClick={handleToggleModal}
        className={classes.settingsFab}
      >
        <SettingsIcon />
      </Fab>
      <Modal
        aria-labelledby="Settings Model"
        aria-describedby="Configure your application."
        open={openModal}
        onClose={handleCloseModal}
      >
        <div className={classes.settingsModal}>
          <Typography align="center" variant="h4">
            {t('Settings')}
          </Typography>
          <Divider />
          <FormGroup row>
            <FormControlLabel control={qrSwitch} label={t('Show QR Code')} />
          </FormGroup>
          <FormGroup row>
            <FormControlLabel control={modelSwitch} label={t('Show Model')} />
          </FormGroup>
        </div>
      </Modal>
    </>
  );
};

export default Settings;
