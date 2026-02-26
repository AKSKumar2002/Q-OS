-- ALPHREY ENGINE: DATABASE REPAIR & FEATURE ENABLING (TASKS + PROJECTS)
-- This script fixes the "updated_at" error for BOTH projects and tasks.

DO $$ 
BEGIN 
    -- 1. FIX PROJECTS: Ensure updated_at column exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='updated_at') THEN
        ALTER TABLE projects ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;

    -- 2. FIX TASKS: Ensure updated_at column exists (fixes the PATCH 400 on status change)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tasks' AND column_name='updated_at') THEN
        ALTER TABLE tasks ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;

    -- 3. PROJECTS: Missing Engine Columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_eng') THEN
        ALTER TABLE projects ADD COLUMN alloc_eng INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_design') THEN
        ALTER TABLE projects ADD COLUMN alloc_design INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_strategy') THEN
        ALTER TABLE projects ADD COLUMN alloc_strategy INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='health_score') THEN
        ALTER TABLE projects ADD COLUMN health_score INTEGER DEFAULT 100;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='next_milestone_title') THEN
        ALTER TABLE projects ADD COLUMN next_milestone_title TEXT DEFAULT 'Initial Launch';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='next_milestone_date') THEN
        ALTER TABLE projects ADD COLUMN next_milestone_date TIMESTAMP DEFAULT NOW() + INTERVAL '7 days';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='risk_title') THEN
        ALTER TABLE projects ADD COLUMN risk_title TEXT DEFAULT 'None Detected';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='risk_level') THEN
        ALTER TABLE projects ADD COLUMN risk_level TEXT DEFAULT 'Low';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='deleted_at') THEN
        ALTER TABLE projects ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='currency') THEN
        ALTER TABLE projects ADD COLUMN currency TEXT DEFAULT 'INR';
    END IF;

END $$;

-- 4. RE-INITIALIZE THE TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 5. RE-APPLY TRIGGERS TO BOTH TABLES
DROP TRIGGER IF EXISTS update_projects_modtime ON projects;
CREATE TRIGGER update_projects_modtime BEFORE UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

DROP TRIGGER IF EXISTS update_tasks_modtime ON tasks;
CREATE TRIGGER update_tasks_modtime BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- Refresh Schema Cache
NOTIFY pgrst, 'reload schema';
