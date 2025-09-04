-- Fix RLS Policies - Remove infinite recursion
-- Run this in your Supabase SQL Editor

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can only see their organization's data" ON organizations;
DROP POLICY IF EXISTS "Users can only see their organization's users" ON users;
DROP POLICY IF EXISTS "Users can only see their organization's companies" ON companies;
DROP POLICY IF EXISTS "Users can only see their organization's contacts" ON contacts;
DROP POLICY IF EXISTS "Users can only see their organization's leads" ON leads;
DROP POLICY IF EXISTS "Users can only see their organization's opportunities" ON opportunities;
DROP POLICY IF EXISTS "Users can only see their organization's activities" ON activities;
DROP POLICY IF EXISTS "Users can only see their organization's scoring rules" ON lead_scoring_rules;
DROP POLICY IF EXISTS "Users can only see their organization's pipeline stages" ON pipeline_stages;

-- Create a function to get the user's organization ID (avoids infinite recursion)
CREATE OR REPLACE FUNCTION get_user_organization_id()
RETURNS UUID AS $$
BEGIN
  RETURN (
    SELECT organization_id 
    FROM users 
    WHERE clerk_id = auth.jwt() ->> 'sub'
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create new policies using the function
CREATE POLICY "Users can only see their organization" ON organizations
    FOR ALL USING (id = get_user_organization_id());

CREATE POLICY "Users can only see their organization's users" ON users
    FOR ALL USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can only see their organization's companies" ON companies
    FOR ALL USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can only see their organization's contacts" ON contacts
    FOR ALL USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can only see their organization's leads" ON leads
    FOR ALL USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can only see their organization's opportunities" ON opportunities
    FOR ALL USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can only see their organization's activities" ON activities
    FOR ALL USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can only see their organization's scoring rules" ON lead_scoring_rules
    FOR ALL USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can only see their organization's pipeline stages" ON pipeline_stages
    FOR ALL USING (organization_id = get_user_organization_id());
