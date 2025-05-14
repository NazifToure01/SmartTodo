'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

/**
 * PageHeader component for consistent page headers across the application
 */
export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  const { t } = useLanguage();
  return (
    <div className={cn('flex flex-col sm:flex-row justify-between items-start sm:items-center my-6', className)}>
      <div>
        <h1 className="font-bold text-3xl mb-1">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && (
        <div className="mt-4 sm:mt-0 flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
