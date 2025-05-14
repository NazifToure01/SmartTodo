'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BentoBlockProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  heightClass?: string;
}

export function BentoBlock({
  title,
  icon,
  children,
  className,
  heightClass = 'min-h-[200px]',
}: BentoBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'bg-card rounded-2xl border shadow-sm p-6 overflow-hidden',
        heightClass,
        className
      )}
    >
      {(title || icon) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="font-semibold text-lg">{title}</h3>}
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
      )}
      {children}
    </motion.div>
  );
}