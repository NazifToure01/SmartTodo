'use client';

import { OverviewBlock } from '@/components/blocks/OverviewBlock';
import { TodayTasksBlock } from '@/components/blocks/TodayTasksBlock';
import { RecentTasksBlock } from '@/components/blocks/RecentTasksBlock';
import { CategoriesBlock } from '@/components/blocks/CategoriesBlock';
import { QuickActionsBlock } from '@/components/blocks/QuickActionsBlock';
import { PageContainer } from '@/components/PageContainer';
import { GridLayout } from '@/components/GridLayout';
import { PageHeader } from '@/components/PageHeader';
import { useLanguage } from '@/hooks/useLanguage';

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <PageContainer>
      <PageHeader 
        title={t('dashboard.title')} 
        description={t('dashboard.description')} 
      />
      
      <GridLayout columns={{ default: 1, md: 3, lg: 4 }} gap="md">
        <OverviewBlock />
        <TodayTasksBlock />
        <CategoriesBlock />
        <QuickActionsBlock />
        <RecentTasksBlock />
      </GridLayout>
    </PageContainer>
  );
}