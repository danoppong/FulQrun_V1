import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function OpportunitiesPage() {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Opportunities</h1>
      <p className="text-muted-foreground mt-2">PEAK stages + MEDDPICC fields (MVP stub).</p>
    </main>
  )
}
