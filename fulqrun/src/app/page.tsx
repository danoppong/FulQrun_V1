import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function Home() {
  // Check if we're in demo mode (no Clerk keys)
  const hasValidClerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'your_clerk_publishable_key_here' &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'pk_test_demo_development_key' &&
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('demo') &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.length > 20

  // Only check for user if we have valid Clerk configuration
  if (hasValidClerkKey) {
    try {
      const user = await currentUser()
      if (user) {
        redirect('/dashboard')
      }
    } catch (error) {
      // If Clerk fails, continue to demo mode
      console.log('Clerk not configured, running in demo mode')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="flex min-h-screen items-center justify-center">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-6xl font-bold text-foreground mb-6">
            FulQrun
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The sales operations platform that embeds PEAK methodology and MEDDPICC qualification 
            directly into your workflow. Built for modern sales teams.
          </p>
          
          <div className="flex gap-4 justify-center mb-12">
            <Link href="/sign-up">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started Free
              </Button>
            </Link>
            <Link href="/demo-dashboard">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                View Live Demo
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-8 space-y-2">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-sm">
                Already have an account? Sign in
              </Button>
            </Link>
            <br />
            <Link href="/onboarding">
              <Button variant="ghost" className="text-xs text-muted-foreground">
                Test Onboarding Flow
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card>
              <CardHeader>
                <CardTitle>PEAK Methodology</CardTitle>
                <CardDescription>
                  Prospect → Engage → Acquire → Keep process built into every workflow
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>MEDDPICC Qualification</CardTitle>
                <CardDescription>
                  Structured qualification framework to improve deal quality and win rates
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Integrated Operations</CardTitle>
                <CardDescription>
                  Microsoft Graph, QuickBooks, and analytics in one unified platform
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
