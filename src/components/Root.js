import React from 'react';
import ReactGa from 'react-ga';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';
import 'react-toastify/dist/ReactToastify.css';
import i18nConfig from '../config/i18n';
import App from './App';
import {
  REACT_APP_GRAASP_APP_ID,
  REACT_APP_GRAASP_DEVELOPER_ID,
  REACT_APP_VERSION,
  REACT_APP_GOOGLE_ANALYTICS_ID,
} from '../config/env';

ReactGa.initialize(REACT_APP_GOOGLE_ANALYTICS_ID);
ReactGa.ga(
  'send',
  'pageview',
  `/${REACT_APP_GRAASP_DEVELOPER_ID}/${REACT_APP_GRAASP_APP_ID}/${REACT_APP_VERSION}/`
);

const theme = createMuiTheme({
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

const Root = () => (
  <MuiThemeProvider theme={theme}>
    <I18nextProvider i18n={i18nConfig}>
      <App />
      <ToastContainer />
    </I18nextProvider>
  </MuiThemeProvider>
);
export default Root;
