import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../langs/en.json';
import fr from '../langs/fr.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  // debug only when not in production
  debug: process.env.NODE_ENV !== 'production',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
});

i18n.addResourceBundle('en', 'translation', en);
i18n.addResourceBundle('fr', 'translation', fr);

export default i18n;
