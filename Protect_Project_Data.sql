-- ALPHREY ENGINE: DATA FORTRESS PROTOCOL
-- Enforces strict data persistence. Hard deletes and Truncates are BLOCKED.
-- Accidental table drops are guarded against (via policy if applicable, but triggers handle row destruction).

-- 1. Create the Shield Function
CREATE OR REPLACE FUNCTION prevent_destruction()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'ALPHREY FORTRESS: Hard deletion is prohibited to protect data integrity. Use soft_delete (set deleted_at) instead.';
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 2. Apply Shield to Critical Tables
-- Projects
DROP TRIGGER IF EXISTS shield_projects_delete ON projects;
CREATE TRIGGER shield_projects_delete
BEFORE DELETE ON projects
FOR EACH ROW
EXECUTE FUNCTION prevent_destruction();

DROP TRIGGER IF EXISTS shield_projects_truncate ON projects;
CREATE TRIGGER shield_projects_truncate
BEFORE TRUNCATE ON projects
EXECUTE FUNCTION prevent_destruction();

-- Tasks
DROP TRIGGER IF EXISTS shield_tasks_delete ON tasks;
CREATE TRIGGER shield_tasks_delete
BEFORE DELETE ON tasks
FOR EACH ROW
EXECUTE FUNCTION prevent_destruction();

DROP TRIGGER IF EXISTS shield_tasks_truncate ON tasks;
CREATE TRIGGER shield_tasks_truncate
BEFORE TRUNCATE ON tasks
EXECUTE FUNCTION prevent_destruction();

-- Milestones
DROP TRIGGER IF EXISTS shield_milestones_delete ON milestones;
CREATE TRIGGER shield_milestones_delete
BEFORE DELETE ON milestones
FOR EACH ROW
EXECUTE FUNCTION prevent_destruction();

DROP TRIGGER IF EXISTS shield_milestones_truncate ON milestones;
CREATE TRIGGER shield_milestones_truncate
BEFORE TRUNCATE ON milestones
EXECUTE FUNCTION prevent_destruction();

-- 3. Safety Check: Ensure deleted_at column exists for soft deletes
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='deleted_at') THEN
        ALTER TABLE projects ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tasks' AND column_name='deleted_at') THEN
        ALTER TABLE tasks ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='milestones' AND column_name='deleted_at') THEN
        ALTER TABLE milestones ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE;
    END IF;
END $$;

-- Refresh Schema Cache
NOTIFY pgrst, 'reload schema';
