import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { TRANSLATIONS_EN } from './en/translations_en';
import { TRANSLATIONS_PL } from './pl/translations_pl';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: TRANSLATIONS_EN,
      },
      pl: {
        translation: TRANSLATIONS_PL,
      },
    },
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },

    react: {
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'b', 'i'],
    },
  });
