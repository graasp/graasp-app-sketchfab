import React from 'react';
import { createRoot } from 'react-dom/client';

import { mockApi } from '@graasp/apps-query-client';

import Root from './components/Root';
import { MODELS_ENDPOINT } from './config/api';
import { ENABLE_MOCK_API } from './config/settings';
import './index.css';

// setup mocked api for cypress or standalone app
if (ENABLE_MOCK_API) {
  mockApi({
    externalUrls: [MODELS_ENDPOINT],
    appContext: window.Cypress ? window.appContext : undefined,
    database: window.Cypress
      ? window.database
      : {
          appSettings: [
            {
              id: 'model-id',
              data: { model: '17cf917d160645b6a57a09c420ed647d' },
              name: 'model',
            },
          ],
        },
  });
}

const root = createRoot(document.getElementById('root'));

const renderApp = (RootComponent) => {
  root.render(<RootComponent />);
};

// render app to the dom

renderApp(Root);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./components/Root').default;
    renderApp(NextRoot);
  });
}
