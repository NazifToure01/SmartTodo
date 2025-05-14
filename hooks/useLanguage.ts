'use client';

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { languages, getLanguageDirection, languageNames } from '@/lib/i18n';
import { translations } from '@/lib/translations';

export function useLanguage() {
  const { i18n, t: originalT } = useTranslation();

  // Get current language
  const currentLanguage = i18n.language || 'en';
  
  // Get current direction
  const direction = getLanguageDirection(currentLanguage);
  
  // Enhanced translation function with fallback to embedded translations
  const t = (key: string, options?: any): string => {
    // Try to get translation from i18next
    const translation = originalT(key, options);
    
    // If the translation is the same as the key, it means it wasn't found
    // In that case, try to get it from our embedded translations
    if (translation === key) {
      // Split the key by dots to navigate the nested structure
      const keyParts = key.split('.');
      let result: any = translations[currentLanguage as keyof typeof translations];
      
      // Navigate through the nested structure
      for (const part of keyParts) {
        if (result && typeof result === 'object' && part in result) {
          result = result[part as keyof typeof result];
        } else {
          // If we can't find the translation, return the key
          return key;
        }
      }
      
      // If we found a string, return it
      if (typeof result === 'string') {
        return result;
      }
      
      // If result is not a string, return the key
      return key;
    }
    
    // Ensure we always return a string
    return typeof translation === 'string' ? translation : key;
  };
  
  // Change language function
  const changeLanguage = (lang: string) => {
    if (languages.includes(lang)) {
      i18n.changeLanguage(lang);
      // Save the language preference to localStorage
      localStorage.setItem('i18nextLng', lang);
    }
  };
  
  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', currentLanguage);
  }, [currentLanguage, direction]);
  
  return {
    currentLanguage,
    direction,
    changeLanguage,
    t,
    languages,
  };
}
