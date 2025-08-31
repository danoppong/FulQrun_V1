import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function CompaniesPage() {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Companies</h1>
      <p className="text-muted-foreground mt-2">Manage accounts/companies (MVP stub).</p>
    </main>
  )
}
