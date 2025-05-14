import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { translations } from './translations';

// Supported languages
export const languages = ['en', 'fr', 'ar'];
export const languageNames = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية'
};

// Direction based on language
export const getLanguageDirection = (language: string) => {
  return language === 'ar' ? 'rtl' : 'ltr';
};

// Initialize i18next
const i18nInstance = i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next);

// Only use HTTP backend in browser environment
if (typeof window !== 'undefined') {
  i18nInstance.use(Backend);
}

// Initialize i18next
i18nInstance.init({
    // Add embedded resources for immediate use
    resources: {
      en: { translation: translations.en },
      fr: { translation: translations.fr },
      ar: { translation: translations.ar },
    },
    fallbackLng: 'en',
    supportedLngs: languages,
    debug: process.env.NODE_ENV === 'development',
    
    // Backend configuration for loading translations
    backend: {
      // Make sure to load from the correct path in the public directory
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      crossDomain: true,
    },
    
    // Detection options
    detection: {
      // Order and from where user language should be detected
      order: ['localStorage', 'navigator'],
      
      // Cache user language on localStorage
      caches: ['localStorage'],
      
      // Keys to lookup language from
      lookupLocalStorage: 'i18nextLng',
    },
    
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
    
    // Default namespace used
    defaultNS: 'translation',
    
    // Preload languages
    preload: ['en'],
    
    // React options
    react: {
      useSuspense: true,
    },
  });

export default i18n;
