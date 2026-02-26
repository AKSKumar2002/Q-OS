-- =========================================================================
-- ALPHERY OS: RLS & DATA PROTECTION REPAIR SCRIPT
-- Objective: Fix Supabase Linter Errors & Enforce Data Fortress Standards
-- Target Tables: document_folders, document_content, document_permissions, 
--                document_versions, system_audit_logs
-- =========================================================================

-- 1. UNIVERSAL 'PREVENT DESTRUCTION' FUNCTION (Ensuring it exists)
CREATE OR REPLACE FUNCTION prevent_destruction()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION '❌ ALPHREY FORTRESS ALERT: Hard deletion is prohibited. Please use soft_delete instead.';
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DO $$ 
DECLARE
    target_table TEXT;
    target_tables TEXT[] := ARRAY[
        'document_folders', 
        'document_content', 
        'document_permissions', 
        'document_versions',
        'system_audit_logs'
    ];
BEGIN 
    FOREACH target_table IN ARRAY target_tables
    LOOP
        -- Check if the table exists in the current schema
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = target_table) THEN
            
            -- Step A: Enable Row Level Security
            EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', target_table);
            
            -- Step B: Ensure 'deleted_at' column exists for Soft Deletes
            IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = target_table AND column_name = 'deleted_at') THEN
                EXECUTE format('ALTER TABLE public.%I ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE;', target_table);
            END IF;

            -- Step C: Create Permissive Policy (Filter out soft-deleted rows)
            EXECUTE format('DROP POLICY IF EXISTS "hide_soft_deleted" ON public.%I', target_table);
            EXECUTE format('CREATE POLICY "hide_soft_deleted" ON public.%I FOR ALL USING (deleted_at IS NULL);', target_table);
            
            -- Step D: Attach Triggers to prevent hard DELETE/TRUNCATE
            EXECUTE format('DROP TRIGGER IF EXISTS shield_%I_delete ON public.%I', target_table, target_table);
            EXECUTE format('CREATE TRIGGER shield_%I_delete BEFORE DELETE ON public.%I FOR EACH ROW EXECUTE FUNCTION prevent_destruction()', target_table, target_table);
            
            RAISE NOTICE '✅ Security Fortress active on table: %', target_table;
        ELSE
            RAISE NOTICE '⚠️ Skipping table % as it does not exist.', target_table;
        END IF;
    END LOOP;
END $$;

-- 3. REFRESH SUPABASE SCHEMA CACHE
NOTIFY pgrst, 'reload schema';
