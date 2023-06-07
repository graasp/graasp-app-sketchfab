import { createRoot } from 'react-dom/client';

import { mockApi } from '@graasp/apps-query-client';

import Root from './components/Root';
import { ENABLE_MOCK_API, MODELS_ENDPOINT } from './config/settings';
import { MOCK_CONTEXT } from './data/db';
import './index.css';

// setup mocked api for cypress or standalone app
if (ENABLE_MOCK_API) {
  mockApi({
    externalUrls: [MODELS_ENDPOINT],
    appContext: window.Cypress ? window.appContext : MOCK_CONTEXT,
    database: window.Cypress ? window.database : undefined,
  });
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!);
root.render(<Root />);
