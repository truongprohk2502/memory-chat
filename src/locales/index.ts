import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import vi from './vi';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  debug: process.env.NODE_ENV === 'development',
});

export default i18n;
