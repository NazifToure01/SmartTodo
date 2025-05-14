import { Category } from '@/types';

export const PRIORITY_COLORS = {
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export const STATUS_COLORS = {
  pending: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
  in_progress: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};

export const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const STATUS_LABELS = {
  pending: 'To Do',
  in_progress: 'In Progress',
  completed: 'Completed',
};

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Work',
    color: 'bg-indigo-500 dark:bg-indigo-600',
    icon: 'Briefcase',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Personal',
    color: 'bg-emerald-500 dark:bg-emerald-600',
    icon: 'User',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Shopping',
    color: 'bg-pink-500 dark:bg-pink-600',
    icon: 'ShoppingBasket',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Health',
    color: 'bg-sky-500 dark:bg-sky-600',
    icon: 'Heartbeat',
    createdAt: new Date().toISOString(),
  },
];

export const CATEGORY_COLORS = [
  { name: 'Indigo', value: 'bg-indigo-500 dark:bg-indigo-600' },
  { name: 'Emerald', value: 'bg-emerald-500 dark:bg-emerald-600' },
  { name: 'Pink', value: 'bg-pink-500 dark:bg-pink-600' },
  { name: 'Sky', value: 'bg-sky-500 dark:bg-sky-600' },
  { name: 'Amber', value: 'bg-amber-500 dark:bg-amber-600' },
  { name: 'Violet', value: 'bg-violet-500 dark:bg-violet-600' },
  { name: 'Rose', value: 'bg-rose-500 dark:bg-rose-600' },
  { name: 'Teal', value: 'bg-teal-500 dark:bg-teal-600' },
];

export const CATEGORY_ICONS = [
  'Briefcase',
  'User',
  'ShoppingBasket',
  'Heartbeat',
  'Book',
  'Home',
  'Code',
  'Music',
  'Film',
  'Utensils',
  'Plane',
  'Calendar',
];