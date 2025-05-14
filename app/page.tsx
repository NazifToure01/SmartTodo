import { OverviewBlock } from '@/components/blocks/OverviewBlock';
import { TodayTasksBlock } from '@/components/blocks/TodayTasksBlock';
import { RecentTasksBlock } from '@/components/blocks/RecentTasksBlock';
import { CategoriesBlock } from '@/components/blocks/CategoriesBlock';
import { QuickActionsBlock } from '@/components/blocks/QuickActionsBlock';

export default function Home() {
  return (
    <div className="container pb-8">
      <div className="my-6">
        <h1 className="font-bold text-3xl mb-1">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your tasks and categories from one place
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <OverviewBlock />
        <TodayTasksBlock />
        <CategoriesBlock />
        <QuickActionsBlock />
        <RecentTasksBlock />
      </div>
    </div>
  );
}