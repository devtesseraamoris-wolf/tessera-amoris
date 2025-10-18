-- ============================================
-- Tessera Amoris Supabase Schema
-- ============================================
-- Run this script in the Supabase SQL Editor to
-- provision all tables, views, functions, RLS
-- policies, and storage configuration that the
-- application expects.
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================
-- Applications Table
-- =============================
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),

    -- Personal Information
    full_name TEXT NOT NULL,
    date_of_birth DATE,
    gender TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    country TEXT,
    city TEXT,
    nationality TEXT,

    -- Faith & Values
    faith_tradition TEXT,
    faith_importance TEXT,
    church_involvement TEXT,
    core_values JSONB,

    -- Relationship Goals
    marital_status TEXT,
    has_children BOOLEAN,
    children_count INTEGER,
    wants_children BOOLEAN,
    family_vision TEXT,
    partner_qualities TEXT,

    -- Verification
    occupation TEXT,
    languages JSONB,
    photo_url TEXT,
    reference_1_name TEXT,
    reference_1_relationship TEXT,
    reference_1_email TEXT,
    reference_1_phone TEXT,
    reference_2_name TEXT,
    reference_2_relationship TEXT,
    reference_2_email TEXT,
    reference_2_phone TEXT,

    -- Quiz Data
    quiz_score INTEGER,
    quiz_responses JSONB,
    quiz_completed_at TIMESTAMPTZ,
    quiz_result_category TEXT,
    quiz_time_spent INTEGER,

    -- Status & Metadata
    status TEXT NOT NULL DEFAULT 'pending',
    admin_notes TEXT,
    ip_address TEXT,
    user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_applications_email ON public.applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON public.applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_quiz_category ON public.applications(quiz_result_category);
CREATE INDEX IF NOT EXISTS idx_applications_quiz_score ON public.applications(quiz_score);

-- =============================
-- Expansion Interests Table
-- =============================
CREATE TABLE IF NOT EXISTS public.expansion_interests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    region TEXT NOT NULL CHECK (region IN ('americas', 'asia', 'middle_east', 'oceania', 'africa')),
    country TEXT NOT NULL,
    email TEXT,
    user_agent TEXT,
    ip_address INET,
    notified BOOLEAN NOT NULL DEFAULT FALSE,
    notified_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_expansion_interests_region ON public.expansion_interests(region);
CREATE INDEX IF NOT EXISTS idx_expansion_interests_country ON public.expansion_interests(country);
CREATE INDEX IF NOT EXISTS idx_expansion_interests_created_at ON public.expansion_interests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_expansion_interests_email ON public.expansion_interests(email) WHERE email IS NOT NULL;

-- =============================
-- Views & Functions
-- =============================
CREATE OR REPLACE VIEW public.quiz_analytics AS
SELECT
    quiz_result_category,
    COUNT(*) AS total_applicants,
    AVG(quiz_score)::NUMERIC AS avg_score,
    AVG(quiz_time_spent)::NUMERIC AS avg_time_seconds,
    COUNT(*) FILTER (WHERE status = 'approved') AS approved_count,
    COUNT(*) FILTER (WHERE status = 'rejected') AS rejected_count,
    COUNT(*) FILTER (WHERE status = 'pending') AS pending_count
FROM public.applications
WHERE quiz_score IS NOT NULL
GROUP BY quiz_result_category
ORDER BY avg_score DESC;

CREATE OR REPLACE VIEW public.waitlist_positions AS
SELECT
    id,
    full_name,
    email,
    quiz_score,
    quiz_result_category,
    status,
    created_at,
    ROW_NUMBER() OVER (ORDER BY created_at ASC) AS position
FROM public.applications
ORDER BY created_at ASC;

CREATE OR REPLACE FUNCTION public.get_application_position(app_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
    app_position INTEGER;
BEGIN
    SELECT position INTO app_position
    FROM public.waitlist_positions
    WHERE id = app_id;

    RETURN app_position;
END;
$$;

CREATE OR REPLACE VIEW public.expansion_interest_analytics AS
SELECT
    region,
    country,
    COUNT(*) AS interest_count,
    COUNT(DISTINCT email) FILTER (WHERE email IS NOT NULL) AS unique_emails,
    MIN(created_at) AS first_interest,
    MAX(created_at) AS latest_interest,
    COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days') AS last_30_days,
    COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') AS last_7_days
FROM public.expansion_interests
GROUP BY region, country
ORDER BY interest_count DESC;

CREATE OR REPLACE FUNCTION public.get_expansion_priorities(limit_count INT DEFAULT 10)
RETURNS TABLE (
    country TEXT,
    region TEXT,
    total_interest BIGINT,
    recent_interest BIGINT,
    priority_score NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        ei.country,
        ei.region,
        COUNT(*) AS total_interest,
        COUNT(*) FILTER (WHERE ei.created_at > NOW() - INTERVAL '30 days') AS recent_interest,
        (COUNT(*) FILTER (WHERE ei.created_at > NOW() - INTERVAL '30 days') * 0.7 +
         COUNT(*) * 0.3)::NUMERIC AS priority_score
    FROM public.expansion_interests ei
    GROUP BY ei.country, ei.region
    ORDER BY priority_score DESC
    LIMIT limit_count;
END;
$$;

-- =============================
-- Row Level Security & Policies
-- =============================
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expansion_interests ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'applications'
          AND policyname = 'Allow anonymous insert'
    ) THEN
        CREATE POLICY "Allow anonymous insert" ON public.applications
            FOR INSERT TO anon
            WITH CHECK (true);
    END IF;
END;
$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'applications'
          AND policyname = 'Allow anon select for waitlist position'
    ) THEN
        CREATE POLICY "Allow anon select for waitlist position" ON public.applications
            FOR SELECT TO anon
            USING (true);
    END IF;
END;
$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'applications'
          AND policyname = 'Allow service role full access'
    ) THEN
        CREATE POLICY "Allow service role full access" ON public.applications
            FOR ALL TO service_role
            USING (true)
            WITH CHECK (true);
    END IF;
END;
$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'expansion_interests'
          AND policyname = 'Allow anonymous insert'
    ) THEN
        CREATE POLICY "Allow anonymous insert" ON public.expansion_interests
            FOR INSERT TO anon
            WITH CHECK (true);
    END IF;
END;
$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'expansion_interests'
          AND policyname = 'Allow service role full access'
    ) THEN
        CREATE POLICY "Allow service role full access" ON public.expansion_interests
            FOR ALL TO service_role
            USING (true)
            WITH CHECK (true);
    END IF;
END;
$$;

-- =============================
-- Storage Bucket
-- =============================
INSERT INTO storage.buckets (id, name, public)
VALUES ('verification-photos', 'verification-photos', true)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'storage'
          AND tablename = 'objects'
          AND policyname = 'Allow anonymous uploads'
    ) THEN
        CREATE POLICY "Allow anonymous uploads" ON storage.objects
            FOR INSERT TO anon
            WITH CHECK (bucket_id = 'verification-photos');
    END IF;
END;
$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'storage'
          AND tablename = 'objects'
          AND policyname = 'Allow public read'
    ) THEN
        CREATE POLICY "Allow public read" ON storage.objects
            FOR SELECT TO public
            USING (bucket_id = 'verification-photos');
    END IF;
END;
$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'storage'
          AND tablename = 'objects'
          AND policyname = 'Allow service delete'
    ) THEN
        CREATE POLICY "Allow service delete" ON storage.objects
            FOR DELETE TO service_role
            USING (bucket_id = 'verification-photos');
    END IF;
END;
$$;

-- ============================================
-- End of schema
-- ============================================
