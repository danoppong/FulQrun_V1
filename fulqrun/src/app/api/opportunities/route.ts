import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(_request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = await createClient()
    
    // Get user's organization
    const { data: user } = await supabase
      .from('users')
      .select('organization_id')
      .eq('clerk_id', userId)
      .single()

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get opportunities with related data
    const { data: opportunities, error } = await supabase
      .from('opportunities')
      .select(`
        *,
        companies(name, domain),
        contacts!opportunities_primary_contact_id_fkey(first_name, last_name, email),
        champion:contacts!opportunities_champion_id_fkey(first_name, last_name),
        economic_buyer:contacts!opportunities_economic_buyer_id_fkey(first_name, last_name),
        owner:users!opportunities_owner_id_fkey(first_name, last_name)
      `)
      .eq('organization_id', user.organization_id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ opportunities })
  } catch (_error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const supabase = await createClient()
    
    // Get user's organization
    const { data: user } = await supabase
      .from('users')
      .select('organization_id, id')
      .eq('clerk_id', userId)
      .single()

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Create opportunity
    const { data: opportunity, error } = await supabase
      .from('opportunities')
      .insert({
        ...body,
        organization_id: user.organization_id,
        created_by: user.id,
        owner_id: user.id
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ opportunity }, { status: 201 })
  } catch (_error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}