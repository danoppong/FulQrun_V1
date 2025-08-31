'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AddLeadModal } from '@/components/modals/add-lead-modal'
import { Plus, Search, Filter } from 'lucide-react'

// Mock data for MVP demonstration
const leads = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@techcorp.com',
    company: 'TechCorp Inc',
    title: 'VP of Sales',
    source: 'Website',
    score: 85,
    status: 'qualified',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@innovate.com',
    company: 'Innovate Solutions',
    title: 'CTO',
    source: 'Referral',
    score: 92,
    status: 'contacted',
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@startupx.io',
    company: 'StartupX',
    title: 'Founder',
    source: 'Cold Outreach',
    score: 78,
    status: 'new',
    createdAt: '2024-01-13'
  }
]

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'qualified': return 'bg-green-100 text-green-800'
    case 'contacted': return 'bg-blue-100 text-blue-800'
    case 'new': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function LeadsPage() {
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false)
  const [leadsData, setLeadsData] = useState(leads)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch real leads data
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('/api/leads')
        if (response.ok) {
          const data = await response.json()
          // Transform API data to match UI format
          const transformedLeads = data.leads.map((lead: any) => ({
            id: lead.id,
            name: `${lead.first_name} ${lead.last_name}`,
            email: lead.email,
            company: lead.company_name,
            title: lead.title,
            source: lead.source,
            score: lead.score,
            status: lead.status,
            createdAt: new Date(lead.created_at).toISOString().split('T')[0]
          }))
          setLeadsData(transformedLeads)
        }
      } catch (error) {
        console.error('Error fetching leads:', error)
        // Keep mock data if API fails
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeads()
  }, [])

  const handleLeadAdded = async (newLead: {
    first_name: string
    last_name: string
    email: string
    company_name: string
    title: string
    source: string
    score: number
  }) => {
    try {
      // Send to API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      })

      if (response.ok) {
        const data = await response.json()
        // Add to local state for immediate UI update
        const lead = {
          id: data.lead.id,
          name: `${newLead.first_name} ${newLead.last_name}`,
          email: newLead.email,
          company: newLead.company_name,
          title: newLead.title,
          source: newLead.source,
          score: newLead.score,
          status: newLead.score >= 70 ? 'qualified' : newLead.score >= 40 ? 'contacted' : 'new',
          createdAt: new Date().toISOString().split('T')[0]
        }
        setLeadsData(prev => [lead, ...prev])
      }
    } catch (error) {
      console.error('Error adding lead:', error)
    }
  }
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leads</h1>
            <p className="text-muted-foreground">
              Manage and qualify your sales leads
            </p>
          </div>
          <Button onClick={() => setIsAddLeadModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search leads by name, company, or email..."
                  className="pl-9"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lead Scoring Overview */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+23 this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">High Score (80+)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">34</div>
              <p className="text-xs text-muted-foreground">22% of total</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Qualified</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">Ready for opportunities</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18%</div>
              <p className="text-xs text-muted-foreground">Lead to opportunity</p>
            </CardContent>
          </Card>
        </div>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>
              Your latest leads with scoring and qualification status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                    <p className="text-sm text-muted-foreground">Loading leads...</p>
                  </div>
                </div>
              ) : leadsData.length > 0 ? (
                leadsData.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">{lead.email}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{lead.company}</span>
                      <span>•</span>
                      <span>{lead.title}</span>
                      <span>•</span>
                      <span>Source: {lead.source}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`text-sm font-medium ${getScoreColor(lead.score)}`}>
                        Score: {lead.score}
                      </p>
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No leads found. Add your first lead to get started!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Add Lead Modal */}
        <AddLeadModal
          open={isAddLeadModalOpen}
          onOpenChange={setIsAddLeadModalOpen}
          onLeadAdded={handleLeadAdded}
        />
      </div>
    </DashboardLayout>
  )
}