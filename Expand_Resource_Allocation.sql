-- ALPHREY ENGINE: EXPANDED RESOURCE ALLOCATION SCHEMA
-- Adds 20 strategic allocation columns to the projects table

DO $$ 
BEGIN 
    -- Adding new allocation columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_leadership') THEN
        ALTER TABLE projects ADD COLUMN alloc_leadership INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_strategy_planning') THEN
        ALTER TABLE projects ADD COLUMN alloc_strategy_planning INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_business_analysis') THEN
        ALTER TABLE projects ADD COLUMN alloc_business_analysis INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_product_mgmt') THEN
        ALTER TABLE projects ADD COLUMN alloc_product_mgmt INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_project_mgmt') THEN
        ALTER TABLE projects ADD COLUMN alloc_project_mgmt INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_designing') THEN
        ALTER TABLE projects ADD COLUMN alloc_designing INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_developing') THEN
        ALTER TABLE projects ADD COLUMN alloc_developing INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_data_ai') THEN
        ALTER TABLE projects ADD COLUMN alloc_data_ai INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_infra_devops') THEN
        ALTER TABLE projects ADD COLUMN alloc_infra_devops INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_security_compliance') THEN
        ALTER TABLE projects ADD COLUMN alloc_security_compliance INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_testing_qa') THEN
        ALTER TABLE projects ADD COLUMN alloc_testing_qa INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_deployment_impl') THEN
        ALTER TABLE projects ADD COLUMN alloc_deployment_impl INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_support_maint') THEN
        ALTER TABLE projects ADD COLUMN alloc_support_maint INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_sales_mktg') THEN
        ALTER TABLE projects ADD COLUMN alloc_sales_mktg INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_customer_success') THEN
        ALTER TABLE projects ADD COLUMN alloc_customer_success INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_hr') THEN
        ALTER TABLE projects ADD COLUMN alloc_hr INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_finance_accounts') THEN
        ALTER TABLE projects ADD COLUMN alloc_finance_accounts INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_legal_gov') THEN
        ALTER TABLE projects ADD COLUMN alloc_legal_gov INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_procurement_admin') THEN
        ALTER TABLE projects ADD COLUMN alloc_procurement_admin INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='alloc_research_innovation') THEN
        ALTER TABLE projects ADD COLUMN alloc_research_innovation INTEGER DEFAULT 0;
    END IF;

    -- Optional: Remove old columns if they are no longer needed
    -- ALTER TABLE projects DROP COLUMN IF EXISTS alloc_eng;
    -- ALTER TABLE projects DROP COLUMN IF EXISTS alloc_design;
    -- ALTER TABLE projects DROP COLUMN IF EXISTS alloc_strategy;

END $$;

-- Refresh Schema Cache
NOTIFY pgrst, 'reload schema';
