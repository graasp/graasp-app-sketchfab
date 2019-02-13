import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import purple from '@material-ui/core/colors/purple';
import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';
import 'react-toastify/dist/ReactToastify.css';
import i18nConfig from '../config/i18n';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: pink,
    default: grey,
  },
  status: {
    danger: 'orange',
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
