import { faQrcode, faVrCardboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import { Loader } from '@graasp/ui';

import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { useModelInfo, useSettings } from '../../../config/hooks';
import { mutations } from '../../../config/queryClient';
import { QR_CODE_TAB_CY } from '../../../config/selectors';
import { Triggers } from '../../../config/triggers';
import ModelNotConfigured from '../../common/ModelNotConfigured';
import ModelQrCode from '../../common/ModelQrCode';
import NoContentAvailable from '../../common/NoContentAvailable';
import Viewer from '../../common/Viewer';

const PlayerView = (): JSX.Element => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const {
    showQrCode,
    showModel,
    model,
    isLoading: isSettingsLoading,
  } = useSettings();
  const { mutate } = mutations.usePostAppAction();
  const { data } = useModelInfo(model);

  if (isSettingsLoading) {
    return <Loader />;
  }

  const handleChange = (event: React.SyntheticEvent, value: number): void => {
    setActiveTabIndex(value);
  };

  const renderTabs = (): JSX.Element[] => {
    const tabs = [];
    if (showModel) {
      tabs.push(
        <Tab icon={<FontAwesomeIcon icon={faVrCardboard} />} key="model" />,
      );
    }
    if (showQrCode) {
      tabs.push(
        <Tab
          data-cy={QR_CODE_TAB_CY}
          icon={<FontAwesomeIcon icon={faQrcode} />}
          key="qrCode"
        />,
      );
    }
    return tabs;
  };
  const saveAction = (): void => {
    mutate({
      type: Triggers.VIEW_MODEL,
      data: {
        modelId: model,
        modelName: data?.name,
      },
    });
  };
  if (!model) {
    return <ModelNotConfigured />;
  }
  if (!showModel && !showQrCode) {
    return <NoContentAvailable />;
  }

  const panels = [];
  if (showModel) {
    panels.push(
      <Viewer uid={model} autoStart={false} key="model" onReady={saveAction} />,
    );
  }
  if (showQrCode) {
    panels.push(<ModelQrCode uid={model} key="qrCode" />);
  }

  return (
    <div>
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
