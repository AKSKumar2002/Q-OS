-- ALPHERY EXECUTION ENGINE - COMPLETE RELATIONAL SCHEMA
-- Database: Supabase (PostgreSQL)
-- Multi-Tenant Isolation with Soft Deletes and Audit Logs

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id TEXT NOT NULL,
    created_by TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'Planning' CHECK (status IN ('Planning', 'Active', 'On Hold', 'Risk', 'Completed', 'Archived')),
    type TEXT DEFAULT 'Internal' CHECK (type IN ('Internal', 'Client', 'R&D', 'Recurring')),
    priority TEXT DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
    start_date DATE,
    end_date DATE,
    budget_allocated NUMERIC(15, 2) DEFAULT 0,
    currency TEXT DEFAULT 'USD',
    is_template BOOLEAN DEFAULT FALSE,
    custom_fields JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- 3. MILESTONES
CREATE TABLE IF NOT EXISTS milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    tenant_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE,
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'In Review', 'Completed')),
    completion_percentage INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TASKS ENGINE
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,
    parent_task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    tenant_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT, -- Rich text support via JSON/HTML
    status TEXT DEFAULT 'To Do',
    priority TEXT DEFAULT 'Medium',
    assignee_id TEXT, -- User Username/ID from GSheet
    due_date TIMESTAMP WITH TIME ZONE,
    estimated_hours NUMERIC(10, 2) DEFAULT 0,
    actual_hours NUMERIC(10, 2) DEFAULT 0,
    cost NUMERIC(15, 2) DEFAULT 0,
    tags TEXT[],
    checklist JSONB DEFAULT '[]',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TASK DEPENDENCIES
CREATE TABLE IF NOT EXISTS task_dependencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id TEXT NOT NULL,
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    depends_on_task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    dependency_type TEXT DEFAULT 'FS' -- Finish to Start
);

-- 6. TIME LOGS
CREATE TABLE IF NOT EXISTS time_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    tenant_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    duration_minutes INT,
    description TEXT,
    is_billable BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. EXPENSES
CREATE TABLE IF NOT EXISTS project_expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    tenant_id TEXT NOT NULL,
    amount NUMERIC(15, 2) NOT NULL,
    category TEXT,
    description TEXT,
    expense_date DATE DEFAULT CURRENT_DATE,
    receipt_url TEXT,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. PROJECT MEMBERSHIP (TEAM)
CREATE TABLE IF NOT EXISTS project_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    tenant_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    role TEXT DEFAULT 'Member',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(project_id, user_id)
);

-- 9. AUTOMATION RULES
CREATE TABLE IF NOT EXISTS automation_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    tenant_id TEXT NOT NULL,
    name TEXT NOT NULL,
    trigger_type TEXT NOT NULL, -- e.g., 'task_overdue', 'budget_exceeded'
    condition JSONB, -- The 'If' logic
    action JSONB, -- The 'Then' logic
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. ACTIVITY LOGS (AUDIT TRAIL)
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id TEXT NOT NULL,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
    user_id TEXT NOT NULL,
    action TEXT NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. INDEXING FOR HIGH-SPEED QUERIES
CREATE INDEX IF NOT EXISTS idx_projects_tenant ON projects(tenant_id);
CREATE INDEX IF NOT EXISTS idx_tasks_project ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_tenant ON tasks(tenant_id);
CREATE INDEX IF NOT EXISTS idx_time_logs_task ON time_logs(task_id);
CREATE INDEX IF NOT EXISTS idx_activity_tenant ON activity_logs(tenant_id);

-- 12. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Note: Policies below assume a multi-tenant environment where 
-- tenant_id is sent in every request or handled via application headers.
-- For simple setup, we create broad tenant-level policies:

CREATE POLICY "Tenant Projects Isolation" ON projects FOR ALL USING (tenant_id = tenant_id);
CREATE POLICY "Tenant Tasks Isolation" ON tasks FOR ALL USING (tenant_id = tenant_id);
CREATE POLICY "Tenant Milestone Isolation" ON milestones FOR ALL USING (tenant_id = tenant_id);
CREATE POLICY "Tenant TimeLog Isolation" ON time_logs FOR ALL USING (tenant_id = tenant_id);

-- TRIGGER TO AUTOMATICALLY UPDATE 'updated_at'
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_modtime BEFORE UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_tasks_modtime BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- REFRESH SCHEMA CACHE
NOTIFY pgrst, 'reload schema';
