'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CheckCircle, LayoutDashboard, List, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreateTaskDialog } from '@/components/CreateTaskDialog';
import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function Header() {
  const pathname = usePathname();
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const { t } = useLanguage();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl hidden sm:inline-block">{t('app.name')}</span>
          </Link>
          
          <nav className="ml-6 hidden md:flex items-center space-x-4">
            <Link 
              href="/" 
              className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <LayoutDashboard className="h-4 w-4 rtl-mr mr-1" />
              {t('nav.dashboard')}
            </Link>
            <Link 
              href="/tasks" 
              className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/tasks' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <List className="h-4 w-4 rtl-mr mr-1" />
              {t('nav.tasks')}
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="default" 
            size="sm" 
            className="hidden sm:flex" 
            onClick={() => setIsCreateTaskOpen(true)}
          >
            <Plus className="h-4 w-4 rtl-mr mr-1" />
            {t('tasks.newTask')}
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="sm:hidden" 
            onClick={() => setIsCreateTaskOpen(true)}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
      
      <CreateTaskDialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen} />
    </header>
  );
}