'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  Zap, 
  MessageSquare, 
  FileText, 
  Phone, 
  CreditCard,
  Calendar,
  Settings,
  CheckCircle,
  AlertCircle,
  Plus,
  ExternalLink,
  Shield
} from 'lucide-react'

interface Integration {
  id: string
  name: string
  description: string
  category: 'communication' | 'productivity' | 'finance' | 'analytics' | 'automation'
  icon: React.ReactNode
  status: 'connected' | 'available' | 'coming_soon'
  features: string[]
  setupComplexity: 'easy' | 'medium' | 'advanced'
  pricing: string
}

const availableIntegrations: Integration[] = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Real-time notifications and team collaboration',
    category: 'communication',
    icon: <MessageSquare className="h-6 w-6" />,
    status: 'available',
    features: ['Deal notifications', 'Team alerts', 'Activity summaries', 'Bot commands'],
    setupComplexity: 'easy',
    pricing: 'Free'
  },
  {
    id: 'docusign',
    name: 'DocuSign',
    description: 'Digital contract signing and document management',
    category: 'productivity',
    icon: <FileText className="h-6 w-6" />,
    status: 'available',
    features: ['Contract automation', 'E-signatures', 'Document tracking', 'Compliance'],
    setupComplexity: 'medium',
    pricing: 'Paid plans from $10/month'
  },
  {
    id: 'gong',
    name: 'Gong',
    description: 'Conversation intelligence and call analysis',
    category: 'analytics',
    icon: <Phone className="h-6 w-6" />,
    status: 'available',
    features: ['Call recording', 'Conversation analysis', 'Coaching insights', 'Deal risk'],
    setupComplexity: 'advanced',
    pricing: 'Enterprise pricing'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing and subscription management',
    category: 'finance',
    icon: <CreditCard className="h-6 w-6" />,
    status: 'connected',
    features: ['Payment processing', 'Subscription billing', 'Revenue tracking', 'Invoicing'],
    setupComplexity: 'medium',
    pricing: '2.9% + 30¢ per transaction'
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    description: 'Video meetings and team collaboration',
    category: 'communication',
    icon: <Phone className="h-6 w-6" />,
    status: 'connected',
    features: ['Meeting scheduling', 'Call recording', 'Team notifications', 'File sharing'],
    setupComplexity: 'easy',
    pricing: 'Included with Microsoft 365'
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Marketing automation and lead nurturing',
    category: 'automation',
    icon: <Zap className="h-6 w-6" />,
    status: 'available',
    features: ['Lead nurturing', 'Email sequences', 'Landing pages', 'Analytics'],
    setupComplexity: 'medium',
    pricing: 'Free tier available'
  },
  {
    id: 'calendly',
    name: 'Calendly',
    description: 'Meeting scheduling and calendar management',
    category: 'productivity',
    icon: <Calendar className="h-6 w-6" />,
    status: 'available',
    features: ['Meeting scheduling', 'Calendar sync', 'Automated reminders', 'Analytics'],
    setupComplexity: 'easy',
    pricing: 'Free tier available'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Workflow automation and app connections',
    category: 'automation',
    icon: <Zap className="h-6 w-6" />,
    status: 'coming_soon',
    features: ['Workflow automation', '1000+ app connections', 'Custom triggers', 'Data sync'],
    setupComplexity: 'medium',
    pricing: 'Free tier available'
  }
]

