import React from 'react';
import { createRoot } from 'react-dom/client';

import { mockApi } from '@graasp/apps-query-client';

import Root from './components/Root';
import { ENABLE_MOCK_API, MODELS_ENDPOINT } from './config/settings';
import './index.css';

// setup mocked api for cypress or standalone app
if (ENABLE_MOCK_API) {
  mockApi({
    externalUrls: [MODELS_ENDPOINT],
    appContext: window.Cypress ? window.appContext : undefined,
    database: window.Cypress ? window.database : undefined,
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
