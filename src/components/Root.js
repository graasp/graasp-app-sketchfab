import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18nConfig from '../config/i18n';
import App from './App';

const Root = () => (
  <I18nextProvider i18n={i18nConfig}>
    <App />
    <ToastContainer />
  </I18nextProvider>
);
export default Root;
