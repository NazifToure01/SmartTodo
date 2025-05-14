'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none';
}

/**
 * PageContainer component that provides consistent margins and centering for page content
 */
export function PageContainer({ 
  children, 
  className,
  fullWidth = false,
  noPadding = false,
  maxWidth = 'none'
}: PageContainerProps) {
  // Map maxWidth to Tailwind classes
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
    none: ''
  };

  return (
    <div className={cn(
      'container',
      !noPadding && 'pb-8',
      fullWidth ? 'max-w-full' : '',
      maxWidth !== 'none' && maxWidthClasses[maxWidth],
      className
    )}>
      {children}
    </div>
  );
}
