import { faQrcode, faVrCardboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

import { Loader } from '@graasp/ui';

import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/core/styles';

import { useSettings } from '../../../config/hooks';
import ModelNotConfigured from '../../common/ModelNotConfigured';
import ModelQrCode from '../../common/ModelQrCode';
import NoContentAvailable from '../../common/NoContentAvailable';
import Viewer from '../../common/Viewer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const PlayerView = () => {
  const classes = useStyles();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const {
    showQrCode,
    showModel,
    model,
    isLoading: isSettingsLoading,
  } = useSettings();

  useEffect(() => {
    if (window.frameElement) {
      // 600 is the height of the viewer and 48 the height of the header
      window.frameElement.style.height = '648px';
      window.frameElement.style['max-height'] = 'none';
    }
  }, []);

  if (isSettingsLoading) {
    return <Loader />;
  }

  const handleChange = (event, value) => {
    setActiveTabIndex(value);
  };

  const renderTabs = () => {
    const tabs = [];
    if (showModel) {
      tabs.push(
        <Tab icon={<FontAwesomeIcon icon={faVrCardboard} />} key="model" />
      );
    }
    if (showQrCode) {
      tabs.push(
        <Tab icon={<FontAwesomeIcon icon={faQrcode} />} key="qrCode" />
      );
    }
    return tabs;
  };

  if (!model) {
    return <ModelNotConfigured />;
  }
  if (!showModel && !showQrCode) {
    return <NoContentAvailable />;
  }

  const panels = [];
  if (showModel) {
    panels.push(<Viewer uid={model} autoStart={false} key="model" />);
  }
  if (showQrCode) {
    panels.push(<ModelQrCode uid={model} key="qrCode" />);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Tabs value={activeTabIndex} onChange={handleChange} centered>
          {renderTabs()}
        </Tabs>
      </AppBar>
      {panels[activeTabIndex]}
    </div>
  );
};

export default PlayerView;
