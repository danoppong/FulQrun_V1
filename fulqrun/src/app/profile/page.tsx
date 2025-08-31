'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ActivityTimeline } from '@/components/activity/activity-timeline'
import { 
  User, 
  Target,
  TrendingUp,
  Award,
  Settings,
  Camera,
  Save,
  Edit
} from 'lucide-react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@acme.com',
    phone: '+1 (555) 123-4567',
    title: 'Senior Sales Representative',
    department: 'Sales',
    location: 'San Francisco, CA',
    startDate: '2023-01-15',
    territory: 'West Coast',
    quotaAnnual: 1200000,
    manager: 'Sarah Johnson'
  })

  const [preferences, setPreferences] = useState({
    timezone: 'America/Los_Angeles',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    language: 'English',
    emailDigest: 'daily',
    notifications: {
      leadAssignments: true,
      opportunityUpdates: true,
      dealClosures: true,
      teamUpdates: false
    }
  })

  // Mock performance data
  const performanceStats = {
    currentQuota: 1200000,
    achieved: 780000,
    percentage: 65,
    dealsWon: 12,
    dealsLost: 4,
    winRate: 75,
    avgDealSize: 65000,
    activitiesThisMonth: 89,
    rank: 3,
    totalReps: 12
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string | number | boolean) => {
    if (field.startsWith('notifications.')) {
      const notificationField = field.split('.')[1]
      setPreferences(prev => ({
        ...prev,
        notifications: { ...prev.notifications, [notificationField]: value }
      }))
    } else if (field in preferences) {
      setPreferences(prev => ({ ...prev, [field]: value }))
    } else {
      setProfileData(prev => ({ ...prev, [field]: value }))
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your personal information and preferences
            </p>
          </div>
          <Button
            onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Save className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Information */}
          <div className="md:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Profile Picture */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    {isEditing && (
                      <Button
                        size="icon"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{profileData.firstName} {profileData.lastName}</h3>
                    <p className="text-sm text-muted-foreground">{profileData.title}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={profileData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Work Information */}
            <Card>
              <CardHeader>
                <CardTitle>Work Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={profileData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={profileData.department}
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="territory">Territory</Label>
                    <Input
                      id="territory"
                      value={profileData.territory}
                      disabled={true}
                    />
                  </div>
                  <div>
                    <Label htmlFor="manager">Manager</Label>
                    <Input
                      id="manager"
                      value={profileData.manager}
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={profileData.startDate}
                      disabled={true}
                    />
                  </div>
                  <div>
                    <Label htmlFor="quotaAnnual">Annual Quota</Label>
                    <Input
                      id="quotaAnnual"
                      value={`$${profileData.quotaAnnual.toLocaleString()}`}
                      disabled={true}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      value={preferences.timezone}
                      onChange={(e) => handleChange('timezone', e.target.value)}
                      disabled={!isEditing}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="America/Los_Angeles">Pacific Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/New_York">Eastern Time</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      value={preferences.language}
                      onChange={(e) => handleChange('language', e.target.value)}
                      disabled={!isEditing}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <select
                      id="dateFormat"
                      value={preferences.dateFormat}
                      onChange={(e) => handleChange('dateFormat', e.target.value)}
                      disabled={!isEditing}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <select
                      id="currency"
                      value={preferences.currency}
                      onChange={(e) => handleChange('currency', e.target.value)}
                      disabled={!isEditing}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label>Notification Preferences</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Lead Assignments</span>
                      <input
                        type="checkbox"
                        checked={preferences.notifications.leadAssignments}
                        onChange={(e) => handleChange('notifications.leadAssignments', e.target.checked)}
                        disabled={!isEditing}
                        className="h-4 w-4"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Opportunity Updates</span>
                      <input
                        type="checkbox"
                        checked={preferences.notifications.opportunityUpdates}
                        onChange={(e) => handleChange('notifications.opportunityUpdates', e.target.checked)}
                        disabled={!isEditing}
                        className="h-4 w-4"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Deal Closures</span>
                      <input
                        type="checkbox"
                        checked={preferences.notifications.dealClosures}
                        onChange={(e) => handleChange('notifications.dealClosures', e.target.checked)}
                        disabled={!isEditing}
                        className="h-4 w-4"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Team Updates</span>
                      <input
                        type="checkbox"
                        checked={preferences.notifications.teamUpdates}
                        onChange={(e) => handleChange('notifications.teamUpdates', e.target.checked)}
                        disabled={!isEditing}
                        className="h-4 w-4"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Quota Achievement</span>
                    <span className="text-sm font-medium">{performanceStats.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${performanceStats.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    ${(performanceStats.achieved / 1000).toFixed(0)}K of ${(performanceStats.currentQuota / 1000).toFixed(0)}K
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{performanceStats.dealsWon}</p>
                    <p className="text-xs text-muted-foreground">Deals Won</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">{performanceStats.winRate}%</p>
                    <p className="text-xs text-muted-foreground">Win Rate</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Deal Size</span>
                    <span className="text-sm font-medium">${(performanceStats.avgDealSize / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Activities This Month</span>
                    <span className="text-sm font-medium">{performanceStats.activitiesThisMonth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Team Rank</span>
                    <span className="text-sm font-medium">{performanceStats.rank} of {performanceStats.totalReps}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Award className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Top Performer</p>
                      <p className="text-xs text-muted-foreground">Q4 2023</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Target className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Quota Achiever</p>
                      <p className="text-xs text-muted-foreground">3 quarters running</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Rising Star</p>
                      <p className="text-xs text-muted-foreground">Fastest deal closure</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activity Timeline */}
        <ActivityTimeline showAddButton={false} />
      </div>
    </DashboardLayout>
  )
}