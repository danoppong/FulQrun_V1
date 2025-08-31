'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Settings, 
  Users, 
  Building2, 
  Target, 
  Mail, 
  Calculator,
  Shield,
  Bell,
  Database,
  Save,
  Plus,
  Trash2,
  Palette
} from 'lucide-react'
import { useTheme } from '@/components/theme/theme-provider'

interface ScoringRule {
  id: string
  name: string
  field: string
  operator: string
  value: string
  points: number
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('organization')
  const [isLoading, setIsLoading] = useState(false)
  const { theme, setTheme } = useTheme()
  
  // Organization settings
  const [orgSettings, setOrgSettings] = useState({
    name: 'Acme Sales Organization',
    domain: 'acme.com',
    industry: 'Technology',
    size: 'medium',
    headquarters: 'San Francisco, CA'
  })

  // Lead scoring rules
  const [scoringRules, setScoringRules] = useState<ScoringRule[]>([
    { id: '1', name: 'CEO Title', field: 'title', operator: 'contains', value: 'CEO', points: 30 },
    { id: '2', name: 'Large Company', field: 'company_employees', operator: 'greater_than', value: '1000', points: 25 },
    { id: '3', name: 'Referral Source', field: 'source', operator: 'equals', value: 'Referral', points: 25 }
  ])

  // Integration settings
  const [integrationSettings, setIntegrationSettings] = useState({
    microsoftGraph: {
      enabled: false,
      clientId: '',
      tenantId: ''
    },
    quickbooks: {
      enabled: false,
      clientId: '',
      sandboxMode: true
    }
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    leadAssignments: true,
    opportunityUpdates: true,
    dealClosures: true,
    weeklyReports: true
  })

  const handleSaveSettings = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Settings saved:', { orgSettings, scoringRules, integrationSettings, notificationSettings })
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addScoringRule = () => {
    const newRule: ScoringRule = {
      id: Date.now().toString(),
      name: 'New Rule',
      field: 'title',
      operator: 'contains',
      value: '',
      points: 10
    }
    setScoringRules(prev => [...prev, newRule])
  }

