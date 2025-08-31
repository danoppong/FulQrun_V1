// Database types for FulQrun application

export interface Organization {
  id: string
  name: string
  domain?: string
  industry?: string
  size_category?: 'startup' | 'small' | 'medium' | 'large' | 'enterprise'
  annual_revenue?: number
  headquarters_location?: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  clerk_id: string
  email: string
  first_name?: string
  last_name?: string
  role: 'rep' | 'manager' | 'admin'
  organization_id: string
  territory?: string
  quota_annual?: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Company {
  id: string
  name: string
  domain?: string
  industry?: string
  size_employees?: number
  annual_revenue?: number
  headquarters_location?: string
  company_type: 'prospect' | 'customer' | 'partner'
  organization_id: string
  created_by?: string
  created_at: string
  updated_at: string
}

export interface Contact {
  id: string
  first_name: string
  last_name: string
  email?: string
  phone?: string
  title?: string
  department?: string
  company_id: string
  is_primary: boolean
  is_champion: boolean
  is_decision_maker: boolean
  linkedin_url?: string
  notes?: string
  organization_id: string
  created_by?: string
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  company_name?: string
  title?: string
  source?: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  score: number
  notes?: string
  converted_to_opportunity_id?: string
  organization_id: string
  assigned_to?: string
  created_by?: string
  created_at: string
  updated_at: string
}

export interface Opportunity {
  id: string
  name: string
  company_id: string
  primary_contact_id?: string
  
  // PEAK Process
  peak_stage: 'prospect' | 'engage' | 'acquire' | 'keep'
  
  // MEDDPICC Qualification
  metrics?: Record<string, unknown> // JSONB
  economic_buyer_id?: string
  decision_criteria?: Record<string, unknown> // JSONB
  decision_process?: string
  paper_process?: string
  identify_pain?: string
  champion_id?: string
  competition?: string
  
  // Opportunity Details
  value?: number
  probability: number
  expected_close_date?: string
  actual_close_date?: string
  stage: string
  status: 'open' | 'won' | 'lost'
  loss_reason?: string
  
  // Tracking
  organization_id: string
  owner_id?: string
  created_by?: string
  created_at: string
  updated_at: string
}

export interface Activity {
  id: string
  type: 'email' | 'call' | 'meeting' | 'task' | 'note'
  subject?: string
  description?: string
  due_date?: string
  completed_at?: string
  status: 'pending' | 'completed' | 'cancelled'
  
  // Relations
  lead_id?: string
  opportunity_id?: string
  contact_id?: string
  company_id?: string
  
  // Microsoft Graph integration
  microsoft_event_id?: string
  microsoft_email_id?: string
  
  organization_id: string
  assigned_to?: string
  created_by?: string
  created_at: string
  updated_at: string
}

export interface LeadScoringRule {
  id: string
  name: string
  criteria: Record<string, unknown> // JSONB
  points: number
  is_active: boolean
  organization_id: string
  created_by?: string
  created_at: string
  updated_at: string
}

export interface PipelineStage {
  id: string
  name: string
  peak_phase: 'prospect' | 'engage' | 'acquire' | 'keep'
  order_index: number
  probability_default: number
  is_active: boolean
  organization_id: string
  created_at: string
  updated_at: string
}