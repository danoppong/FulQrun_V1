import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Filter, Crown, Target } from 'lucide-react'

// Mock data for MVP demonstration
const contacts = [
  {
    id: '1',
    name: 'Sarah Williams',
    email: 'sarah.williams@acmecorp.com',
    title: 'Chief Financial Officer',
    company: 'Acme Corp',
    phone: '+1 (555) 123-4567',
    isChampion: false,
    isDecisionMaker: true,
    isEconomicBuyer: true,
    department: 'Finance',
    lastContact: '2024-01-14'
  },
  {
    id: '2',
    name: 'Mike Johnson',
    email: 'mike.j@acmecorp.com',
    title: 'VP of Sales',
    company: 'Acme Corp',
    phone: '+1 (555) 123-4568',
    isChampion: true,
    isDecisionMaker: false,
    isEconomicBuyer: false,
    department: 'Sales',
    lastContact: '2024-01-15'
  },
  {
    id: '3',
    name: 'John Smith',
    email: 'john.smith@techstart.com',
    title: 'CEO',
    company: 'TechStart Inc',
    phone: '+1 (555) 987-6543',
    isChampion: true,
    isDecisionMaker: true,
    isEconomicBuyer: true,
    department: 'Executive',
    lastContact: '2024-01-13'
  }
]

export default function ContactsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Contacts</h1>
            <p className="text-muted-foreground">
              Manage your contact relationships with MEDDPICC role identification
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </div>

        {/* Contact Overview */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">+18 this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Crown className="mr-1 h-3 w-3" />
                Champions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">28</div>
              <p className="text-xs text-muted-foreground">Internal advocates</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Target className="mr-1 h-3 w-3" />
                Decision Makers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">45</div>
              <p className="text-xs text-muted-foreground">Key stakeholders</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Economic Buyers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">23</div>
              <p className="text-xs text-muted-foreground">Budget controllers</p>
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
                  placeholder="Search contacts by name, company, or title..."
                  className="pl-9"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Champions
              </Button>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Decision Makers
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contacts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Directory</CardTitle>
            <CardDescription>
              Your contact network with MEDDPICC role identification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div>
                          <h3 className="font-semibold">{contact.name}</h3>
                          <p className="text-sm text-muted-foreground">{contact.title}</p>
                        </div>
                        
                        {/* MEDDPICC Role Badges */}
                        <div className="flex gap-1">
                          {contact.isChampion && (
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                              <Crown className="mr-1 h-3 w-3" />
                              Champion
                            </span>
                          )}
                          {contact.isDecisionMaker && (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                              <Target className="mr-1 h-3 w-3" />
                              Decision Maker
                            </span>
                          )}
                          {contact.isEconomicBuyer && (
                            <span className="inline-flex rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800">
                              Economic Buyer
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <p><strong>Company:</strong> {contact.company}</p>
                          <p><strong>Department:</strong> {contact.department}</p>
                        </div>
                        <div>
                          <p><strong>Email:</strong> {contact.email}</p>
                          <p><strong>Phone:</strong> {contact.phone}</p>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mt-2">
                        Last contact: {contact.lastContact}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Email
                      </Button>
                      <Button variant="outline" size="sm">
                        View Profile
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