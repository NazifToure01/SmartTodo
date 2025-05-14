'use client';

import { useState } from 'react';
import { Task } from '@/types';
import { useTasks, useCategories } from '@/contexts/AppContext';
import { PRIORITY_COLORS, STATUS_COLORS, PRIORITY_LABELS, STATUS_LABELS } from '@/lib/constants';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { CategoryBadge } from '@/components/CategoryBadge';
import { EditTaskDialog } from '@/components/EditTaskDialog';

interface TaskCardProps {
  task: Task;
  compact?: boolean;
}

export function TaskCard({ task, compact = false }: TaskCardProps) {
  const { updateTask, deleteTask } = useTasks();
  const { categories } = useCategories();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const category = categories.find((c) => c.id === task.categoryId);
  
  const isCompleted = task.status === 'completed';
  
  const toggleStatus = () => {
    updateTask(task.id, {
      status: isCompleted ? 'pending' : 'completed',
    });
  };
  
  const getRelativeDate = () => {
    if (!task.dueDate) return null;
    
    const dueDate = new Date(task.dueDate);
    return formatDistanceToNow(dueDate, { addSuffix: true });
  };
  
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors',
          isCompleted && 'opacity-60'
        )}
      >
        <Checkbox checked={isCompleted} onCheckedChange={toggleStatus} />
        <span className={cn('flex-1', isCompleted && 'line-through text-muted-foreground')}>
          {task.title}
        </span>
        {category && <CategoryBadge category={category} mini />}
      </motion.div>
    );
  }
  
  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className={cn(
          'bg-card rounded-xl border shadow-sm p-4 flex flex-col gap-3',
          isCompleted && 'opacity-75'
        )}
      >
        <div className="flex items-start gap-3">
          <Checkbox 
            checked={isCompleted} 
            onCheckedChange={toggleStatus}
            className="mt-1" 
          />
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              'font-medium text-base leading-tight mb-1',
              isCompleted && 'line-through text-muted-foreground'
            )}>
              {task.title}
            </h3>
            {task.description && (
              <p className={cn(
                'text-sm text-muted-foreground line-clamp-2',
                isCompleted && 'line-through'
              )}>
                {task.description}
              </p>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteTask(task.id)} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center flex-wrap gap-2 mt-1">
          {category && (
            <CategoryBadge category={category} />
          )}
          
          <span className={cn(
            'text-xs px-2 py-0.5 rounded-full',
            PRIORITY_COLORS[task.priority]
          )}>
            {PRIORITY_LABELS[task.priority]}
          </span>
          
          <span className={cn(
            'text-xs px-2 py-0.5 rounded-full',
            STATUS_COLORS[task.status]
          )}>
            {STATUS_LABELS[task.status]}
          </span>
        </div>
        
        {task.dueDate && (
          <div className="text-xs text-muted-foreground mt-1">
            Due {getRelativeDate()}
          </div>
        )}
      </motion.div>
      
      <EditTaskDialog 
        task={task}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </>
  );
}