'use client';

import { BentoBlock } from '@/components/blocks/BentoBlock';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { CalendarDays, ListTodo, Plus } from 'lucide-react';
import { CreateTaskDialog } from '@/components/CreateTaskDialog';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function QuickActionsBlock() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  
  const actions = [
    {
      label: 'New Task',
      icon: <Plus className="h-4 w-4" />,
      action: () => setIsCreateTaskOpen(true),
      color: 'bg-primary/10 text-primary',
    },
    {
      label: 'View Tasks',
      icon: <ListTodo className="h-4 w-4" />,
      href: '/tasks',
      color: 'bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20 dark:text-indigo-400',
    },
    {
      label: 'View Calendar',
      icon: <CalendarDays className="h-4 w-4" />,
      href: '/calendar',
      color: 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-400',
    },
  ];
  
  return (
    <>
      <BentoBlock 
        title="Quick Actions" 
        className="col-span-1"
      >
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action, index) => {
            const ActionButton = (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full"
              >
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left ${action.color}`}
                  onClick={action.action}
                >
                  <span className="flex items-center">
                    <span className="mr-2">{action.icon}</span>
                    {action.label}
                  </span>
                </Button>
              </motion.div>
            );
            
            if (action.href) {
              return (
                <Link key={index} href={action.href} className="w-full">
                  {ActionButton}
                </Link>
              );
            }
            
            return ActionButton;
          })}
        </div>
      </BentoBlock>
      
      <CreateTaskDialog
        open={isCreateTaskOpen}
        onOpenChange={setIsCreateTaskOpen}
      />
    </>
  );
}