'use client';

import { ReactNode, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { getLanguageDirection } from '@/lib/i18n';
import { translations } from '@/lib/translations';

/**
 * Client-side I18nextProvider wrapper for Next.js
 */
export function ClientI18nProvider({ children }: { children: ReactNode }) {
  // State to track if i18n is initialized
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Initialize i18n on the client side
    if (!initialized) {
      i18n.on('initialized', () => {
        setInitialized(true);
      });

      // If i18n is already initialized
      if (i18n.isInitialized) {
        setInitialized(true);
      }
    }
  }, [initialized]);

  // Update HTML direction attribute when language changes
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      if (document) {
        const direction = getLanguageDirection(lng);
        document.documentElement.setAttribute('dir', direction);
        document.documentElement.setAttribute('lang', lng);
      }
    };

    // Set initial direction
    if (i18n.language) {
      handleLanguageChanged(i18n.language);
    }

    // Listen for language changes
    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  // For static export, we need to ensure we don't try to access window during build
  // but still provide translations for the initial render
  if (typeof window === 'undefined') {
    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
  }
  
  // Show nothing until i18n is initialized to prevent flash of untranslated content
  if (!initialized) {
    return null;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
