-- ============================================================
-- ALPHERY OS — Enterprise Chat Schema (Production-Grade)
-- Designed for: Zoho Cliq / Odoo Discuss / WhatsApp Level
-- ============================================================

-- 1. CONVERSATIONS TABLE
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('direct', 'group', 'channel')),
    name TEXT,
    description TEXT,
    avatar_url TEXT,
    created_by TEXT,
    is_archived BOOLEAN DEFAULT false,
    is_pinned BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. CONVERSATION MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.conversation_members (
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
    is_muted BOOLEAN DEFAULT false,
    is_pinned BOOLEAN DEFAULT false,
    joined_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    last_cleared_at TIMESTAMPTZ DEFAULT '1970-01-01' NOT NULL,
    last_read_at TIMESTAMPTZ DEFAULT '1970-01-01' NOT NULL,
    PRIMARY KEY (conversation_id, user_id)
);

-- 3. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
    tenant_id TEXT NOT NULL,
    sender_id TEXT NOT NULL,
    content TEXT NOT NULL,
    file_url TEXT,
    file_name TEXT,
    file_type TEXT,
    type TEXT DEFAULT 'text' CHECK (type IN ('text', 'image', 'file', 'system', 'reply')),
    reply_to UUID REFERENCES public.messages(id) ON DELETE SET NULL,
    is_edited BOOLEAN DEFAULT false,
    is_deleted BOOLEAN DEFAULT false,
    deleted_for JSONB DEFAULT '[]'::jsonb,
    is_pinned BOOLEAN DEFAULT false,
    reactions JSONB DEFAULT '{}'::jsonb,
    mentions TEXT[] DEFAULT '{}',
    edited_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 4. TYPING INDICATORS TABLE (Ephemeral — used for realtime only)
CREATE TABLE IF NOT EXISTS public.typing_indicators (
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    PRIMARY KEY (conversation_id, user_id)
);

-- 5. USER PRESENCE TABLE
CREATE TABLE IF NOT EXISTS public.user_presence (
    user_id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    status TEXT DEFAULT 'offline' CHECK (status IN ('online', 'away', 'busy', 'on_leave', 'offline')),
    last_seen TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ============================================================
-- INDICES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_conversations_tenant_id ON public.conversations(tenant_id);
CREATE INDEX IF NOT EXISTS idx_conversations_type ON public.conversations(type);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_reply_to ON public.messages(reply_to);
CREATE INDEX IF NOT EXISTS idx_conversation_members_user_id ON public.conversation_members(user_id);
CREATE INDEX IF NOT EXISTS idx_user_presence_tenant ON public.user_presence(tenant_id);
CREATE INDEX IF NOT EXISTS idx_typing_indicators_conv ON public.typing_indicators(conversation_id);

-- ============================================================
-- RLS POLICIES (MVP — Permissive for Custom GSheet Auth)
-- ============================================================
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.typing_indicators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_presence ENABLE ROW LEVEL SECURITY;

-- Drop old policies if any
DROP POLICY IF EXISTS select_conversations ON public.conversations;
DROP POLICY IF EXISTS allow_all_conversations ON public.conversations;
DROP POLICY IF EXISTS allow_all_members ON public.conversation_members;
DROP POLICY IF EXISTS allow_all_messages ON public.messages;

-- Permissive policies for MVP
CREATE POLICY allow_all_conversations ON public.conversations FOR ALL USING (true);
CREATE POLICY allow_all_members ON public.conversation_members FOR ALL USING (true);
CREATE POLICY allow_all_messages ON public.messages FOR ALL USING (true);
CREATE POLICY allow_all_typing ON public.typing_indicators FOR ALL USING (true);
CREATE POLICY allow_all_presence ON public.user_presence FOR ALL USING (true);

-- ============================================================
-- STORAGE BUCKET
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('chat-attachments', 'chat-attachments', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'chat-attachments' );
CREATE POLICY "Public Upload" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'chat-attachments' );

-- ============================================================
-- REALTIME
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.conversation_members;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.typing_indicators;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_presence;

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Auto-update updated_at on conversations
CREATE OR REPLACE FUNCTION update_conversation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.conversations SET updated_at = now() WHERE id = NEW.conversation_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER on_new_message_update_conv
AFTER INSERT ON public.messages
FOR EACH ROW EXECUTE FUNCTION update_conversation_timestamp();

-- Cleanup old typing indicators (older than 10s)
CREATE OR REPLACE FUNCTION cleanup_typing_indicators()
RETURNS void AS $$
BEGIN
    DELETE FROM public.typing_indicators WHERE updated_at < now() - interval '10 seconds';
END;
$$ LANGUAGE plpgsql;
