import { CssBaseline, ThemeProvider } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { withContext, withToken } from '@graasp/apps-query-client';
import { Loader, theme } from '@graasp/ui';

import i18nConfig from '../config/i18n';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  hooks,
  queryClient,
} from '../config/queryClient';
import App from './App';

const AppWithContext = withToken(App, {
  LoadingComponent: <Loader />,
  useAuthToken: hooks.useAuthToken,
  onError: () => {
    console.log('An error occured while requesting the token.');
  },
});

const AppWithContextAndToken = withContext(AppWithContext, {
  LoadingComponent: <Loader />,
  useGetLocalContext: hooks.useGetLocalContext,
  useAutoResize: hooks.useAutoResize,
  onError: () => {
    console.log('An error occured while fetching the context.');
  },
});

const Root = () => (
  <ThemeProvider theme={theme}>
    <I18nextProvider i18n={i18nConfig}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <AppWithContextAndToken />
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
      </QueryClientProvider>
      <ToastContainer />
    </I18nextProvider>
  </ThemeProvider>
);
export default Root;
