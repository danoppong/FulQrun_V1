import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings, Users, Building2, BarChart3, Shield } from 'lucide-react'

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">System Administration</h2>
        <p className="text-muted-foreground">Manage organization settings, users, and system configuration</p>
      </div>

      {/* System Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-green-600">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Data Storage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3GB</div>
            <p className="text-xs text-muted-foreground">of 10GB limit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5K</div>
            <p className="text-xs text-muted-foreground">this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              Security Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-green-600">Excellent</p>
          </CardContent>
        </Card>
      </div>

      {/* System Configuration */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              System Configuration
            </CardTitle>
            <CardDescription>Manage organization-wide settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">PEAK Methodology</span>
                <span className="text-sm text-green-600">✓ Enabled</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">MEDDPICC Qualification</span>
                <span className="text-sm text-green-600">✓ Enabled</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Microsoft Graph Sync</span>
                <span className="text-sm text-yellow-600">⚠ Configuration Needed</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">QuickBooks Integration</span>
                <span className="text-sm text-yellow-600">⚠ Configuration Needed</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Lead Scoring Rules</span>
                <span className="text-sm text-green-600">✓ 4 Active Rules</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="mr-2 h-5 w-5" />
              Organization Stats
            </CardTitle>
            <CardDescription>Overall organization performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Total Pipeline Value</span>
                <span className="text-sm font-medium">$2.45M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active Opportunities</span>
                <span className="text-sm font-medium">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Qualified Leads</span>
                <span className="text-sm font-medium">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total Contacts</span>
                <span className="text-sm font-medium">342</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Companies Tracked</span>
                <span className="text-sm font-medium">89</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Integration Health
          </CardTitle>
          <CardDescription>Status of external integrations and data sync</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 border rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Microsoft Graph</span>
                <span className="text-sm text-yellow-600">Setup Required</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Configure Microsoft 365 integration for email and calendar sync
              </p>
            </div>
            
            <div className="p-3 border rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">QuickBooks</span>
                <span className="text-sm text-yellow-600">Setup Required</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Connect QuickBooks for automated invoicing and payment tracking
              </p>
            </div>

            <div className="p-3 border rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Clerk Authentication</span>
                <span className="text-sm text-green-600">Active</span>
              </div>
              <p className="text-xs text-muted-foreground">
                User authentication and SSO working properly
              </p>
            </div>

            <div className="p-3 border rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Supabase Database</span>
                <span className="text-sm text-green-600">Active</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Database and real-time features operational
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}