'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, AlertCircle, XCircle, RefreshCw, Settings } from 'lucide-react'

interface SystemCheck {
  name: string
  status: 'success' | 'warning' | 'error'
  message: string
  details?: string
}

export function SystemStatus() {
  const [checks, setChecks] = useState<SystemCheck[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const runSystemChecks = async () => {
    setIsLoading(true)
    const newChecks: SystemCheck[] = []

    // Check Clerk Configuration
    const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    if (!clerkKey || clerkKey.includes('your_clerk') || clerkKey.includes('demo')) {
      newChecks.push({
        name: 'Clerk Authentication',
        status: 'warning',
        message: 'Demo mode - Authentication not configured',
        details: 'Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY for production'
      })
    } else {
      newChecks.push({
        name: 'Clerk Authentication',
        status: 'success',
        message: 'Properly configured',
        details: `Using key: ${clerkKey.substring(0, 20)}...`
      })
    }

    // Check Supabase Configuration
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your_supabase') || supabaseKey.includes('your_supabase')) {
      newChecks.push({
        name: 'Supabase Database',
        status: 'warning',
        message: 'Demo mode - Database not configured',
        details: 'Set NEXT_PUBLIC_SUPABASE_URL for production'
      })
    } else {
      // Test database connection by trying to create a client
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        
        // Try a simple query to test connection
        const { data, error } = await supabase
          .from('organizations')
          .select('count')
          .limit(1)
        
        if (error) {
          newChecks.push({
            name: 'Supabase Database',
            status: 'error',
            message: 'Connection failed',
            details: error.message || 'Check database credentials and network'
          })
        } else {
          newChecks.push({
            name: 'Supabase Database',
            status: 'success',
            message: 'Connected and operational',
            details: `Database URL: ${supabaseUrl}`
          })
        }
      } catch (error) {
        newChecks.push({
          name: 'Supabase Database',
          status: 'error',
          message: 'Connection test failed',
          details: 'Unable to connect to database'
        })
      }
    }

    // Check Microsoft Graph
    const msClientId = process.env.MICROSOFT_CLIENT_ID
    newChecks.push({
      name: 'Microsoft Graph API',
      status: (!msClientId || msClientId.includes('demo')) ? 'warning' : 'success',
      message: (!msClientId || msClientId.includes('demo')) ? 'Not configured' : 'Configured',
      details: 'Optional - for email/calendar integration'
    })

    // Check QuickBooks
    const qbClientId = process.env.QUICKBOOKS_CLIENT_ID
    newChecks.push({
      name: 'QuickBooks API',
      status: (!qbClientId || qbClientId.includes('demo')) ? 'warning' : 'success',
      message: (!qbClientId || qbClientId.includes('demo')) ? 'Not configured' : 'Configured',
      details: 'Optional - for invoicing integration'
    })

    // Check Application URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL
    newChecks.push({
      name: 'Application URL',
      status: appUrl ? 'success' : 'warning',
      message: appUrl || 'Not set',
      details: 'Used for redirects and webhooks'
    })

    setChecks(newChecks)
    setIsLoading(false)
  }

  useEffect(() => {
    runSystemChecks()
  }, [])

  const getStatusIcon = (status: SystemCheck['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusColor = (status: SystemCheck['status']) => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50'
      case 'error':
        return 'border-red-200 bg-red-50'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              System Status
            </CardTitle>
            <CardDescription>
              Check the configuration status of all system components
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={runSystemChecks}
            disabled={isLoading}
          >
            {isLoading ? (
              <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-3 w-3" />
            )}
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {checks.map((check, index) => (
            <div key={index} className={`p-3 border rounded-lg ${getStatusColor(check.status)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  {getStatusIcon(check.status)}
                  <div>
                    <p className="font-medium text-sm">{check.name}</p>
                    <p className="text-sm">{check.message}</p>
                    {check.details && (
                      <p className="text-xs text-muted-foreground mt-1">{check.details}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {checks.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm font-medium text-blue-800 mb-1">Configuration Help</p>
            <p className="text-xs text-blue-700">
              For production deployment, ensure all services show &quot;success&quot; status. 
              Demo mode works with warnings but won&apos;t persist data.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}