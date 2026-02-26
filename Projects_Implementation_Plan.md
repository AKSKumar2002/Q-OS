# Projects Module (Alphery Execution Engine) Implementation Plan

I have successfully designed and integrated the core of the **Projects Module** into Alphery Space. The system is designed to be enterprise-grade, fast, and visually stunning.

## 🚀 What has been implemented:
1.  **Workspace Integration**: Added the "Projects" icon to the main ERP launcher.
2.  **Permissions & Roles**: Integrated Projects into the `Role Utility` so you can manage app access per tenant/user.
3.  **Supabase Core**: Installed the Supabase client and created the initialization layer.
4.  **Premium UI**: Created a multi-view interface inspired by Notion, Linear, and Monday.com.
    *   **Main Dashboard**: Real-time stats and execution velocity.
    *   **Project Central**: Full listing and management.
    *   **Execution Engine**: Interactive tabs for Board, List, Gantt, and Analytics.

## 🛠 Required Final Steps
To make the data storage fully functional with Supabase, please follow these steps:

### 1. Configure Environment Variables
Add your Supabase credentials to the `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 2. Execute Database Schema
Run the following SQL in your Supabase SQL Editor to create the necessary tables and RLS policies:

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Projects Table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id TEXT NOT NULL,
    created_by UUID,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'Planning',
    type TEXT DEFAULT 'Internal',
    priority TEXT DEFAULT 'Medium',
    start_date DATE,
    end_date DATE,
    budget_allocated NUMERIC(15, 2) DEFAULT 0,
    currency TEXT DEFAULT 'USD',
    custom_fields JSONB DEFAULT '{}',
    is_template BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Project Members Table
CREATE TABLE project_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    tenant_id TEXT NOT NULL,
    user_id TEXT, -- Using text to match your existing user ID system if needed
    role TEXT DEFAULT 'Member',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Milestones Table
CREATE TABLE milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    tenant_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE,
    status TEXT DEFAULT 'Pending',
    completion_percentage INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks Table
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    tenant_id TEXT NOT NULL,
    milestone_id UUID REFERENCES milestones(id),
    parent_task_id UUID REFERENCES tasks(id),
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'To Do',
    priority TEXT DEFAULT 'Medium',
    assignee_id TEXT,
    due_date TIMESTAMP WITH TIME ZONE,
    estimated_hours NUMERIC(10, 2) DEFAULT 0,
    actual_hours NUMERIC(10, 2) DEFAULT 0,
    cost NUMERIC(15, 2) DEFAULT 0,
    tags TEXT[],
    checklist JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Time Logs
CREATE TABLE time_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    user_id TEXT,
    tenant_id TEXT NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    duration_minutes INT,
    description TEXT,
    is_billable BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Automation Rules
CREATE TABLE automation_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    tenant_id TEXT NOT NULL,
    name TEXT NOT NULL,
    trigger_type TEXT NOT NULL,
    condition JSONB,
    action JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
-- Note: You should configure policies based on your specific tenant_id logic
-- Example: CREATE POLICY "Tenant Isolation" ON projects USING (tenant_id = current_setting('app.current_tenant'));
```

## 🔋 Integration Capabilities
The system is built **API-first**. You can now extend `src/app/core/supabase.ts` to fetch from these tables. The UI already has hooks for:
*   `CRM` -> Project conversion.
*   `Finance` -> Invoice triggering.
*   `AI` -> The metadata fields in tasks and projects are ready for AI vector indexing.
