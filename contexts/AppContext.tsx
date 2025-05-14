'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, Action, Task, Category } from '@/types';
import { DEFAULT_CATEGORIES } from '@/lib/constants';

const initialState: AppState = {
  tasks: [],
  categories: DEFAULT_CATEGORIES,
  theme: 'light',
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'CREATE_TASK': {
      const newTask = {
        id: crypto.randomUUID(),
        categoryId: null,
        status: 'pending' as const,
        priority: 'medium' as const,
        position: state.tasks.length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...action.payload,
      } as Task;
      
      return { ...state, tasks: [...state.tasks, newTask] };
    }
    
    case 'UPDATE_TASK': {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : task
        ),
      };
    }
    
    case 'DELETE_TASK': {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    }
    
    case 'CREATE_CATEGORY': {
      const newCategory = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...action.payload,
      } as Category;
      
      return { ...state, categories: [...state.categories, newCategory] };
    }
    
    case 'UPDATE_CATEGORY': {
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.id
            ? { ...category, ...action.payload.updates }
            : category
        ),
      };
    }
    
    case 'DELETE_CATEGORY': {
      // When deleting a category, set categoryId to null for affected tasks
      const updatedTasks = state.tasks.map((task) => 
        task.categoryId === action.payload 
          ? { ...task, categoryId: null, updatedAt: new Date().toISOString() } 
          : task
      );
      
      return {
        ...state,
        categories: state.categories.filter((category) => category.id !== action.payload),
        tasks: updatedTasks,
      };
    }
    
    case 'SET_THEME': {
      return { ...state, theme: action.payload };
    }
    
    case 'REORDER_TASKS': {
      return { ...state, tasks: action.payload };
    }
    
    case 'LOAD_STATE': {
      return action.payload;
    }
    
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('bento-todo-state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        console.error('Failed to parse saved state:', error);
      }
    }
  }, []);
  
  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem('bento-todo-state', JSON.stringify(state));
  }, [state]);
  
  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

// Custom hooks for easier usage
export function useTasks() {
  const { state, dispatch } = useApp();
  
  return {
    tasks: state.tasks,
    createTask: (task: Partial<Task>) => dispatch({ type: 'CREATE_TASK', payload: task }),
    updateTask: (id: string, updates: Partial<Task>) => 
      dispatch({ type: 'UPDATE_TASK', payload: { id, updates } }),
    deleteTask: (id: string) => dispatch({ type: 'DELETE_TASK', payload: id }),
    reorderTasks: (tasks: Task[]) => dispatch({ type: 'REORDER_TASKS', payload: tasks }),
  };
}

export function useCategories() {
  const { state, dispatch } = useApp();
  
  return {
    categories: state.categories,
    createCategory: (category: Partial<Category>) => 
      dispatch({ type: 'CREATE_CATEGORY', payload: category }),
    updateCategory: (id: string, updates: Partial<Category>) => 
      dispatch({ type: 'UPDATE_CATEGORY', payload: { id, updates } }),
    deleteCategory: (id: string) => dispatch({ type: 'DELETE_CATEGORY', payload: id }),
  };
}

export function useTheme() {
  const { state, dispatch } = useApp();
  
  return {
    theme: state.theme,
    setTheme: (theme: 'light' | 'dark') => dispatch({ type: 'SET_THEME', payload: theme }),
    toggleTheme: () => 
      dispatch({ type: 'SET_THEME', payload: state.theme === 'light' ? 'dark' : 'light' }),
  };
}