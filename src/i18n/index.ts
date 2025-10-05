import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

if (!i18n.isInitialized) {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      supportedLngs: ['en','zh'],
      load: 'languageOnly',                 // en-US -> en
      nonExplicitSupportedLngs: true,       // 支持模糊匹配
      backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
      ns: ['common'],
      defaultNS: 'common',
      interpolation: { escapeValue: false },
      detection: {
        order: ['querystring','path','localStorage','navigator','htmlTag'],
        caches: ['localStorage'],           // 记住用户选择
      },
      react: { useSuspense: false },
    });
}

export default i18n;