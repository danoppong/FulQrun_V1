-- Create a test user and organization for development
-- Run this in your Supabase SQL Editor

-- First, create a test organization
INSERT INTO organizations (id, name, domain, industry, size_category, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'FulQrun Demo Organization',
  'fulqrun.com',
  'Technology',
  'medium',
  NOW(),
  NOW()
);

-- Create a test user (you'll need to replace the clerk_id with a real one from your Clerk dashboard)
INSERT INTO users (id, clerk_id, email, first_name, last_name, role, organization_id, is_active, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'user_test123', -- Replace this with a real Clerk user ID
  'test@fulqrun.com',
  'Test',
  'User',
  'admin',
  '00000000-0000-0000-0000-000000000001',
  true,
  NOW(),
  NOW()
);

-- Create some sample data
INSERT INTO companies (id, name, domain, industry, size_employees, company_type, organization_id, created_by, created_at, updated_at)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Acme Corp', 'acme.com', 'Technology', 150, 'prospect', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000002', 'TechStart Inc', 'techstart.com', 'Software', 50, 'prospect', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', NOW(), NOW());

INSERT INTO contacts (id, first_name, last_name, email, title, company_id, organization_id, created_by, created_at, updated_at)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'John', 'Smith', 'john@acme.com', 'VP of Sales', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000002', 'Sarah', 'Johnson', 'sarah@techstart.com', 'CTO', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', NOW(), NOW());

INSERT INTO leads (id, first_name, last_name, email, company_name, title, source, status, score, organization_id, assigned_to, created_by, created_at, updated_at)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Mike', 'Chen', 'mike@startupx.com', 'StartupX', 'Founder', 'website', 'new', 85, '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000002', 'Lisa', 'Wang', 'lisa@innovate.com', 'Innovate Solutions', 'VP Marketing', 'referral', 'contacted', 92, '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', NOW(), NOW());

INSERT INTO opportunities (id, name, company_id, primary_contact_id, peak_stage, value, probability, stage, status, organization_id, owner_id, created_by, created_at, updated_at)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Acme Corp - Enterprise Software', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'engage', 150000, 60, 'proposal', 'open', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000002', 'TechStart Inc - Platform Integration', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'acquire', 75000, 80, 'negotiation', 'open', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', NOW(), NOW());
