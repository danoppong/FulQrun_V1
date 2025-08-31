import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function ContactsPage() {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Contacts</h1>
      <p className="text-muted-foreground mt-2">Light CRM for contacts (MVP stub).</p>
    </main>
  )
}
