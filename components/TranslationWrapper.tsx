'use client';

import React, { ReactNode } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

interface TranslationProps {
  children: (t: (key: string) => string) => ReactNode;
}

/**
 * A wrapper component that provides translation functionality to server components
 */
export function TranslationWrapper({ children }: TranslationProps) {
  const { t } = useLanguage();
  return <>{children(t)}</>;
}
