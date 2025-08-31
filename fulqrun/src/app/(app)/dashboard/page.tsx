import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const { userId } = auth()
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-muted-foreground mt-2">Welcome to FulQrun. Role-based views coming soon.</p>
    </main>
  )
}
