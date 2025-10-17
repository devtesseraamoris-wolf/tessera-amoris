-- Database Migration: Expansion Interests Table
-- Tracks interest from countries outside Paraguay-Europe

-- Create expansion_interests table
CREATE TABLE IF NOT EXISTS expansion_interests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    region VARCHAR(50) NOT NULL,
    country VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Metadata
    user_agent TEXT,
    ip_address INET,
    
    -- Analytics
    notified BOOLEAN DEFAULT FALSE,
    notified_at TIMESTAMP WITH TIME ZONE,
    
    -- Indexes
    CONSTRAINT expansion_interests_region_check 
        CHECK (region IN ('americas', 'asia', 'middle_east', 'oceania', 'africa'))
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_expansion_interests_region ON expansion_interests(region);
CREATE INDEX IF NOT EXISTS idx_expansion_interests_country ON expansion_interests(country);
CREATE INDEX IF NOT EXISTS idx_expansion_interests_created_at ON expansion_interests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_expansion_interests_email ON expansion_interests(email) WHERE email IS NOT NULL;

-- Create view for expansion analytics
CREATE OR REPLACE VIEW expansion_interest_analytics AS
SELECT 
    region,
    country,
    COUNT(*) as interest_count,
    COUNT(DISTINCT email) FILTER (WHERE email IS NOT NULL) as unique_emails,
    MIN(created_at) as first_interest,
    MAX(created_at) as latest_interest,
    COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days') as last_30_days,
    COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as last_7_days
FROM expansion_interests
GROUP BY region, country
ORDER BY interest_count DESC;

-- Create function to get top expansion priorities
CREATE OR REPLACE FUNCTION get_expansion_priorities(limit_count INT DEFAULT 10)
RETURNS TABLE (
    country VARCHAR(100),
    region VARCHAR(50),
    total_interest BIGINT,
    recent_interest BIGINT,
    priority_score NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ei.country,
        ei.region,
        COUNT(*) as total_interest,
        COUNT(*) FILTER (WHERE ei.created_at > NOW() - INTERVAL '30 days') as recent_interest,
        -- Priority score: 70% recent + 30% total
        (COUNT(*) FILTER (WHERE ei.created_at > NOW() - INTERVAL '30 days') * 0.7 + 
         COUNT(*) * 0.3)::NUMERIC as priority_score
    FROM expansion_interests ei
    GROUP BY ei.country, ei.region
    ORDER BY priority_score DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Add comment
COMMENT ON TABLE expansion_interests IS 'Tracks interest from users in countries outside our current Paraguay-Europe focus';
COMMENT ON VIEW expansion_interest_analytics IS 'Analytics view for expansion planning and prioritization';
COMMENT ON FUNCTION get_expansion_priorities IS 'Returns top countries for expansion based on interest and recency';

-- Sample query to check expansion priorities
-- SELECT * FROM get_expansion_priorities(20);

-- Sample query to see regional breakdown
-- SELECT region, COUNT(*) as total, COUNT(DISTINCT country) as unique_countries
-- FROM expansion_interests
-- GROUP BY region
-- ORDER BY total DESC;

