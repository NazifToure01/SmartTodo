import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"

export default function CalendarPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Calendar</h1>
      
      <Card className="p-6">
        <Calendar
          mode="single"
          className="rounded-md border"
        />
      </Card>
    </div>
  )
}