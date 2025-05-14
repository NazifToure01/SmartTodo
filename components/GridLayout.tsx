'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GridLayoutProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * GridLayout component for consistent grid layouts across the application
 */
export function GridLayout({
  children,
  className,
  columns = { default: 1, md: 2, lg: 3 },
  gap = 'md',
}: GridLayoutProps) {
  // Map gap sizes to Tailwind classes
  const gapClasses = {
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-10',
  };

  // Map columns to Tailwind grid-cols classes
  const getColsClass = (cols: number) => `grid-cols-${cols}`;

  return (
    <div
      className={cn(
        'grid',
        gapClasses[gap],
        getColsClass(columns.default),
        columns.sm && `sm:${getColsClass(columns.sm)}`,
        columns.md && `md:${getColsClass(columns.md)}`,
        columns.lg && `lg:${getColsClass(columns.lg)}`,
        columns.xl && `xl:${getColsClass(columns.xl)}`,
        className
      )}
    >
      {children}
    </div>
  );
}
