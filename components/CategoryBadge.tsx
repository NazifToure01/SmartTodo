'use client';

import { Category } from '@/types';
import { cn } from '@/lib/utils';
import { DivideIcon as LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface CategoryBadgeProps {
  category: Category;
  count?: number;
  mini?: boolean;
}

export function CategoryBadge({ category, count, mini = false }: CategoryBadgeProps) {
  // Dynamically get the icon component
  const IconComponent = category.icon ? 
    (LucideIcons as Record<string, LucideIcon>)[category.icon] : 
    null;
  
  if (mini) {
    return (
      <div className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold text-foreground',
        category.color
      )}>
        {IconComponent && <IconComponent className="h-3 w-3" />}
        <span>{category.name.charAt(0).toUpperCase()}</span>
      </div>
    );
  }
  
  return (
    <div className={cn(
      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium text-foreground',
      category.color
    )}>
      {IconComponent && <IconComponent className="h-3.5 w-3.5" />}
      <span>{category.name}</span>
      {count !== undefined && (
        <span className="ml-1 rounded-full bg-black/10 dark:bg-white/20 px-1.5 text-xs">
          {count}
        </span>
      )}
    </div>
  );
}