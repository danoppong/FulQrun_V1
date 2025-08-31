import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function AnalyticsPage() {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Analytics</h1>
      <p className="text-muted-foreground mt-2">Pipeline by stage, conversion rate (MVP stub).</p>
    </main>
  )
}
