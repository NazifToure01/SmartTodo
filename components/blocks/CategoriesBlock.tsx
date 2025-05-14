'use client';

import { useCategories, useTasks } from '@/contexts/AppContext';
import { BentoBlock } from '@/components/blocks/BentoBlock';
import { FolderKanban, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryBadge } from '@/components/CategoryBadge';
import Link from 'next/link';
import { useState } from 'react';
import { CreateCategoryDialog } from '@/components/CreateCategoryDialog';

export function CategoriesBlock() {
  const { categories } = useCategories();
  const { tasks } = useTasks();
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  
  const getCategoryTaskCount = (categoryId: string) => {
    return tasks.filter(task => task.categoryId === categoryId).length;
  };
  
  return (
    <>
      <BentoBlock 
        title="Categories" 
        icon={
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCreateCategoryOpen(true)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        }
        className="col-span-full md:col-span-2 lg:col-span-1"
      >
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <FolderKanban className="h-8 w-8 mb-2 opacity-60" />
            <p className="text-sm">No categories created yet</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              onClick={() => setIsCreateCategoryOpen(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Create Category
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {categories.map(category => {
              const count = getCategoryTaskCount(category.id);
              return (
                <Link
                  key={category.id}
                  href={`/tasks?category=${category.id}`}
                  className="flex items-center p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <CategoryBadge category={category} count={count} />
                </Link>
              );
            })}
          </div>
        )}
      </BentoBlock>
      
      <CreateCategoryDialog
        open={isCreateCategoryOpen}
        onOpenChange={setIsCreateCategoryOpen}
      />
    </>
  );
}