import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import EN from "./langs/EN.ts";
import FA from "./langs/FA.ts";


const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fa: {
        translation: FA
      },
      en: {
        translation: EN
      }
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
