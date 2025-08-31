import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function Home() {

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
            <Link href="/demo-dashboard">
              <Button size="lg" className="text-lg px-8 py-6">
                View Live Demo
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Feature Overview
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
