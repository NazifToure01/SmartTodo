'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { padding } from '@/lib/layout';

interface BentoBlockProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  heightClass?: string;
  paddingSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  noPadding?: boolean;
  noAnimation?: boolean;
}

export function BentoBlock({
  title,
  icon,
  children,
  className,
  heightClass = 'min-h-[200px]',
  paddingSize = 'md',
  noPadding = false,
  noAnimation = false,
}: BentoBlockProps) {
  // Map padding size to Tailwind classes
  const paddingClasses = {
    xs: 'p-2',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
    none: ''
  };

  const Component = noAnimation ? 'div' : motion.div;
  const animationProps = noAnimation ? {} : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  };

  return (
    <Component
      {...animationProps}
      className={cn(
        'bg-card rounded-2xl border shadow-sm overflow-hidden',
        !noPadding && paddingClasses[paddingSize],
        heightClass,
        className
      )}>
      {(title || icon) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="font-semibold text-lg">{title}</h3>}
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
      )}
      {children}
    </Component>
  );
}