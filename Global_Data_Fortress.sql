-- =========================================================================
-- ALPHERY OS: GLOBAL DATA FORTRESS (ENTERPRISE MASTER SCRIPT)
-- Objective: 100% Data Protection - No Hard Deletes Allowed.
-- Description: Applies soft-delete policies universally across all system modules.
-- =========================================================================

-- 1. UNIVERSAL 'PREVENT DESTRUCTION' FUNCTION
-- Throws a high-priority database error if ANY standard DELETE or TRUNCATE is attempted.
CREATE OR REPLACE FUNCTION prevent_destruction()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION '❌ ALPHREY FORTRESS ALERT: Hard deletion (%) is strictly prohibited to protect data integrity. Please use soft_delete (UPDATE deleted_at = NOW()) instead.', TG_OP;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 2. DYNAMIC DEPLOYMENT PROCEDURE
-- Automatically adds 'deleted_at', and attaches triggers to prevent DELETE/TRUNCATE
DO $$ 
DECLARE
    target_table TEXT;
    all_core_tables TEXT[] := ARRAY[
        -- Core Workspace / Projects
        'projects', 'tasks', 'milestones', 'time_logs', 'project_expenses', 
        'project_members', 'automation_rules', 'activity_logs', 'task_dependencies',
        -- Comm / Chat Module
        'conversations', 'conversation_members', 'messages',
        -- Document Module
        'documents', 'document_revisions', 'document_comments', 
        'document_folders', 'document_content', 'document_permissions', 'document_versions',
        -- System & Auth
        'users', 'tenants', 'system_audit_logs'
    ];
BEGIN 
    FOREACH target_table IN ARRAY all_core_tables
    LOOP
        -- Check if the table exists in the current schema before applying constraints
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = target_table) THEN
            
            -- Step A: Ensure 'deleted_at' column exists for Soft Deletes
            IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = target_table AND column_name = 'deleted_at') THEN
                EXECUTE format('ALTER TABLE public.%I ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE;', target_table);
                RAISE NOTICE 'Added deleted_at column to %', target_table;
            END IF;

            -- Step B: Recreate BEFORE DELETE Trigger
            EXECUTE format('DROP TRIGGER IF EXISTS shield_%I_delete ON public.%I', target_table, target_table);
            EXECUTE format('CREATE TRIGGER shield_%I_delete BEFORE DELETE ON public.%I FOR EACH ROW EXECUTE FUNCTION prevent_destruction()', target_table, target_table);
            
            -- Step C: Recreate BEFORE TRUNCATE Trigger
            EXECUTE format('DROP TRIGGER IF EXISTS shield_%I_truncate ON public.%I', target_table, target_table);
            EXECUTE format('CREATE TRIGGER shield_%I_truncate BEFORE TRUNCATE ON public.%I EXECUTE FUNCTION prevent_destruction()', target_table, target_table);

            -- Step D: Ensure queries hide soft-deleted rows by default
            EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', target_table);
            -- Create a permissive policy that only shows rows where deleted_at IS NULL
            EXECUTE format('DROP POLICY IF EXISTS hide_soft_deleted ON public.%I', target_table);
            EXECUTE format('CREATE POLICY hide_soft_deleted ON public.%I FOR ALL USING (deleted_at IS NULL)', target_table);

            RAISE NOTICE '✅ Fortress Protection active on table: %', target_table;
        ELSE
            RAISE NOTICE '⚠️ Skipping table % as it does not exist.', target_table;
        END IF;
    END LOOP;
END $$;

-- 3. (OPTIONAL) AUTOMATED AUDIT TRAIL
-- Tracking who executed the soft-delete
CREATE TABLE IF NOT EXISTS public.system_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name TEXT NOT NULL,
    record_id TEXT,  -- ID of the affected record
    action_type TEXT NOT NULL, -- e.g., 'SOFT_DELETE', 'RESTORE'
    performed_by TEXT, -- Optionally capture current_user
    performed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: In your application code (TypeScript/React), update any DELETE queries to:
-- `supabase.from('table').update({ deleted_at: new Date().toISOString() }).eq('id', id)`

-- 4. REFRESH SUPABASE SCHEMA CACHE
NOTIFY pgrst, 'reload schema';
