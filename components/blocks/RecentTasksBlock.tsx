'use client';

import { useTasks } from '@/contexts/AppContext';
import { BentoBlock } from '@/components/blocks/BentoBlock';
import { History } from 'lucide-react';
import { TaskCard } from '@/components/TaskCard';

export function RecentTasksBlock() {
  const { tasks } = useTasks();
  
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);
  
  return (
    <BentoBlock 
      title="Recent Tasks" 
      icon={<History className="h-5 w-5" />}
      className="col-span-full md:col-span-2 lg:col-span-1"
    >
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {recentTasks.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No tasks yet. Create your first task to get started.
          </p>
        ) : (
          recentTasks.map(task => (
            <TaskCard key={task.id} task={task} compact />
          ))
        )}
      </div>
    </BentoBlock>
  );
}