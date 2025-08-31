import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { organization, userProfile, preferences } = await request.json()
    
    // Demo mode - simulate successful onboarding
    console.log('Demo onboarding data:', { organization, userProfile, preferences })
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Return success response
    return NextResponse.json({ 
      success: true,
      message: 'Demo onboarding completed successfully',
      organization: {
        id: 'demo-org-' + Date.now(),
        name: organization.name,
        ...organization
      },
      user: {
        id: 'demo-user-' + Date.now(),
        role: 'admin',
        ...userProfile
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Demo onboarding error:', error)
    return NextResponse.json({ 
      error: 'Demo onboarding failed',
      message: 'Please try again'
    }, { status: 500 })
  }
}