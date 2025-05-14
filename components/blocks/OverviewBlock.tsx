'use client';

import { useTasks } from '@/contexts/AppContext';
import { BentoBlock } from '@/components/blocks/BentoBlock';
import { BarChart, CheckSquare, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export function OverviewBlock() {
  const { tasks } = useTasks();
  
  const stats = {
    completed: tasks.filter(task => task.status === 'completed').length,
    inProgress: tasks.filter(task => task.status === 'in_progress').length,
    pending: tasks.filter(task => task.status === 'pending').length,
    total: tasks.length,
  };
  
  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;
  
  return (
    <BentoBlock 
      title="Overview" 
      icon={<BarChart className="h-5 w-5" />}
      className="col-span-full md:col-span-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          label="Completed" 
          value={stats.completed} 
          icon={<CheckSquare className="h-5 w-5 text-emerald-500" />}
        />
        
        <StatCard 
          label="In Progress" 
          value={stats.inProgress} 
          icon={<Clock className="h-5 w-5 text-amber-500" />}
        />
        
        <StatCard 
          label="Pending" 
          value={stats.pending} 
          icon={<Clock className="h-5 w-5 text-slate-500" />}
        />
      </div>
      
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">
            Completion Rate
          </span>
          <span className="text-sm font-medium">
            {completionRate}%
          </span>
        </div>
        <Progress value={completionRate} className="h-2" />
      </div>
    </BentoBlock>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center p-4 rounded-xl bg-muted/50',
      'border border-border/50'
    )}>
      <div className="mb-1">{icon}</div>
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}