export function IntegrationHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false)

  const categories = [
    { id: 'all', name: 'All Integrations', count: availableIntegrations.length },
    { id: 'communication', name: 'Communication', count: availableIntegrations.filter(i => i.category === 'communication').length },
    { id: 'productivity', name: 'Productivity', count: availableIntegrations.filter(i => i.category === 'productivity').length },
    { id: 'finance', name: 'Finance', count: availableIntegrations.filter(i => i.category === 'finance').length },
    { id: 'analytics', name: 'Analytics', count: availableIntegrations.filter(i => i.category === 'analytics').length },
    { id: 'automation', name: 'Automation', count: availableIntegrations.filter(i => i.category === 'automation').length }
  ]

  const filteredIntegrations = selectedCategory === 'all' 
    ? availableIntegrations 
    : availableIntegrations.filter(i => i.category === selectedCategory)

  const connectedCount = availableIntegrations.filter(i => i.status === 'connected').length

  const handleConnect = (integration: Integration) => {
    setSelectedIntegration(integration)
    setIsSetupModalOpen(true)
  }

  const getStatusIcon = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'available':
        return <Plus className="h-4 w-4 text-blue-600" />
      case 'coming_soon':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusText = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return 'Connected'
      case 'available':
        return 'Connect'
      case 'coming_soon':
        return 'Coming Soon'
    }
  }

  const getComplexityColor = (complexity: Integration['setupComplexity']) => {
    switch (complexity) {
      case 'easy':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Integration Hub v1</h2>
          <p className="text-muted-foreground">
            Connect FulQrun with your favorite tools and automate your workflow
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{connectedCount} Connected</p>
          <p className="text-xs text-muted-foreground">{availableIntegrations.length} Available</p>
        </div>
      </div>

      {/* Category Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="text-sm"
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integration Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredIntegrations.map((integration) => (
          <Card key={integration.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    {integration.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {integration.description}
                    </CardDescription>
                  </div>
                </div>
                {getStatusIcon(integration.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Features */}
                <div>
                  <p className="text-sm font-medium mb-2">Features:</p>
                  <ul className="text-xs space-y-1">
                    {integration.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        {feature}
                      </li>
                    ))}
                    {integration.features.length > 3 && (
                      <li className="text-muted-foreground">+{integration.features.length - 3} more...</li>
                    )}
                  </ul>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2 py-1 rounded-full ${getComplexityColor(integration.setupComplexity)}`}>
                    {integration.setupComplexity} setup
                  </span>
                  <span className="text-muted-foreground">{integration.pricing}</span>
                </div>

                {/* Action Button */}
                <Button
                  className="w-full"
                  variant={integration.status === 'connected' ? 'outline' : 'default'}
                  disabled={integration.status === 'coming_soon'}
                  onClick={() => handleConnect(integration)}
                >
                  {integration.status === 'connected' && <Settings className="mr-2 h-4 w-4" />}
                  {integration.status === 'available' && <Plus className="mr-2 h-4 w-4" />}
                  {getStatusText(integration.status)}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Integration Setup Modal */}
      {selectedIntegration && (
        <Dialog open={isSetupModalOpen} onOpenChange={setIsSetupModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedIntegration.icon}
                Connect {selectedIntegration.name}
              </DialogTitle>
              <DialogDescription>
                Set up {selectedIntegration.name} integration with FulQrun
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Integration Benefits */}
              <div>
                <h3 className="font-medium mb-2">What you&apos;ll get:</h3>
                <ul className="space-y-1">
                  {selectedIntegration.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Setup Form */}
              <div className="space-y-4">
                <h3 className="font-medium">Configuration</h3>
                
                {selectedIntegration.id === 'slack' && (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                      <Input
                        id="slack-webhook"
                        placeholder="https://hooks.slack.com/services/..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="slack-channel">Default Channel</Label>
                      <Input
                        id="slack-channel"
                        placeholder="#sales-notifications"
                      />
                    </div>
                  </div>
                )}

                {selectedIntegration.id === 'docusign' && (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="docusign-key">Integration Key</Label>
                      <Input
                        id="docusign-key"
                        placeholder="Enter your DocuSign integration key"
                      />
                    </div>
                    <div>
                      <Label htmlFor="docusign-account">Account ID</Label>
                      <Input
                        id="docusign-account"
                        placeholder="Your DocuSign account ID"
                      />
                    </div>
                  </div>
                )}

                {selectedIntegration.id === 'stripe' && (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="stripe-key">Publishable Key</Label>
                      <Input
                        id="stripe-key"
                        placeholder="pk_live_..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="stripe-secret">Secret Key</Label>
                      <Input
                        id="stripe-secret"
                        type="password"
                        placeholder="sk_live_..."
                      />
                    </div>
                  </div>
                )}

                {/* Generic OAuth Setup */}
                {!['slack', 'docusign', 'stripe'].includes(selectedIntegration.id) && (
                  <div className="text-center py-8">
                    <div className="p-4 bg-muted rounded-lg">
                      <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="font-medium mb-2">OAuth Connection</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Click connect to authorize FulQrun to access your {selectedIntegration.name} account
                      </p>
                      <Button>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Connect via OAuth
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Security Notice */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Security & Privacy</p>
                    <p className="text-xs text-blue-700">
                      All integrations use secure OAuth 2.0 authentication. 
                      FulQrun only accesses the minimum required permissions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSetupModalOpen(false)}>
                Cancel
              </Button>
              <Button>
                {selectedIntegration.status === 'connected' ? 'Update Settings' : 'Connect Integration'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}