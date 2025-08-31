-- FulQrun Database Schema for MVP
-- This schema implements the core CRM functionality with PEAK + MEDDPICC methodology

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizations table
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255),
    industry VARCHAR(100),
    size_category VARCHAR(50), -- 'startup', 'small', 'medium', 'large', 'enterprise'
    annual_revenue DECIMAL(15,2),
    headquarters_location VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table (extends Clerk user data)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clerk_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) NOT NULL DEFAULT 'rep', -- 'rep', 'manager', 'admin'
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    territory VARCHAR(255),
    quota_annual DECIMAL(15,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Companies table (prospects/customers)
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255),
    industry VARCHAR(100),
    size_employees INTEGER,
    annual_revenue DECIMAL(15,2),
    headquarters_location VARCHAR(255),
    company_type VARCHAR(50) DEFAULT 'prospect', -- 'prospect', 'customer', 'partner'
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contacts table
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    title VARCHAR(255),
    department VARCHAR(100),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT false,
    is_champion BOOLEAN DEFAULT false, -- MEDDPICC Champion
    is_decision_maker BOOLEAN DEFAULT false, -- MEDDPICC Decision Maker
    linkedin_url VARCHAR(500),
    notes TEXT,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads table
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(50),
    company_name VARCHAR(255),
    title VARCHAR(255),
    source VARCHAR(100), -- 'website', 'referral', 'cold_outreach', 'event', etc.
    status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'converted', 'lost'
    score INTEGER DEFAULT 0, -- Lead scoring 0-100
    notes TEXT,
    converted_to_opportunity_id UUID,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    assigned_to UUID REFERENCES users(id),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Opportunities table (PEAK + MEDDPICC)
CREATE TABLE opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    primary_contact_id UUID REFERENCES contacts(id),
    
    -- PEAK Process Stages
    peak_stage VARCHAR(50) DEFAULT 'prospect', -- 'prospect', 'engage', 'acquire', 'keep'
    
    -- MEDDPICC Qualification
    metrics JSONB, -- Quantifiable business impact metrics
    economic_buyer_id UUID REFERENCES contacts(id), -- Who controls the budget
    decision_criteria JSONB, -- What criteria will be used to make the decision
    decision_process TEXT, -- How the decision will be made
    paper_process TEXT, -- Legal/procurement process
    identify_pain TEXT, -- Business pain points
    champion_id UUID REFERENCES contacts(id), -- Internal champion
    competition TEXT, -- Competitive landscape
    
    -- Opportunity Details
    value DECIMAL(15,2),
    probability INTEGER DEFAULT 0, -- 0-100%
    expected_close_date DATE,
    actual_close_date DATE,
    stage VARCHAR(50) DEFAULT 'prospecting', -- Sales stage within PEAK
    status VARCHAR(50) DEFAULT 'open', -- 'open', 'won', 'lost'
    loss_reason VARCHAR(255),
    
    -- Tracking
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    owner_id UUID REFERENCES users(id),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities table (emails, calls, meetings, tasks)
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(50) NOT NULL, -- 'email', 'call', 'meeting', 'task', 'note'
    subject VARCHAR(255),
    description TEXT,
    due_date TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'cancelled'
    
    -- Relations
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    
    -- Microsoft Graph integration
    microsoft_event_id VARCHAR(255),
    microsoft_email_id VARCHAR(255),
    
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    assigned_to UUID REFERENCES users(id),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lead scoring rules table
CREATE TABLE lead_scoring_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    criteria JSONB NOT NULL, -- JSON criteria for scoring
    points INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pipeline stages configuration
CREATE TABLE pipeline_stages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    peak_phase VARCHAR(50) NOT NULL, -- Maps to PEAK: prospect, engage, acquire, keep
    order_index INTEGER NOT NULL,
    probability_default INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_clerk_id ON users(clerk_id);
CREATE INDEX idx_users_organization_id ON users(organization_id);
CREATE INDEX idx_companies_organization_id ON companies(organization_id);
CREATE INDEX idx_contacts_company_id ON contacts(company_id);
CREATE INDEX idx_contacts_organization_id ON contacts(organization_id);
CREATE INDEX idx_leads_organization_id ON leads(organization_id);
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX idx_opportunities_organization_id ON opportunities(organization_id);
CREATE INDEX idx_opportunities_owner_id ON opportunities(owner_id);
CREATE INDEX idx_opportunities_company_id ON opportunities(company_id);
CREATE INDEX idx_activities_organization_id ON activities(organization_id);
CREATE INDEX idx_activities_lead_id ON activities(lead_id);
CREATE INDEX idx_activities_opportunity_id ON activities(opportunity_id);

-- Row Level Security (RLS) Policies
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_scoring_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_stages ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Users can only access data from their organization
CREATE POLICY "Users can only see their organization's data" ON organizations
    FOR ALL USING (id IN (
        SELECT organization_id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'
    ));

CREATE POLICY "Users can only see their organization's users" ON users
    FOR ALL USING (organization_id IN (
        SELECT organization_id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'
    ));

CREATE POLICY "Users can only see their organization's companies" ON companies
    FOR ALL USING (organization_id IN (
        SELECT organization_id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'
    ));

CREATE POLICY "Users can only see their organization's contacts" ON contacts
    FOR ALL USING (organization_id IN (
        SELECT organization_id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'
    ));

CREATE POLICY "Users can only see their organization's leads" ON leads
    FOR ALL USING (organization_id IN (
        SELECT organization_id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'
    ));

CREATE POLICY "Users can only see their organization's opportunities" ON opportunities
    FOR ALL USING (organization_id IN (
        SELECT organization_id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'
    ));

CREATE POLICY "Users can only see their organization's activities" ON activities
    FOR ALL USING (organization_id IN (
        SELECT organization_id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'
    ));

CREATE POLICY "Users can only see their organization's scoring rules" ON lead_scoring_rules
    FOR ALL USING (organization_id IN (
        SELECT organization_id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'
    ));

CREATE POLICY "Users can only see their organization's pipeline stages" ON pipeline_stages
    FOR ALL USING (organization_id IN (
        SELECT organization_id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'
    ));

-- Insert default pipeline stages for PEAK methodology
INSERT INTO pipeline_stages (name, peak_phase, order_index, probability_default) VALUES
('Prospecting', 'prospect', 1, 10),
('Initial Contact', 'prospect', 2, 20),
('Qualification', 'engage', 3, 30),
('Needs Analysis', 'engage', 4, 40),
('Proposal', 'engage', 5, 60),
('Negotiation', 'acquire', 6, 80),
('Closed Won', 'acquire', 7, 100),
('Customer Success', 'keep', 8, 100);