import React, { useContext, useEffect } from 'react';

import { Context } from '@graasp/apps-query-client';

import { CONTEXTS } from '../config/contexts';
import i18n from '../config/i18n';
import { DEFAULT_LANG } from '../config/settings';
import BuilderView from './views/builder/BuilderView';
import PlayerView from './views/player/PlayerView';

export const App = () => {
  const context = useContext(Context);

  useEffect(() => {
    // handle a change of language
    const lang = context?.get('lang') ?? DEFAULT_LANG;
    if (i18n.lang !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [context]);

  const renderContent = () => {
    switch (context?.get('context')) {
      case CONTEXTS.BUILDER:
        return <BuilderView />;
      case CONTEXTS.PLAYER:
      default:
        return <PlayerView />;
    }
  };

  return renderContent();
};
export default App;
