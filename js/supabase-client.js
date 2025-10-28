/**
 * Supabase Client Configuration
 * Tessera Amoris Application
 */

// Supabase configuration
const SUPABASE_URL = 'https://ckfyonjjdsqnbjewxcns.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrZnlvbmpqZHNxbmJqZXd4Y25zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MDk0ODYsImV4cCI6MjA3NjA4NTQ4Nn0.vmK7_X_oYVyyj1PDsbWADbwDgS9bB2EweGeB6iimzbo';

// Initialize Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Log initialization
console.log('✅ Supabase client initialized');
console.log('📍 Project URL:', SUPABASE_URL);

// Export for use in other scripts
window.supabaseClient = supabaseClient;

/**
 * Test database connection
 * @returns {Promise<boolean>} True if connection successful
 */
async function testSupabaseConnection() {
    try {
        const { data, error } = await supabaseClient
            .from('applications')
            .select('count')
            .limit(1);
        
        if (error) {
            console.error('❌ Supabase connection test failed:', error.message);
            return false;
        }
        
        console.log('✅ Supabase connection test successful');
        return true;
    } catch (err) {
        console.error('❌ Supabase connection error:', err);
        return false;
    }
}

// Test connection on load (only in non-test mode)
if (!window.location.search.includes('test=true')) {
    testSupabaseConnection();
}

