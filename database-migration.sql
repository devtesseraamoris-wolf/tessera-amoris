-- ============================================
-- TESSERA AMORIS DATABASE MIGRATION
-- Add Quiz and Waitlist Features
-- ============================================

-- Add quiz-related columns to applications table
ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS quiz_score INTEGER,
ADD COLUMN IF NOT EXISTS quiz_responses JSONB,
ADD COLUMN IF NOT EXISTS quiz_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS quiz_result_category VARCHAR(50),
ADD COLUMN IF NOT EXISTS quiz_time_spent INTEGER; -- in seconds

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_applications_quiz_score ON applications(quiz_score);
CREATE INDEX IF NOT EXISTS idx_applications_quiz_category ON applications(quiz_result_category);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);

-- Add comments for documentation
COMMENT ON COLUMN applications.quiz_score IS 'Total score from pre-screening quiz (0-15)';
COMMENT ON COLUMN applications.quiz_responses IS 'JSON object containing all quiz question responses';
COMMENT ON COLUMN applications.quiz_completed_at IS 'Timestamp when quiz was completed';
COMMENT ON COLUMN applications.quiz_result_category IS 'Result category: highly-aligned, aligned, reflection, not-aligned';
COMMENT ON COLUMN applications.quiz_time_spent IS 'Time spent on quiz in seconds';

-- Create view for quiz analytics
CREATE OR REPLACE VIEW quiz_analytics AS
SELECT 
    quiz_result_category,
    COUNT(*) as total_applicants,
    AVG(quiz_score) as avg_score,
    AVG(quiz_time_spent) as avg_time_seconds,
    COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_count,
    COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected_count,
    COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_count
FROM applications
WHERE quiz_score IS NOT NULL
GROUP BY quiz_result_category
ORDER BY avg_score DESC;

-- Create view for waitlist positions
CREATE OR REPLACE VIEW waitlist_positions AS
SELECT 
    id,
    full_name,
    email,
    quiz_score,
    quiz_result_category,
    status,
    created_at,
    ROW_NUMBER() OVER (ORDER BY created_at ASC) as position
FROM applications
ORDER BY created_at ASC;

-- Create function to get application position
CREATE OR REPLACE FUNCTION get_application_position(app_id UUID)
RETURNS INTEGER AS $$
DECLARE
    app_position INTEGER;
BEGIN
    SELECT position INTO app_position
    FROM waitlist_positions
    WHERE id = app_id;
    
    RETURN app_position;
END;
$$ LANGUAGE plpgsql;

-- Sample queries for admin dashboard

-- Query 1: Get quiz score distribution
-- SELECT 
--     quiz_score,
--     COUNT(*) as count,
--     ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
-- FROM applications
-- WHERE quiz_score IS NOT NULL
-- GROUP BY quiz_score
-- ORDER BY quiz_score DESC;

-- Query 2: Get average quiz scores by result category
-- SELECT * FROM quiz_analytics;

-- Query 3: Get recent applications with position
-- SELECT 
--     position,
--     full_name,
--     email,
--     quiz_score,
--     quiz_result_category,
--     status,
--     created_at
-- FROM waitlist_positions
-- WHERE created_at > NOW() - INTERVAL '7 days'
-- ORDER BY position DESC
-- LIMIT 20;

-- Query 4: Get quiz completion rate
-- SELECT 
--     COUNT(*) as total_applications,
--     COUNT(quiz_score) as completed_quiz,
--     ROUND(COUNT(quiz_score) * 100.0 / COUNT(*), 2) as completion_rate
-- FROM applications;

-- Query 5: Get correlation between quiz score and approval
-- SELECT 
--     quiz_result_category,
--     COUNT(*) as total,
--     COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
--     ROUND(COUNT(CASE WHEN status = 'approved' THEN 1 END) * 100.0 / COUNT(*), 2) as approval_rate
-- FROM applications
-- WHERE quiz_score IS NOT NULL AND status IN ('approved', 'rejected')
-- GROUP BY quiz_result_category
-- ORDER BY approval_rate DESC;

-- ============================================
-- VERIFICATION & TESTING
-- ============================================

-- Verify columns were added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'applications'
AND column_name LIKE 'quiz%'
ORDER BY ordinal_position;

-- Test quiz analytics view
SELECT * FROM quiz_analytics;

-- Test waitlist positions view (limit 10)
SELECT * FROM waitlist_positions LIMIT 10;

-- ============================================
-- ROLLBACK (if needed)
-- ============================================

-- To rollback these changes, uncomment and run:
-- DROP VIEW IF EXISTS quiz_analytics;
-- DROP VIEW IF EXISTS waitlist_positions;
-- DROP FUNCTION IF EXISTS get_application_position(UUID);
-- ALTER TABLE applications 
--     DROP COLUMN IF EXISTS quiz_score,
--     DROP COLUMN IF EXISTS quiz_responses,
--     DROP COLUMN IF EXISTS quiz_completed_at,
--     DROP COLUMN IF EXISTS quiz_result_category,
--     DROP COLUMN IF EXISTS quiz_time_spent;

