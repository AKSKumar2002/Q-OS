-- ALPHREY ENGINE: PROJECT ENHANCEMENT (COMMERCIAL & SIGNATORIES)
-- Adds tracking for partial payments and project signatories

DO $$ 
BEGIN 
    -- 1. Add Partial Payment Tracking
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='is_partially_paid') THEN
        ALTER TABLE projects ADD COLUMN is_partially_paid BOOLEAN DEFAULT FALSE;
    END IF;

    -- 2. Add Signatory Tracking (Username/ID)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='signed_by') THEN
        ALTER TABLE projects ADD COLUMN signed_by TEXT;
    END IF;

    -- 3. Ensure Timeline columns exist (Safety check)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='start_date') THEN
        ALTER TABLE projects ADD COLUMN start_date DATE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='end_date') THEN
        ALTER TABLE projects ADD COLUMN end_date DATE;
    END IF;

END $$;

-- Refresh Schema Cache
NOTIFY pgrst, 'reload schema';
