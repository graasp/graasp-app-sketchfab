import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { WithLocalContext, WithTokenContext } from '@graasp/apps-query-client';
import { Loader, theme } from '@graasp/ui';

import { CssBaseline, ThemeProvider } from '@mui/material';

import i18nConfig from '../config/i18n';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  hooks,
  queryClient,
} from '../config/queryClient';
import { MOCK_CONTEXT } from '../data/db';
import { showErrorToast } from '../utils/toasts';
import App from './App';

const Root = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <I18nextProvider i18n={i18nConfig}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <WithLocalContext
          LoadingComponent={<Loader />}
          useGetLocalContext={hooks.useGetLocalContext}
          useAutoResize={hooks.useAutoResize}
          onError={() => {
            showErrorToast('An error occured while fetching the context.');
          }}
          defaultValue={window.Cypress ? window.appContext : MOCK_CONTEXT}
        >
          <WithTokenContext
            LoadingComponent={<Loader />}
            useAuthToken={hooks.useAuthToken}
            onError={() => {
              showErrorToast('An error occured while requesting the token.');
            }}
          >
            <App />
          </WithTokenContext>
        </WithLocalContext>
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
      </QueryClientProvider>
      <ToastContainer />
    </I18nextProvider>
  </ThemeProvider>
);
export default Root;
