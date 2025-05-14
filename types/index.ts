export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  categoryId: string | null;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface AppState {
  tasks: Task[];
  categories: Category[];
  theme: 'light' | 'dark';
}

export type Action =
  | { type: 'CREATE_TASK'; payload: Partial<Task> }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<Task> } }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'CREATE_CATEGORY'; payload: Partial<Category> }
  | { type: 'UPDATE_CATEGORY'; payload: { id: string; updates: Partial<Category> } }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'REORDER_TASKS'; payload: Task[] }
  | { type: 'LOAD_STATE'; payload: AppState };