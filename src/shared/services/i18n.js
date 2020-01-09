import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
// import LanguageDetector from 'i18next-browser-languagedetector';
//import Cache from 'i18next-localstorage-cache';
import LocalStorageBackend from 'i18next-localstorage-backend' // primary use cache
import XHR from 'i18next-xhr-backend' // fallback xhr load

import { initReactI18next } from 'react-i18next'

i18n
  .use(Backend)
  // .use(Cache)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'pt-BR', // Remove when implementng a new language
    backend: {
      backends: [LocalStorageBackend, XHR],
      backendOptions: [
        {},
        {
          // loadPath: '/public/locales/{{lng}}/{{ns}}.json'
          loadPath: '/public/locales/pt-BR/translation.json', // Remove when implementng a new language
        },
      ],
    },
    fallbackLng: 'pt-BR',
    debug: false, // process.env.NODE_ENV === 'development',
    // ns: ["translations"],
    // defaultNS: "translations",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      wait: true,
    },
  })

export default i18n
