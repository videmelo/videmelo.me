import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Resources serão carregados dinamicamente via import() (code-splitting)
const loadLocale = async (lng: string) => {
   switch (lng) {
      case 'pt':
         return (await import('./locales/pt.json')).default;
      case 'en':
      default:
         return (await import('./locales/en.json')).default;
   }
};

// Plugin simples para lazy load dos recursos ao mudar de idioma
const backend = {
   type: 'backend' as const,
   init: () => {},
   read: async (language: string, _namespace: string, callback: (err: any, data: any) => void) => {
      try {
         const data = await loadLocale(language);
         callback(null, data);
      } catch (err) {
         callback(err, null);
      }
   },
};

i18n
   .use(backend as any)
   .use(LanguageDetector)
   .use(initReactI18next)
   .init({
      fallbackLng: 'en',
      supportedLngs: ['en', 'pt'],
      ns: ['translation'],
      defaultNS: 'translation',
      interpolation: { escapeValue: false },
      detection: {
         order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
         caches: ['localStorage'],
      },
      react: { useSuspense: true },
      load: 'currentOnly',
   });

export default i18n;
