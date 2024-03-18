import { useEffect } from 'react';

import { useLocalContext } from '@graasp/apps-query-client';
import { Context, PermissionLevel } from '@graasp/sdk';

import i18n, { DEFAULT_LANG } from '../config/i18n';
import AnalyticsView from './views/analytics/AnalyticsView';
import BuilderView from './views/builder/BuilderView';
import PlayerView from './views/player/PlayerView';

export const App = (): JSX.Element => {
  const context = useLocalContext();

  useEffect(() => {
    // handle a change of language
    const lang = context?.lang ?? 'en';
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [context]);

  const renderContent = (): JSX.Element => {
    switch (context?.permission) {
      case PermissionLevel.Admin:
        switch (context?.context) {
          case Context.Builder:
            return <BuilderView />;
          case Context.Analytics:
            return <AnalyticsView />;
          case Context.Player:
          default:
            return <PlayerView />;
        }
      case PermissionLevel.Write:
      case PermissionLevel.Read:
      default:
        return <PlayerView />;
    }
  };

  return renderContent();
};
export default App;
