import React from 'react';
import ReactGa from 'react-ga';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { withContext, withToken } from '@graasp/apps-query-client';
import { Loader } from '@graasp/ui';

import grey from '@material-ui/core/colors/grey';
import pink from '@material-ui/core/colors/pink';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

import {
  REACT_APP_GOOGLE_ANALYTICS_ID,
  REACT_APP_GRAASP_APP_ID,
  REACT_APP_GRAASP_DEVELOPER_ID,
  REACT_APP_VERSION,
} from '../config/env';
import i18nConfig from '../config/i18n';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  hooks,
  queryClient,
} from '../config/queryClient';
import App from './App';

ReactGa.initialize(REACT_APP_GOOGLE_ANALYTICS_ID);
ReactGa.ga(
  'send',
  'pageview',
  `/${REACT_APP_GRAASP_DEVELOPER_ID}/${REACT_APP_GRAASP_APP_ID}/${REACT_APP_VERSION}/`
);

const theme = createTheme({
  palette: {
    primary: {
      main: '#5050d2',
    },
    secondary: pink,
    default: grey,
    background: {
      paper: '#fff',
    },
  },
  status: {
    danger: 'orange',
  },
  typography: {
    useNextVariants: true,
  },
});

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
  onError: () => {
    console.log('An error occured while fetching the context.');
  },
});

const Root = () => (
  <MuiThemeProvider theme={theme}>
    <I18nextProvider i18n={i18nConfig}>
      <QueryClientProvider client={queryClient}>
        <AppWithContextAndToken />
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
      </QueryClientProvider>
      <ToastContainer />
    </I18nextProvider>
  </MuiThemeProvider>
);
export default Root;
