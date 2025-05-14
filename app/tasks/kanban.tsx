'use client';

import { useTasks, useCategories } from '@/contexts/AppContext';
import { STATUS_LABELS } from '@/lib/constants';
import { TaskCard } from '@/components/TaskCard';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Task } from '@/types';

interface KanbanViewProps {
  filteredTasks: Task[];
}

export function KanbanView({ filteredTasks }: KanbanViewProps) {
  const { updateTask, reorderTasks } = useTasks();
  
  const columns = Object.entries(STATUS_LABELS).map(([status, label]) => ({
    id: status,
    title: label,
    tasks: filteredTasks.filter(task => task.status === status),
  }));
  
  const handleDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;
    
    // Dropped outside a valid drop area
    if (!destination) {
      return;
    }
    
    // No movement
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    
    const taskId = draggableId;
    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;
    
    // Status change (column change)
    if (sourceStatus !== destinationStatus) {
      updateTask(taskId, { status: destinationStatus as Task['status'] });
    }
    
    // Within the same column, reorder
    if (sourceStatus === destinationStatus) {
      const columnTasks = [...filteredTasks.filter(task => task.status === sourceStatus)];
      const [movedTask] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, movedTask);
      
      // Update positions
      const updatedTasks = columnTasks.map((task, index) => ({
        ...task,
        position: index,
      }));
      
      // Update all other tasks (maintain their existing state)
      const otherTasks = filteredTasks.filter(task => task.status !== sourceStatus);
      
      reorderTasks([...updatedTasks, ...otherTasks]);
    }
  };
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4 pt-2 min-h-[calc(100vh-200px)]">
        {columns.map(column => (
          <div key={column.id} className="flex-shrink-0 w-[320px]">
            <h3 className="font-medium mb-3 text-sm flex items-center">
              <div 
                className={cn(
                  'w-2 h-2 rounded-full mr-2',
                  column.id === 'completed' ? 'bg-emerald-500' : 
                  column.id === 'in_progress' ? 'bg-purple-500' : 'bg-slate-500'
                )}
              />
              {column.title}
              <span className="ml-2 text-xs text-muted-foreground">
                ({column.tasks.length})
              </span>
            </h3>
            
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-muted/50 rounded-xl p-2 min-h-[150px]"
                >
                  {column.tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-2"
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}