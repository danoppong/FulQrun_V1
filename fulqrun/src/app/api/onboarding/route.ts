import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { organization, userProfile, preferences, clerkUserId, email, firstName, lastName } = await request.json()
    const supabase = await createClient()

    // Start a transaction by creating organization first
    const { data: newOrganization, error: orgError } = await supabase
      .from('organizations')
      .insert({
        name: organization.name,
        domain: organization.domain,
        industry: organization.industry,
        size_category: organization.size,
        headquarters_location: organization.headquarters
      })
      .select()
      .single()

    if (orgError) {
      return NextResponse.json({ error: 'Failed to create organization' }, { status: 500 })
    }

    // Create user profile
    const { data: newUser, error: userError } = await supabase
      .from('users')
      .insert({
        clerk_id: clerkUserId,
        email: email,
        first_name: firstName,
        last_name: lastName,
        role: 'admin', // First user becomes admin
        organization_id: newOrganization.id,
        territory: userProfile.territory,
        quota_annual: userProfile.quota
      })
      .select()
      .single()

    if (userError) {
      return NextResponse.json({ error: 'Failed to create user profile' }, { status: 500 })
    }

    // Create default pipeline stages if PEAK methodology is enabled
    if (preferences.peakMethodology) {
      const defaultStages = [
        { name: 'Prospecting', peak_phase: 'prospect', order_index: 1, probability_default: 10 },
        { name: 'Initial Contact', peak_phase: 'prospect', order_index: 2, probability_default: 20 },
        { name: 'Qualification', peak_phase: 'engage', order_index: 3, probability_default: 30 },
        { name: 'Needs Analysis', peak_phase: 'engage', order_index: 4, probability_default: 40 },
        { name: 'Proposal', peak_phase: 'engage', order_index: 5, probability_default: 60 },
        { name: 'Negotiation', peak_phase: 'acquire', order_index: 6, probability_default: 80 },
        { name: 'Closed Won', peak_phase: 'acquire', order_index: 7, probability_default: 100 },
        { name: 'Customer Success', peak_phase: 'keep', order_index: 8, probability_default: 100 }
      ]

      await supabase
        .from('pipeline_stages')
        .insert(
          defaultStages.map(stage => ({
            ...stage,
            organization_id: newOrganization.id
          }))
        )
    }

    // Create default lead scoring rules if enabled
    if (preferences.leadScoring) {
      const defaultScoringRules = [
        {
          name: 'Executive Title Scoring',
          criteria: { field: 'title', operator: 'contains', value: 'CEO', points: 30 },
          points: 30,
          organization_id: newOrganization.id,
          created_by: newUser.id
        },
        {
          name: 'Company Size Scoring',
          criteria: { field: 'company_employees', operator: 'greater_than', value: 1000, points: 25 },
          points: 25,
          organization_id: newOrganization.id,
          created_by: newUser.id
        },
        {
          name: 'Referral Source Scoring',
          criteria: { field: 'source', operator: 'equals', value: 'Referral', points: 25 },
          points: 25,
          organization_id: newOrganization.id,
          created_by: newUser.id
        }
      ]

      await supabase
        .from('lead_scoring_rules')
        .insert(defaultScoringRules)
    }

    return NextResponse.json({ 
      success: true,
      organization: newOrganization,
      user: newUser
    }, { status: 201 })

  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}