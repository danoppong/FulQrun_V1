import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(_request: NextRequest) {
  try {
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('demo') || supabaseKey.includes('demo')) {
      return NextResponse.json({ 
        status: 'demo',
        message: 'Database not configured - running in demo mode',
        configured: false
      })
    }

    // Test database connection
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('organizations')
      .select('count')
      .limit(1)

    if (error) {
      return NextResponse.json({ 
        status: 'error',
        message: 'Database connection failed',
        error: error.message,
        configured: true
      }, { status: 500 })
    }

    return NextResponse.json({ 
      status: 'success',
      message: 'Database connected and operational',
      configured: true,
      url: supabaseUrl
    })

  } catch (error) {
    return NextResponse.json({ 
      status: 'error',
      message: 'Health check failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      configured: false
    }, { status: 500 })
  }
}