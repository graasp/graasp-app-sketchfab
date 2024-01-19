import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../langs/en';
import fr from '../langs/fr';

i18n.use(initReactI18next).init({
  resources: {
    en,
    fr,
  },
  fallbackLng: 'en',
  // debug only when not in production
  debug: process.env.NODE_ENV !== 'production',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  useSuspense: true,
});

export default i18n;
