-- ALPHREY ENGINE: RELEASE STATUS CONSTRAINTS
-- Allows flexible project status for the new workflow stages:
-- Planning, Designing, Development, Testing, Deployment

DO $$
BEGIN
    -- Attempt to drop the check constraint.
    -- The name is typically 'projects_status_check' in Supabase/Postgres.
    IF EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'projects_status_check' 
        AND table_name = 'projects'
    ) THEN
        ALTER TABLE projects DROP CONSTRAINT projects_status_check;
    END IF;

    -- Also check for auto-generated name if the above is standard
    -- Sometimes postgres names it differently.
    
    -- Ensure status column is just TEXT
    ALTER TABLE projects ALTER COLUMN status TYPE TEXT;
    
    -- Set default if needed, or leave as is
    ALTER TABLE projects ALTER COLUMN status SET DEFAULT 'Planning';

END $$;

-- Refresh Schema Cache
NOTIFY pgrst, 'reload schema';
