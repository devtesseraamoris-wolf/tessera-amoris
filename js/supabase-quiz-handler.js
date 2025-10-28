/**
 * Supabase Quiz Handler
 * Handles submission of pre-screening quiz responses to Supabase
 */

class SupabaseQuizHandler {
    constructor() {
        this.supabase = window.supabaseClient;
        this.sessionId = this.generateSessionId();
        console.log('📝 Supabase Quiz Handler initialized');
        console.log('🔑 Session ID:', this.sessionId);
    }

    /**
     * Generate unique session ID for tracking
     * @returns {string} Unique session identifier
     */
    generateSessionId() {
        return 'quiz_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Calculate score for an answer based on points
     * Points: 3 = 100, 1 = 50, 0 = 0
     * @param {number} points Answer points (0, 1, or 3)
     * @returns {number} Score (0-100)
     */
    calculateScore(points) {
        if (points === 3) return 100;
        if (points === 1) return 50;
        return 0;
    }

    /**
     * Determine result category based on average score
     * @param {number} averageScore Average score (0-100)
     * @returns {string} Result category
     */
    getResultCategory(averageScore) {
        if (averageScore >= 80) return 'Excellent Match';
        if (averageScore >= 60) return 'Good Match';
        if (averageScore >= 40) return 'Moderate Match';
        return 'Limited Match';
    }

    /**
     * Submit quiz responses to Supabase
     * @param {Object} quizData Quiz data with answers and scores
     * @returns {Promise<Object>} {success: boolean, data: Object, error: Object}
     */
    async submitQuizToSupabase(quizData) {
        try {
            console.log('📤 Submitting quiz to Supabase...');
            console.log('Quiz data:', quizData);

            // Calculate scores for each question
            const question1Score = this.calculateScore(quizData.answers[0].points);
            const question2Score = this.calculateScore(quizData.answers[1].points);
            const question3Score = this.calculateScore(quizData.answers[2].points);
            const question4Score = this.calculateScore(quizData.answers[3].points);
            const question5Score = this.calculateScore(quizData.answers[4].points);

            const totalScore = question1Score + question2Score + question3Score + question4Score + question5Score;
            const averageScore = totalScore / 5;

            // Prepare data for Supabase
            const quizResponse = {
                session_id: this.sessionId,
                email: null, // Will be set when application is submitted
                
                question_1_answer: quizData.answers[0].letter,
                question_1_score: question1Score,
                
                question_2_answer: quizData.answers[1].letter,
                question_2_score: question2Score,
                
                question_3_answer: quizData.answers[2].letter,
                question_3_score: question3Score,
                
                question_4_answer: quizData.answers[3].letter,
                question_4_score: question4Score,
                
                question_5_answer: quizData.answers[4].letter,
                question_5_score: question5Score,
                
                total_score: totalScore,
                result_category: this.getResultCategory(averageScore),
                passed: quizData.passed || true,
                quiz_version: '1.0',
                completed_at: new Date().toISOString()
            };

            console.log('📊 Quiz response prepared:', quizResponse);

            // Submit to Supabase
            const { data, error } = await this.supabase
                .from('quiz_responses')
                .insert([quizResponse])
                .select();

            if (error) {
                console.error('❌ Supabase quiz submission error:', error);
                return {
                    success: false,
                    error: error
                };
            }

            console.log('✅ Quiz submitted successfully!');
            console.log('📄 Response data:', data);

            // Store session ID in localStorage for linking with application
            localStorage.setItem('tesseraQuizSessionId', this.sessionId);
            localStorage.setItem('tesseraQuizId', data[0].id);

            return {
                success: true,
                data: data[0],
                error: null
            };

        } catch (err) {
            console.error('❌ Unexpected error during quiz submission:', err);
            return {
                success: false,
                error: {
                    message: 'Unexpected error',
                    details: err.message
                }
            };
        }
    }

    /**
     * Link quiz to application after application is submitted
     * @param {string} email User's email
     * @param {string} applicationId Application UUID
     * @returns {Promise<boolean>} Success status
     */
    async linkQuizToApplication(email, applicationId) {
        try {
            console.log('🔗 Linking quiz to application...');
            console.log('Email:', email);
            console.log('Application ID:', applicationId);
            console.log('Session ID:', this.sessionId);

            // Update quiz_responses with email and application_id
            const { data, error } = await this.supabase
                .from('quiz_responses')
                .update({
                    email: email,
                    application_id: applicationId
                })
                .eq('session_id', this.sessionId)
                .is('application_id', null)
                .select();

            if (error) {
                console.error('❌ Failed to link quiz to application:', error);
                return false;
            }

            if (data && data.length > 0) {
                console.log('✅ Quiz linked to application successfully!');
                return true;
            } else {
                console.warn('⚠️ No quiz found to link (might have been linked already)');
                return false;
            }

        } catch (err) {
            console.error('❌ Error linking quiz to application:', err);
            return false;
        }
    }
}

// Initialize quiz handler
const supabaseQuizHandler = new SupabaseQuizHandler();

// Export to window for access from other scripts
window.supabaseQuizHandler = supabaseQuizHandler;

console.log('✅ Supabase Quiz Handler ready');

