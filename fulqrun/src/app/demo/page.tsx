'use client'


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DollarSign, Target, TrendingUp, Users, Crown, CheckCircle } from 'lucide-react'
import Link from 'next/link'

// Demo data for preview
const demoStats = [
  {
    title: "Total Pipeline Value",
    value: "$2,450,000",
    change: "+12.5%",
    icon: DollarSign,
    description: "vs last quarter"
  },
  {
    title: "Active Opportunities",
    value: "47",
    change: "+8",
    icon: Target,
    description: "this month"
  },
  {
    title: "Qualified Leads",
    value: "156",
    change: "+23%",
    icon: Users,
    description: "vs last month"
  },
  {
    title: "Win Rate",
    value: "32%",
    change: "+4.2%",
    icon: TrendingUp,
    description: "last 90 days"
  }
]

const demoOpportunities = [
  {
    company: "Acme Corp",
    value: "$150,000",
    stage: "Proposal",
    probability: "60%",
    meddpiccScore: 85,
    peakStage: "Engage"
  },
  {
    company: "TechStart Inc",
    value: "$75,000",
    stage: "Negotiation", 
    probability: "80%",
    meddpiccScore: 92,
    peakStage: "Acquire"
  },
  {
    company: "Global Systems",
    value: "$300,000",
    stage: "Needs Analysis",
    probability: "40%",
    meddpiccScore: 67,
    peakStage: "Engage"
  }
]

const demoLeads = [
  {
    name: "John Smith",
    company: "TechCorp Inc",
    title: "VP of Sales",
    score: 85,
    quality: "Hot"
  },
  {
    name: "Sarah Johnson", 
    company: "Innovate Solutions",
    title: "CTO",
    score: 92,
    quality: "Hot"
  },
  {
    name: "Mike Chen",
    company: "StartupX",
    title: "Founder",
    score: 78,
    quality: "Warm"
  }
]

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Demo Header */}
      <div className="bg-primary text-primary-foreground p-4 text-center">
        <h1 className="text-2xl font-bold">FulQrun Sales Operations Platform - Live Demo</h1>
        <p className="text-sm opacity-90">Experience the complete PEAK + MEDDPICC embedded sales workflow</p>
      </div>

      <div className="container mx-auto p-6 space-y-8">
        {/* Overview Stats */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Sales Performance Overview</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {demoStats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.change}</span> {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* PEAK Process Demo */}
        <div>
          <h2 className="text-2xl font-bold mb-4">PEAK Methodology in Action</h2>
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Prospect</CardTitle>
                <CardDescription>Lead identification & qualification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">23</div>
                <p className="text-sm text-muted-foreground">Active prospects</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Engage</CardTitle>
                <CardDescription>Needs analysis & relationship building</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">18</div>
                <p className="text-sm text-muted-foreground">In engagement</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Acquire</CardTitle>
                <CardDescription>Proposal & deal closure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">6</div>
                <p className="text-sm text-muted-foreground">Ready to close</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Keep</CardTitle>
                <CardDescription>Customer success & expansion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">28</div>
                <p className="text-sm text-muted-foreground">Active customers</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Live Opportunities with MEDDPICC */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Opportunities with MEDDPICC Qualification</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {demoOpportunities.map((opp, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{opp.company}</h3>
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            opp.peakStage === 'Engage' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            PEAK: {opp.peakStage}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div>
                            <p><strong>Value:</strong> {opp.value}</p>
                            <p><strong>Stage:</strong> {opp.stage}</p>
                          </div>
                          <div>
                            <p><strong>Probability:</strong> {opp.probability}</p>
                            <p><strong>MEDDPICC Score:</strong> <span className={`font-medium ${
                              opp.meddpiccScore >= 80 ? 'text-green-600' : 'text-yellow-600'
                            }`}>{opp.meddpiccScore}%</span></p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {opp.meddpiccScore >= 80 && <CheckCircle className="h-5 w-5 text-green-600" />}
                        {opp.meddpiccScore >= 85 && <Crown className="h-5 w-5 text-yellow-500" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lead Scoring Demo */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Intelligent Lead Scoring</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {demoLeads.map((lead, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">{lead.company} • {lead.title}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          lead.score >= 80 ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          Score: {lead.score}
                        </p>
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          lead.quality === 'Hot' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {lead.quality}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Highlights */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Lead Scoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Automatic lead qualification with configurable scoring rules and instant feedback.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>MEDDPICC Qualification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Structured opportunity qualification with completion tracking and gap analysis.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>PEAK Process Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Prospect → Engage → Acquire → Keep methodology built into every workflow.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Complete activity tracking with email, call, meeting, and task management.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Global Search</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Intelligent search across all records with real-time suggestions and navigation.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Role-based Dashboards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Customized views for sales reps, managers, and administrators.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Experience FulQrun?</h2>
          <p className="text-muted-foreground mb-6">
            This is a preview of the complete sales operations platform. 
            Set up authentication to access the full interactive experience.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="https://github.com/danoppong/FulQrun_V1">
              <Button variant="outline">
                View Source Code
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button>
                Try Interactive Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}