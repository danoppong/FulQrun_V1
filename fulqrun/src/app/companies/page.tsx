import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Filter, Building2, Users } from 'lucide-react'

// Mock data for MVP demonstration
const companies = [
  {
    id: '1',
    name: 'Acme Corp',
    domain: 'acmecorp.com',
    industry: 'Technology',
    employees: 1200,
    revenue: 50000000,
    location: 'San Francisco, CA',
    type: 'prospect',
    opportunities: 2,
    contacts: 5,
    lastActivity: '2024-01-15'
  },
  {
    id: '2',
    name: 'TechStart Inc',
    domain: 'techstart.com',
    industry: 'Software',
    employees: 85,
    revenue: 8500000,
    location: 'Austin, TX',
    type: 'customer',
    opportunities: 1,
    contacts: 3,
    lastActivity: '2024-01-14'
  },
  {
    id: '3',
    name: 'Global Systems',
    domain: 'globalsys.com',
    industry: 'Manufacturing',
    employees: 5000,
    revenue: 250000000,
    location: 'Chicago, IL',
    type: 'prospect',
    opportunities: 3,
    contacts: 8,
    lastActivity: '2024-01-13'
  }
]

const getCompanyTypeColor = (type: string) => {
  switch (type) {
    case 'customer': return 'bg-green-100 text-green-800'
    case 'prospect': return 'bg-blue-100 text-blue-800'
    case 'partner': return 'bg-purple-100 text-purple-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const formatRevenue = (revenue: number) => {
  if (revenue >= 1000000) {
    return `$${(revenue / 1000000).toFixed(1)}M`
  }
  if (revenue >= 1000) {
    return `$${(revenue / 1000).toFixed(0)}K`
  }
  return `$${revenue.toLocaleString()}`
}

export default function CompaniesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Companies</h1>
            <p className="text-muted-foreground">
              Manage your company relationships and account information
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Company
          </Button>
        </div>

        {/* Company Overview */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Building2 className="mr-2 h-4 w-4" />
                Total Companies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">+7 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Prospects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">34</div>
              <p className="text-xs text-muted-foreground">In sales process</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">28</div>
              <p className="text-xs text-muted-foreground">Active accounts</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total ARR</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3.2M</div>
              <p className="text-xs text-muted-foreground">From customers</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search companies by name, domain, or industry..."
                  className="pl-9"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Industry
              </Button>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Company Size
              </Button>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Type
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Companies Table */}
        <Card>
          <CardHeader>
            <CardTitle>Company Directory</CardTitle>
            <CardDescription>
              Your company accounts with relationship and opportunity tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {companies.map((company) => (
                <div key={company.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div>
                          <h3 className="font-semibold flex items-center gap-2">
                            {company.name}
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getCompanyTypeColor(company.type)}`}>
                              {company.type}
                            </span>
                          </h3>
                          <p className="text-sm text-muted-foreground">{company.domain}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div>
                          <p><strong>Industry:</strong> {company.industry}</p>
                          <p><strong>Location:</strong> {company.location}</p>
                        </div>
                        <div>
                          <p><strong>Employees:</strong> {company.employees.toLocaleString()}</p>
                          <p><strong>Revenue:</strong> {formatRevenue(company.revenue)}</p>
                        </div>
                        <div>
                          <p><strong>Opportunities:</strong> {company.opportunities}</p>
                          <p><strong>Contacts:</strong> {company.contacts}</p>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mt-2">
                        Last activity: {company.lastActivity}
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Users className="mr-1 h-3 w-3" />
                          Contacts ({company.contacts})
                        </Button>
                        <Button variant="outline" size="sm">
                          Opportunities ({company.opportunities})
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        View Company Profile
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}