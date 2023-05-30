import { useEffect } from 'react';

import { useLocalContext } from '@graasp/apps-query-client';
import { Context, DEFAULT_LANG } from '@graasp/sdk';

import i18n from '../config/i18n';
import BuilderView from './views/builder/BuilderView';
import PlayerView from './views/player/PlayerView';

export const App = () => {
  const context = useLocalContext();

  useEffect(() => {
    // handle a change of language
    const lang = context?.lang ?? DEFAULT_LANG;
    if (i18n.lang !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [context]);

  const renderContent = () => {
    switch (context?.context) {
      case Context.Builder:
        return <BuilderView />;
      case Context.Player:
      default:
        return <PlayerView />;
    }
  };

  return renderContent();
};
export default App;