  const updateScoringRule = (id: string, updates: Partial<ScoringRule>) => {
    setScoringRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, ...updates } : rule
    ))
  }

  const deleteScoringRule = (id: string) => {
    setScoringRules(prev => prev.filter(rule => rule.id !== id))
  }

  const tabs = [
    { id: 'organization', label: 'Organization', icon: Building2 },
    { id: 'users', label: 'Users & Roles', icon: Users },
    { id: 'scoring', label: 'Lead Scoring', icon: Target },
    { id: 'integrations', label: 'Integrations', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage your organization settings and configuration
          </p>
        </div>

        <div className="flex gap-6">
          {/* Settings Navigation */}
          <div className="w-64 space-y-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            {activeTab === 'organization' && (
              <Card>
                <CardHeader>
                  <CardTitle>Organization Settings</CardTitle>
                  <CardDescription>
                    Configure your organization information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="org-name">Organization Name</Label>
                      <Input
                        id="org-name"
                        value={orgSettings.name}
                        onChange={(e) => setOrgSettings(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="org-domain">Domain</Label>
                      <Input
                        id="org-domain"
                        value={orgSettings.domain}
                        onChange={(e) => setOrgSettings(prev => ({ ...prev, domain: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="org-industry">Industry</Label>
                      <select
                        id="org-industry"
                        value={orgSettings.industry}
                        onChange={(e) => setOrgSettings(prev => ({ ...prev, industry: e.target.value }))}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="Technology">Technology</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Finance">Finance</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Retail">Retail</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="org-size">Organization Size</Label>
                      <select
                        id="org-size"
                        value={orgSettings.size}
                        onChange={(e) => setOrgSettings(prev => ({ ...prev, size: e.target.value }))}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="startup">Startup (1-10)</option>
                        <option value="small">Small (11-50)</option>
                        <option value="medium">Medium (51-250)</option>
                        <option value="large">Large (251-1000)</option>
                        <option value="enterprise">Enterprise (1000+)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="org-headquarters">Headquarters Location</Label>
                    <Input
                      id="org-headquarters"
                      value={orgSettings.headquarters}
                      onChange={(e) => setOrgSettings(prev => ({ ...prev, headquarters: e.target.value }))}
                      placeholder="City, State/Country"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'users' && (
              <Card>
                <CardHeader>
                  <CardTitle>Users & Roles</CardTitle>
                  <CardDescription>
                    Manage user access and role assignments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Team Members</h3>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Invite User
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-sm text-muted-foreground">john@acme.com</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                            Admin
                          </span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">Sarah Johnson</p>
                          <p className="text-sm text-muted-foreground">sarah@acme.com</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                            Manager
                          </span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">Mike Chen</p>
                          <p className="text-sm text-muted-foreground">mike@acme.com</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                            Rep
                          </span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'scoring' && (
              <Card>
                <CardHeader>
                  <CardTitle>Lead Scoring Rules</CardTitle>
                  <CardDescription>
                    Configure automatic lead scoring based on lead attributes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Scoring Rules</h3>
                      <Button onClick={addScoringRule}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Rule
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {scoringRules.map((rule) => (
                        <div key={rule.id} className="p-4 border rounded-lg">
                          <div className="grid grid-cols-6 gap-3 items-center">
                            <Input
                              placeholder="Rule Name"
                              value={rule.name}
                              onChange={(e) => updateScoringRule(rule.id, { name: e.target.value })}
                            />
                            <select
                              value={rule.field}
                              onChange={(e) => updateScoringRule(rule.id, { field: e.target.value })}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                              <option value="title">Job Title</option>
                              <option value="company_name">Company</option>
                              <option value="source">Lead Source</option>
                              <option value="company_employees">Company Size</option>
                            </select>
                            <select
                              value={rule.operator}
                              onChange={(e) => updateScoringRule(rule.id, { operator: e.target.value })}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                              <option value="equals">Equals</option>
                              <option value="contains">Contains</option>
                              <option value="greater_than">Greater Than</option>
                              <option value="less_than">Less Than</option>
                            </select>
                            <Input
                              placeholder="Value"
                              value={rule.value}
                              onChange={(e) => updateScoringRule(rule.id, { value: e.target.value })}
                            />
                            <Input
                              type="number"
                              placeholder="Points"
                              value={rule.points}
                              onChange={(e) => updateScoringRule(rule.id, { points: parseInt(e.target.value) || 0 })}
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => deleteScoringRule(rule.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Mail className="mr-2 h-5 w-5" />
                      Microsoft Graph Integration
                    </CardTitle>
                    <CardDescription>
                      Connect with Microsoft 365 for email and calendar sync
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Enable Microsoft Graph Integration</span>
                      <input
                        type="checkbox"
                        checked={integrationSettings.microsoftGraph.enabled}
                        onChange={(e) => setIntegrationSettings(prev => ({
                          ...prev,
                          microsoftGraph: { ...prev.microsoftGraph, enabled: e.target.checked }
                        }))}
                        className="h-4 w-4"
                      />
                    </div>
                    
                    {integrationSettings.microsoftGraph.enabled && (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="ms-client-id">Application (Client) ID</Label>
                          <Input
                            id="ms-client-id"
                            value={integrationSettings.microsoftGraph.clientId}
                            onChange={(e) => setIntegrationSettings(prev => ({
                              ...prev,
                              microsoftGraph: { ...prev.microsoftGraph, clientId: e.target.value }
                            }))}
                            placeholder="Enter your Microsoft App Client ID"
                          />
                        </div>
                        <div>
                          <Label htmlFor="ms-tenant-id">Directory (Tenant) ID</Label>
                          <Input
                            id="ms-tenant-id"
                            value={integrationSettings.microsoftGraph.tenantId}
                            onChange={(e) => setIntegrationSettings(prev => ({
                              ...prev,
                              microsoftGraph: { ...prev.microsoftGraph, tenantId: e.target.value }
                            }))}
                            placeholder="Enter your Microsoft Tenant ID"
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calculator className="mr-2 h-5 w-5" />
                      QuickBooks Integration
                    </CardTitle>
                    <CardDescription>
                      Connect with QuickBooks for automated invoicing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Enable QuickBooks Integration</span>
                      <input
                        type="checkbox"
                        checked={integrationSettings.quickbooks.enabled}
                        onChange={(e) => setIntegrationSettings(prev => ({
                          ...prev,
                          quickbooks: { ...prev.quickbooks, enabled: e.target.checked }
                        }))}
                        className="h-4 w-4"
                      />
                    </div>
                    
                    {integrationSettings.quickbooks.enabled && (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="qb-client-id">QuickBooks Client ID</Label>
                          <Input
                            id="qb-client-id"
                            value={integrationSettings.quickbooks.clientId}
                            onChange={(e) => setIntegrationSettings(prev => ({
                              ...prev,
                              quickbooks: { ...prev.quickbooks, clientId: e.target.value }
                            }))}
                            placeholder="Enter your QuickBooks App Client ID"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Sandbox Mode</span>
                          <input
                            type="checkbox"
                            checked={integrationSettings.quickbooks.sandboxMode}
                            onChange={(e) => setIntegrationSettings(prev => ({
                              ...prev,
                              quickbooks: { ...prev.quickbooks, sandboxMode: e.target.checked }
                            }))}
                            className="h-4 w-4"
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Configure when and how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                        className="h-4 w-4"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Lead Assignments</p>
                        <p className="text-sm text-muted-foreground">When leads are assigned to you</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.leadAssignments}
                        onChange={(e) => setNotificationSettings(prev => ({ ...prev, leadAssignments: e.target.checked }))}
                        className="h-4 w-4"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Opportunity Updates</p>
                        <p className="text-sm text-muted-foreground">When opportunities are updated</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.opportunityUpdates}
                        onChange={(e) => setNotificationSettings(prev => ({ ...prev, opportunityUpdates: e.target.checked }))}
                        className="h-4 w-4"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Deal Closures</p>
                        <p className="text-sm text-muted-foreground">When deals are won or lost</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.dealClosures}
                        onChange={(e) => setNotificationSettings(prev => ({ ...prev, dealClosures: e.target.checked }))}
                        className="h-4 w-4"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Weekly Reports</p>
                        <p className="text-sm text-muted-foreground">Weekly performance summaries</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.weeklyReports}
                        onChange={(e) => setNotificationSettings(prev => ({ ...prev, weeklyReports: e.target.checked }))}
                        className="h-4 w-4"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'appearance' && (
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>
                    Customize the look and feel of your FulQrun experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Theme</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">Light Mode</p>
                          <p className="text-sm text-muted-foreground">Clean, bright interface for daytime use</p>
                        </div>
                        <input
                          type="radio"
                          name="theme"
                          checked={theme === 'light'}
                          onChange={() => setTheme('light')}
                          className="h-4 w-4"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">Dark Mode</p>
                          <p className="text-sm text-muted-foreground">Easy on the eyes for low-light environments</p>
                        </div>
                        <input
                          type="radio"
                          name="theme"
                          checked={theme === 'dark'}
                          onChange={() => setTheme('dark')}
                          className="h-4 w-4"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">System</p>
                          <p className="text-sm text-muted-foreground">Automatically match your device settings</p>
                        </div>
                        <input
                          type="radio"
                          name="theme"
                          checked={theme === 'system'}
                          onChange={() => setTheme('system')}
                          className="h-4 w-4"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Display Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Compact View</p>
                          <p className="text-sm text-muted-foreground">Show more information in less space</p>
                        </div>
                        <input type="checkbox" className="h-4 w-4" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Show Animations</p>
                          <p className="text-sm text-muted-foreground">Enable smooth transitions and animations</p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-4 w-4" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">High Contrast</p>
                          <p className="text-sm text-muted-foreground">Increase contrast for better readability</p>
                        </div>
                        <input type="checkbox" className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage security preferences and access controls
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">Session Timeout</p>
                        <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                      </div>
                      <select className="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                        <option value="480">8 hours</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">Data Export</p>
                        <p className="text-sm text-muted-foreground">Export your organization data</p>
                      </div>
                      <Button variant="outline">Export Data</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">Audit Logs</p>
                        <p className="text-sm text-muted-foreground">View system access and changes</p>
                      </div>
                      <Button variant="outline">View Logs</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-6">
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Database className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}