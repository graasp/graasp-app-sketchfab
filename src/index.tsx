import ReactDOM from 'react-dom/client';

import { MockSolution, mockApi } from '@graasp/apps-query-client';

import Root from './components/Root';
import {
  ENABLE_MOCK_API,
  MODEL_INFO_ENDPOINT,
  MODEL_SEARCH_ENDPOINT,
} from './config/settings';
import { MOCK_CONTEXT, buildDatabase } from './data/db';
import './index.css';

// setup mocked api for cypress or standalone app
if (ENABLE_MOCK_API) {
  mockApi(
    {
      externalUrls: [MODEL_SEARCH_ENDPOINT, `${MODEL_INFO_ENDPOINT}*`],
      dbName: window.Cypress ? 'graasp-app-cypress' : undefined,
      appContext: window.Cypress ? window.appContext : MOCK_CONTEXT,
      database: window.Cypress ? window.database : buildDatabase(),
    },
    MockSolution.MirageJS,
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Root />,
);
