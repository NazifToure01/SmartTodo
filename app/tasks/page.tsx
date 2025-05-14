'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTasks, useCategories } from '@/contexts/AppContext';
import { PRIORITY_LABELS, STATUS_LABELS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Filter, 
  LayoutGrid, 
  LayoutList, 
  Plus, 
  Search, 
  SlidersHorizontal,
  X 
} from 'lucide-react';
import { CreateTaskDialog } from '@/components/CreateTaskDialog';
import { ListView } from './list';
import { KanbanView } from './kanban';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Task } from '@/types';
import { CategoryBadge } from '@/components/CategoryBadge';
import { motion } from 'framer-motion';

export default function TasksPage() {
  const { tasks } = useTasks();
  const { categories } = useCategories();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const categoryParam = searchParams.get('category');
  const queryParam = searchParams.get('q') || '';
  const viewParam = searchParams.get('view') || 'list';
  
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [view, setView] = useState<'list' | 'kanban'>(viewParam === 'kanban' ? 'kanban' : 'list');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    
    if (view === 'kanban') {
      params.set('view', 'kanban');
    }
    
    if (categoryFilter.length === 1) {
      params.set('category', categoryFilter[0]);
    }
    
    const newUrl = `/tasks${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newUrl, { scroll: false });
  }, [searchQuery, view, categoryFilter, router]);
  
  // Apply filters
  const filteredTasks = tasks
    .filter(task => {
      // Text search
      if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Status filter
      if (statusFilter.length > 0 && !statusFilter.includes(task.status)) {
        return false;
      }
      
      // Priority filter
      if (priorityFilter.length > 0 && !priorityFilter.includes(task.priority)) {
        return false;
      }
      
      // Category filter
      if (categoryFilter.length > 0) {
        if (!task.categoryId) return false;
        return categoryFilter.includes(task.categoryId);
      }
      
      return true;
    })
    .sort((a, b) => {
      // First sort by status (pending first, then in_progress, then completed)
      const statusOrder = { pending: 0, in_progress: 1, completed: 2 };
      const statusDiff = statusOrder[a.status] - statusOrder[b.status];
      if (statusDiff !== 0) return statusDiff;
      
      // Then by priority (high first)
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Then by position
      return a.position - b.position;
    });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/tasks?q=${searchQuery}`);
  };
  
  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter([]);
    setPriorityFilter([]);
    setCategoryFilter([]);
    router.push('/tasks');
  };
  
  const filtersActive = 
    searchQuery !== '' || 
    statusFilter.length > 0 || 
    priorityFilter.length > 0 || 
    categoryFilter.length > 0;
  
  return (
    <div className="container pb-8">
      <div className="my-6">
        <h1 className="font-bold text-3xl mb-1">Tasks</h1>
        <p className="text-muted-foreground">
          Manage and organize all your tasks
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex flex-1 gap-2">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="md:hidden">Search</Button>
          </form>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                Status
              </DropdownMenuLabel>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <DropdownMenuCheckboxItem
                  key={value}
                  checked={statusFilter.includes(value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setStatusFilter([...statusFilter, value]);
                    } else {
                      setStatusFilter(statusFilter.filter(item => item !== value));
                    }
                  }}
                >
                  {label}
                </DropdownMenuCheckboxItem>
              ))}
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                Priority
              </DropdownMenuLabel>
              {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                <DropdownMenuCheckboxItem
                  key={value}
                  checked={priorityFilter.includes(value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setPriorityFilter([...priorityFilter, value]);
                    } else {
                      setPriorityFilter(priorityFilter.filter(item => item !== value));
                    }
                  }}
                >
                  {label}
                </DropdownMenuCheckboxItem>
              ))}
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                Category
              </DropdownMenuLabel>
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category.id}
                  checked={categoryFilter.includes(category.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setCategoryFilter([...categoryFilter, category.id]);
                    } else {
                      setCategoryFilter(categoryFilter.filter(item => item !== category.id));
                    }
                  }}
                >
                  {category.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            className={view === 'list' ? 'bg-muted' : ''}
            onClick={() => setView('list')}
          >
            <LayoutList className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            className={view === 'kanban' ? 'bg-muted' : ''}
            onClick={() => setView('kanban')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="default" 
            className="gap-1 ml-2"
            onClick={() => setIsCreateTaskOpen(true)}
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Task</span>
          </Button>
        </div>
      </div>
      
      {filtersActive && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex flex-wrap gap-2 items-center mb-4"
        >
          <span className="text-sm text-muted-foreground flex items-center">
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            Active filters:
          </span>
          
          {categoryFilter.map(catId => {
            const category = categories.find(c => c.id === catId);
            if (!category) return null;
            return (
              <div key={catId} className="flex items-center">
                <CategoryBadge category={category} />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 ml-1"
                  onClick={() => setCategoryFilter(categoryFilter.filter(id => id !== catId))}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            );
          })}
          
          {(searchQuery || statusFilter.length > 0 || priorityFilter.length > 0) && (
            <Button
              variant="outline"
              size="sm"
              className="ml-auto"
              onClick={handleClearFilters}
            >
              Clear All
            </Button>
          )}
        </motion.div>
      )}
      
      {view === 'list' ? (
        <ListView filteredTasks={filteredTasks} />
      ) : (
        <KanbanView filteredTasks={filteredTasks} />
      )}
      
      <CreateTaskDialog
        open={isCreateTaskOpen}
        onOpenChange={setIsCreateTaskOpen}
      />
    </div>
  );
}