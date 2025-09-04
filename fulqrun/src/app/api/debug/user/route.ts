import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(_request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ 
        error: 'Unauthorized',
        userId: null,
        step: 'auth_failed'
      }, { status: 401 })
    }

    const supabase = await createClient()
    
    // Get user's organization
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('organization_id, id, email, first_name, last_name')
      .eq('clerk_id', userId)
      .single()

    if (userError) {
      return NextResponse.json({ 
        error: 'User lookup failed',
        userId,
        userError: userError.message,
        step: 'user_lookup_failed'
      }, { status: 500 })
    }

    if (!user) {
      return NextResponse.json({ 
        error: 'User not found in database',
        userId,
        step: 'user_not_found'
      }, { status: 404 })
    }

    // Test database write permission
    const { data: testInsert, error: insertError } = await supabase
      .from('leads')
      .insert({
        first_name: 'Test',
        last_name: 'Debug',
        email: 'test@debug.com',
        company_name: 'Debug Corp',
        source: 'debug',
        status: 'new',
        score: 50,
        organization_id: user.organization_id,
        created_by: user.id,
        assigned_to: user.id
      })
      .select()
      .single()

    if (insertError) {
      return NextResponse.json({ 
        error: 'Database write failed',
        userId,
        user,
        insertError: insertError.message,
        step: 'insert_failed'
      }, { status: 500 })
    }

    // Clean up test record
    await supabase
      .from('leads')
      .delete()
      .eq('id', testInsert.id)

    return NextResponse.json({ 
      success: true,
      userId,
      user,
      testInsert,
      step: 'all_tests_passed'
    })

  } catch (error) {
    return NextResponse.json({ 
      error: 'Debug test failed',
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      step: 'exception'
    }, { status: 500 })
  }
}
