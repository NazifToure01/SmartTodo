'use client';

import { useTasks } from '@/contexts/AppContext';
import { TaskCard } from '@/components/TaskCard';
import { Task } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface ListViewProps {
  filteredTasks: Task[];
}

export function ListView({ filteredTasks }: ListViewProps) {
  return (
    <AnimatePresence>
      <div className="space-y-3 pt-2">
        {filteredTasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-muted-foreground"
          >
            No tasks match your filters
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence>
              {filteredTasks.map(task => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <TaskCard task={task} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}