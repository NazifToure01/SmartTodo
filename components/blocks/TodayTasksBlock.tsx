'use client';

import { useTasks } from '@/contexts/AppContext';
import { BentoBlock } from '@/components/blocks/BentoBlock';
import { CalendarCheck, Plus } from 'lucide-react';
import { TaskCard } from '@/components/TaskCard';
import { isToday, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { CreateTaskDialog } from '@/components/CreateTaskDialog';
import { useLanguage } from '@/hooks/useLanguage';

export function TodayTasksBlock() {
  const { tasks } = useTasks();
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const { t } = useLanguage();
  
  const todayTasks = tasks.filter(task => 
    task.dueDate && isToday(parseISO(task.dueDate))
  ).sort((a, b) => {
    // Sort by status (incomplete first)
    if (a.status === 'completed' && b.status !== 'completed') return 1;
    if (a.status !== 'completed' && b.status === 'completed') return -1;
    
    // Then sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
  
  return (
    <>
      <BentoBlock 
        title={t('todayTasks.title')} 
        icon={
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCreateTaskOpen(true)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        }
        className="col-span-full md:col-span-2"
      >
        {todayTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <CalendarCheck className="h-8 w-8 mb-2 opacity-60" />
            <p className="text-sm">{t('todayTasks.noTasks')}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              onClick={() => setIsCreateTaskOpen(true)}
            >
              <Plus className="h-4 w-4 rtl-mr mr-1" />
              {t('todayTasks.addTaskForToday')}
            </Button>
          </div>
        ) : (
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {todayTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </BentoBlock>
      
      <CreateTaskDialog
        open={isCreateTaskOpen}
        onOpenChange={setIsCreateTaskOpen}
      />
    </>
  );
}