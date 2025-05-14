'use client';

import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { PageContainer } from "@/components/PageContainer"
import { PageHeader } from "@/components/PageHeader"
import { useLanguage } from "@/hooks/useLanguage"

export default function CalendarPage() {
  const { t } = useLanguage();
  
  return (
    <PageContainer>
      <PageHeader title={t('calendar.title')} />
      
      <Card className="p-6">
        <Calendar
          mode="single"
          className="rounded-md border"
        />
      </Card>
    </PageContainer>
  )
}