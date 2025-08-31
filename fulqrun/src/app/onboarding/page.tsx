'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Building2, Users, Target, CheckCircle, ArrowRight } from 'lucide-react'

export default function OnboardingPage() {
  const { user } = useUser()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [organizationData, setOrganizationData] = useState({
    name: '',
    domain: '',
    industry: 'Technology',
    size: 'medium',
    headquarters: ''
  })

  const [userProfile, setUserProfile] = useState({
    title: '',
    department: 'Sales',
    territory: '',
    quota: 1000000
  })

  const [preferences, setPreferences] = useState({
    peakMethodology: true,
    meddpiccQualification: true,
    leadScoring: true,
    microsoftIntegration: false,
    quickbooksIntegration: false
  })

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Validate required fields
      if (!organizationData.name.trim()) {
        setError('Please enter an organization name')
        setIsLoading(false)
        return
      }

      console.log('Starting onboarding process...')
      console.log('User:', user ? 'Authenticated' : 'Not authenticated')
      console.log('Organization data:', organizationData)

      // For demo mode or when no user, just redirect to dashboard
      if (!user?.id) {
        console.log('Demo mode - storing data locally and redirecting')
        // Store demo data in localStorage for demo purposes
        localStorage.setItem('fulqrun-demo-org', JSON.stringify(organizationData))
        localStorage.setItem('fulqrun-demo-profile', JSON.stringify(userProfile))
        localStorage.setItem('fulqrun-demo-preferences', JSON.stringify(preferences))
        
        // Add a small delay to show loading state
        await new Promise(resolve => setTimeout(resolve, 1500))
        router.push('/dashboard')
        return
      }

      // Production mode - create real organization and user profile
      console.log('Production mode - calling API')
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization: organizationData,
          userProfile,
          preferences,
          clerkUserId: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName
        })
      })

      console.log('API response status:', response.status)

      if (response.ok) {
        const result = await response.json()
        console.log('Onboarding successful:', result)
        
        if (result.mode === 'demo') {
          console.log('Demo mode onboarding completed')
          // Store demo data locally
          localStorage.setItem('fulqrun-demo-org', JSON.stringify(result.organization))
          localStorage.setItem('fulqrun-demo-user', JSON.stringify(result.user))
          
          // Show success message for demo mode
          alert('Demo setup completed! You can now explore all features with demo data.')
        }
        
        router.push('/dashboard')
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('Onboarding failed:', errorData)
        
        if (errorData.details) {
          setError(`Setup failed: ${errorData.error} - ${errorData.details}`)
        } else {
          setError(`Setup failed: ${errorData.error || 'Unknown error occurred'}`)
        }
      }
    } catch (error) {
      console.error('Error during onboarding:', error)
      setError('An error occurred during setup. Please check the console for details.')
    } finally {
      setIsLoading(false)
    }
  }

  const steps = [
    { number: 1, title: 'Organization Setup', icon: Building2 },
    { number: 2, title: 'Your Profile', icon: Users },
    { number: 3, title: 'Preferences', icon: Target }
  ]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.number 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'border-muted-foreground text-muted-foreground'
              }`}>
                {currentStep > step.number ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              <div className="ml-2 mr-8">
                <p className={`text-sm font-medium ${
                  currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="h-4 w-4 text-muted-foreground mr-8" />
              )}
            </div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to FulQrun!</CardTitle>
            <CardDescription>
              Let&apos;s set up your sales operations platform in just a few steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Error Display */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Organization Information</h3>
                
                <div>
                  <Label htmlFor="org-name">Organization Name *</Label>
                  <Input
                    id="org-name"
                    value={organizationData.name}
                    onChange={(e) => setOrganizationData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Acme Sales Organization"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="org-domain">Company Domain</Label>
                    <Input
                      id="org-domain"
                      value={organizationData.domain}
                      onChange={(e) => setOrganizationData(prev => ({ ...prev, domain: e.target.value }))}
                      placeholder="acme.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="org-industry">Industry</Label>
                    <select
                      id="org-industry"
                      value={organizationData.industry}
                      onChange={(e) => setOrganizationData(prev => ({ ...prev, industry: e.target.value }))}
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
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="org-size">Organization Size</Label>
                    <select
                      id="org-size"
                      value={organizationData.size}
                      onChange={(e) => setOrganizationData(prev => ({ ...prev, size: e.target.value }))}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="startup">Startup (1-10)</option>
                      <option value="small">Small (11-50)</option>
                      <option value="medium">Medium (51-250)</option>
                      <option value="large">Large (251-1000)</option>
                      <option value="enterprise">Enterprise (1000+)</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="org-headquarters">Headquarters</Label>
                    <Input
                      id="org-headquarters"
                      value={organizationData.headquarters}
                      onChange={(e) => setOrganizationData(prev => ({ ...prev, headquarters: e.target.value }))}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Your Profile</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="user-title">Job Title</Label>
                    <Input
                      id="user-title"
                      value={userProfile.title}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Sales Representative"
                    />
                  </div>
                  <div>
                    <Label htmlFor="user-department">Department</Label>
                    <select
                      id="user-department"
                      value={userProfile.department}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, department: e.target.value }))}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Customer Success">Customer Success</option>
                      <option value="Management">Management</option>
                      <option value="Administration">Administration</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="user-territory">Sales Territory</Label>
                    <Input
                      id="user-territory"
                      value={userProfile.territory}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, territory: e.target.value }))}
                      placeholder="West Coast, Enterprise, etc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="user-quota">Annual Quota ($)</Label>
                    <Input
                      id="user-quota"
                      type="number"
                      value={userProfile.quota}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, quota: parseInt(e.target.value) || 0 }))}
                      placeholder="1000000"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Platform Preferences</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">PEAK Methodology</p>
                      <p className="text-sm text-muted-foreground">Prospect → Engage → Acquire → Keep process</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.peakMethodology}
                      onChange={(e) => setPreferences(prev => ({ ...prev, peakMethodology: e.target.checked }))}
                      className="h-4 w-4"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">MEDDPICC Qualification</p>
                      <p className="text-sm text-muted-foreground">Structured opportunity qualification framework</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.meddpiccQualification}
                      onChange={(e) => setPreferences(prev => ({ ...prev, meddpiccQualification: e.target.checked }))}
                      className="h-4 w-4"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">Automatic Lead Scoring</p>
                      <p className="text-sm text-muted-foreground">AI-powered lead qualification and scoring</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.leadScoring}
                      onChange={(e) => setPreferences(prev => ({ ...prev, leadScoring: e.target.checked }))}
                      className="h-4 w-4"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">Microsoft 365 Integration</p>
                      <p className="text-sm text-muted-foreground">Email and calendar synchronization</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.microsoftIntegration}
                      onChange={(e) => setPreferences(prev => ({ ...prev, microsoftIntegration: e.target.checked }))}
                      className="h-4 w-4"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">QuickBooks Integration</p>
                      <p className="text-sm text-muted-foreground">Automated invoicing and payment tracking</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.quickbooksIntegration}
                      onChange={(e) => setPreferences(prev => ({ ...prev, quickbooksIntegration: e.target.checked }))}
                      className="h-4 w-4"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                Back
              </Button>
              
              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={currentStep === 1 && !organizationData.name}
                >
                  Next
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleComplete}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? 'Setting up...' : 'Complete Setup'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      console.log('Debug - Current state:')
                      console.log('User:', user)
                      console.log('Organization:', organizationData)
                      console.log('Profile:', userProfile)
                      console.log('Preferences:', preferences)
                    }}
                    disabled={isLoading}
                  >
                    Debug
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => router.push('/dashboard')}
                    disabled={isLoading}
                  >
                    Skip to Dashboard
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}