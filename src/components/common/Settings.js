import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import { withTranslation } from 'react-i18next';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { toggleShowQrCode, toggleShowModel } from '../../actions';

const styles = theme => ({
  settingsFab: {
    right: theme.spacing.unit * 4,
    bottom: theme.spacing.unit * 4,
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
    padding: theme.spacing.unit * 2,
  },
});

class Settings extends Component {
  state = {
    openModal: false,
  };

  static propTypes = {
    t: PropTypes.func.isRequired,
    dispatchToggleShowQrCode: PropTypes.func.isRequired,
    dispatchToggleShowModel: PropTypes.func.isRequired,
    classes: PropTypes.shape({}).isRequired,
    showQrCode: PropTypes.bool.isRequired,
    showModel: PropTypes.bool.isRequired,
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  handleToggleModal = () => {
    const { openModal } = this.state;
    this.setState({ openModal: !openModal });
  };

  handleToggleShowQrCode = () => {
    const { showQrCode, dispatchToggleShowQrCode } = this.props;
    dispatchToggleShowQrCode(!showQrCode);
  };

  handleToggleShowModel = () => {
    const { showModel, dispatchToggleShowModel } = this.props;
    dispatchToggleShowModel(!showModel);
  };

  render() {
    const { t, classes, showQrCode, showModel } = this.props;
    const { openModal } = this.state;
    const qrSwitch = (
      <Switch
        onChange={this.handleToggleShowQrCode}
        checked={showQrCode}
        id="showQrCode"
      />
    );
    const modelSwitch = (
      <Switch
        onChange={this.handleToggleShowModel}
        checked={showModel}
        id="showModel"
      />
    );
    return (
      <Fragment>
        <Fab
          color="primary"
          aria-label="Settings"
          onClick={this.handleToggleModal}
          className={classes.settingsFab}
        >
          <SettingsIcon />
        </Fab>
        <Modal
          aria-labelledby="Settings Model"
          aria-describedby="Configure your application."
          open={openModal}
          onClose={this.handleCloseModal}
        >
          <div className={classes.settingsModal}>
            <Typography align="center" variant="h4">
              {t('Settings')}
            </Typography>
            <FormGroup row>
              <FormControlLabel control={qrSwitch} label={t('Show QR Code')} />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel control={modelSwitch} label={t('Show Model')} />
            </FormGroup>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ appInstance }) => {
  // only override defaults if they have actually been defined in the settings
  let showQrCode = true;
  let showModel = true;
  if (appInstance.content && appInstance.content.settings) {
    if (typeof appInstance.content.settings.showQrCode !== 'undefined') {
      ({ showQrCode } = appInstance.content.settings);
    }
    if (typeof appInstance.content.settings.showModel !== 'undefined') {
      ({ showModel } = appInstance.content.settings);
    }
  }
  return {
    showQrCode,
    showModel,
  };
};

const mapDispatchToProps = {
  dispatchToggleShowQrCode: toggleShowQrCode,
  dispatchToggleShowModel: toggleShowModel,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
const StyledComponent = withStyles(styles)(ConnectedComponent);
export default withTranslation()(StyledComponent);
