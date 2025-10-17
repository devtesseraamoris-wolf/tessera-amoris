/**
 * TEST MODE - Tessera Amoris
 * Allows end-to-end testing without database connection
 * Remove this file in production or set TEST_MODE = false
 */

// Set to true to enable test mode
const TEST_MODE = true;

// Test mode configuration
const TEST_CONFIG = {
    simulateDelay: 1500, // milliseconds
    mockPosition: Math.floor(Math.random() * 50) + 100, // Random position 100-150
    mockEmail: null // Will use actual form email
};

/**
 * Override submitForm function in test mode
 */
if (TEST_MODE) {
    console.log('%c🧪 TEST MODE ENABLED', 'background: #D4AF37; color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold;');
    console.log('Database connection bypassed. Using mock data for testing.');
    
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        // Override the production submit function
        const originalSubmitForm = window.submitForm;
        
        window.submitForm = async function(e) {
            e.preventDefault();
            
            console.log('🧪 Test Mode: Simulating form submission...');
            
            // Validate current section (keep existing validation)
            if (typeof validateSection === 'function' && !validateSection(currentStep)) {
                return;
            }
            
            // Show loading state
            const submitBtn = document.querySelector('.btn-submit');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            
            try {
                // Collect all form data (for logging/debugging)
                const formData = collectFormData ? collectFormData() : {};
                
                // Get quiz data if available
                let quizData = null;
                if (window.TesseraQuiz && typeof window.TesseraQuiz.getQuizData === 'function') {
                    quizData = window.TesseraQuiz.getQuizData();
                }
                
                // Log collected data
                console.log('📋 Form Data:', formData);
                console.log('🎯 Quiz Data:', quizData);
                
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, TEST_CONFIG.simulateDelay));
                
                // Mock successful response
                const mockResponse = {
                    success: true,
                    message: 'Application submitted successfully (TEST MODE)',
                    applicationId: 'test-' + Date.now(),
                    position: TEST_CONFIG.mockPosition,
                    email: formData.email || TEST_CONFIG.mockEmail || 'test@example.com'
                };
                
                console.log('✅ Mock Response:', mockResponse);
                
                // Clear form data from localStorage
                localStorage.removeItem('tesseraAmorisFormData');
                
                // Clear quiz data
                if (window.TesseraQuiz && typeof window.TesseraQuiz.clearQuizData === 'function') {
                    window.TesseraQuiz.clearQuizData();
                }
                
                // Store position and email for waitlist page
                if (mockResponse.position) {
                    localStorage.setItem('tesseraWaitlistPosition', mockResponse.position);
                }
                if (mockResponse.email) {
                    localStorage.setItem('tesseraUserEmail', mockResponse.email);
                }
                
                // Show success notification
                console.log('%c✅ TEST SUBMISSION SUCCESSFUL', 'background: #4CAF50; color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold;');
                console.log('Redirecting to waitlist confirmation...');
                
                // Redirect to waitlist confirmation page
                window.location.href = `waitlist-confirmation.html?position=${mockResponse.position}&email=${encodeURIComponent(mockResponse.email)}`;
                
            } catch (error) {
                console.error('❌ Test Mode Error:', error);
                
                // Show error message
                alert(`Test Mode Error: ${error.message}`);
                
                // Restore button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        };
        
        // Add test mode indicator to page
        addTestModeIndicator();
    });
}

/**
 * Add visual indicator that test mode is active
 */
function addTestModeIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'test-mode-indicator';
    indicator.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #D4AF37 0%, #B8941F 100%);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(212, 175, 55, 0.4);
            z-index: 10000;
            font-family: 'Montserrat', sans-serif;
            font-size: 14px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
        ">
            <span style="font-size: 18px;">🧪</span>
            TEST MODE
            <span style="
                background: rgba(255, 255, 255, 0.3);
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 11px;
            ">No Database</span>
        </div>
    `;
    document.body.appendChild(indicator);
    
    // Add click to toggle console info
    indicator.addEventListener('click', () => {
        console.log('%c🧪 TEST MODE INFO', 'background: #D4AF37; color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold;');
        console.log('Test Mode Configuration:', TEST_CONFIG);
        console.log('To disable test mode, set TEST_MODE = false in js/test-mode.js');
        console.log('Or remove the script tag from application.html');
    });
}

/**
 * Mock collectFormData function if it doesn't exist
 */
if (typeof collectFormData === 'undefined') {
    window.collectFormData = function() {
        return {
            // Personal Information
            fullName: document.getElementById('full-name')?.value || 'Test User',
            dateOfBirth: document.getElementById('date-of-birth')?.value || '1990-01-01',
            gender: document.querySelector('input[name="gender"]:checked')?.value || 'Male',
            email: document.getElementById('email')?.value || 'test@example.com',
            phone: document.getElementById('phone')?.value || '+1234567890',
            country: document.getElementById('country')?.value || 'Paraguay',
            city: document.getElementById('city')?.value || 'Asunción',
            nationality: document.getElementById('nationality')?.value || 'Paraguayan',
            
            // Faith & Values
            faithTradition: document.getElementById('faith-tradition')?.value || 'Catholic',
            faithImportance: document.querySelector('input[name="faith-importance"]:checked')?.value || 'Very Important',
            churchInvolvement: document.getElementById('church-involvement')?.value || 'Weekly',
            coreValues: ['Faith', 'Family', 'Integrity'],
            
            // Relationship Goals
            maritalStatus: document.getElementById('marital-status')?.value || 'Never Married',
            hasChildren: false,
            childrenCount: 0,
            wantsChildren: true,
            familyVision: 'Building a faith-centered family',
            partnerQualities: 'Faith, integrity, family values',
            
            // Verification
            occupation: document.getElementById('occupation')?.value || 'Professional',
            languages: ['Spanish', 'English'],
            reference1Name: 'Test Reference 1',
            reference1Relationship: 'Friend',
            reference1Email: 'ref1@example.com',
            reference1Phone: '+1234567890',
            reference2Name: 'Test Reference 2',
            reference2Relationship: 'Colleague',
            reference2Email: 'ref2@example.com',
            reference2Phone: '+1234567890'
        };
    };
}

// Export for debugging
window.TEST_MODE_CONFIG = TEST_CONFIG;
window.setTestPosition = function(position) {
    TEST_CONFIG.mockPosition = position;
    console.log('Test position set to:', position);
};

