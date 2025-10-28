/**
 * Supabase Form Submission Handler
 * Tessera Amoris Application
 * 
 * This script handles collecting form data and submitting it to Supabase
 */

class SupabaseFormHandler {
    constructor() {
        this.supabase = window.supabaseClient;
        this.formData = {};
        console.log('📝 Supabase Form Handler initialized');
    }

    /**
     * Collect all form data from the application
     * @returns {Object} Complete form data object
     */
    collectFormData() {
        const data = {};

        // SECTION 1: Personal Information
        data.full_name = document.getElementById('full-name')?.value || '';
        
        // Date of birth - combine month, day, year
        const birthMonth = document.getElementById('birth-month')?.value || '';
        const birthDay = document.getElementById('birth-day')?.value || '';
        const birthYear = document.getElementById('birth-year')?.value || '';
        if (birthMonth && birthDay && birthYear) {
            data.date_of_birth = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;
        }
        
        data.gender = document.getElementById('gender')?.value || '';
        data.email = document.getElementById('email')?.value || '';
        
        // Phone with country code
        const countryCode = document.getElementById('country-code')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        data.phone = `${countryCode} ${phone}`.trim();
        data.country_code = countryCode;
        
        data.country = document.getElementById('country')?.value || '';
        data.state = document.getElementById('state')?.value || '';
        data.city = document.getElementById('city')?.value || '';
        data.nationality = document.getElementById('nationality')?.value || '';
        data.occupation = document.getElementById('occupation')?.value || '';
        data.education = document.getElementById('education')?.value || '';
        
        // Languages - collect from hidden field (should be JSON array)
        const languagesValue = document.getElementById('languages')?.value || '[]';
        try {
            data.languages = JSON.parse(languagesValue);
        } catch (e) {
            data.languages = [];
        }

        // SECTION 2: Faith & Values
        data.faith_tradition = document.getElementById('faith-tradition')?.value || '';
        data.faith_custom = document.getElementById('faith-custom')?.value || '';
        data.community_involvement = document.getElementById('community-involvement')?.value || '';
        data.values_importance = document.getElementById('values-importance')?.value || '';
        data.values_journey = document.getElementById('values-journey')?.value || '';
        
        // Core values - collect selected values
        const coreValues = [];
        document.querySelectorAll('.value-card.selected').forEach(card => {
            coreValues.push({
                id: card.dataset.value,
                name: card.querySelector('.value-name')?.textContent || ''
            });
        });
        data.core_values = coreValues;
        
        data.family_vision = document.getElementById('family-vision')?.value || '';

        // SECTION 3: Relationship Preferences
        data.relationship_goal = document.getElementById('relationship-goal')?.value || '';
        data.previous_marriage = document.getElementById('previous-marriage')?.value || '';
        data.have_children = document.getElementById('have-children')?.value || '';
        data.want_children = document.getElementById('want-children')?.value || '';
        data.partner_location_preference = document.getElementById('partner-location')?.value || '';
        
        // Partner age range
        const ageRangeElement = document.getElementById('partner-age-range');
        if (ageRangeElement) {
            const ageRange = ageRangeElement.value || '';
            const match = ageRange.match(/(\d+)-(\d+)/);
            if (match) {
                data.partner_age_min = parseInt(match[1]);
                data.partner_age_max = parseInt(match[2]);
            }
        }
        
        data.relocation_willingness = document.getElementById('relocation')?.value || '';
        
        // Lifestyle preferences - collect selected checkboxes
        const lifestylePrefs = {
            family_planning: [],
            career: [],
            interests: []
        };
        
        document.querySelectorAll('input[name="lifestyle-family"]:checked').forEach(cb => {
            lifestylePrefs.family_planning.push(cb.value);
        });
        document.querySelectorAll('input[name="lifestyle-career"]:checked').forEach(cb => {
            lifestylePrefs.career.push(cb.value);
        });
        document.querySelectorAll('input[name="lifestyle-interests"]:checked').forEach(cb => {
            lifestylePrefs.interests.push(cb.value);
        });
        
        data.lifestyle_preferences = lifestylePrefs;
        data.partner_qualities = document.getElementById('partner-qualities')?.value || '';

        // SECTION 4: Verification
        data.background_check_consent = document.getElementById('background-check')?.checked || false;
        // Note: File uploads would be handled separately and URLs stored here
        data.verification_photo_url = null;
        data.identity_document_url = null;

        // SECTION 5: Review & Agreements
        data.terms_agreement = document.getElementById('terms-agreement')?.checked || false;
        data.privacy_agreement = document.getElementById('privacy-agreement')?.checked || false;
        data.submitted_at = new Date().toISOString();

        // Set initial status
        data.status = 'pending';

        this.formData = data;
        return data;
    }

    /**
     * Validate form data before submission
     * @param {Object} data Form data to validate
     * @returns {Object} {valid: boolean, errors: Array}
     */
    validateFormData(data) {
        const errors = [];

        // Required fields validation
        const requiredFields = [
            'full_name', 'date_of_birth', 'gender', 'email', 'phone',
            'country', 'nationality', 'occupation', 'education',
            'values_importance', 'relationship_goal', 'previous_marriage',
            'have_children', 'want_children', 'relocation_willingness'
        ];

        requiredFields.forEach(field => {
            if (!data[field] || data[field] === '') {
                errors.push(`Missing required field: ${field}`);
            }
        });

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.email && !emailRegex.test(data.email)) {
            errors.push('Invalid email format');
        }

        // Agreements validation
        if (!data.terms_agreement) {
            errors.push('Terms and conditions must be accepted');
        }
        if (!data.privacy_agreement) {
            errors.push('Privacy policy must be accepted');
        }

        // Background check consent validation
        if (!data.background_check_consent) {
            errors.push('Background check consent is required');
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Submit form data to Supabase
     * @returns {Promise<Object>} {success: boolean, data: Object, error: Object}
     */
    async submitToSupabase() {
        try {
            console.log('📤 Collecting form data...');
            const formData = this.collectFormData();

            console.log('✅ Form data collected:', formData);

            console.log('🔍 Validating form data...');
            const validation = this.validateFormData(formData);

            if (!validation.valid) {
                console.error('❌ Validation failed:', validation.errors);
                return {
                    success: false,
                    error: {
                        message: 'Validation failed',
                        details: validation.errors
                    }
                };
            }

            console.log('✅ Validation passed');
            console.log('📤 Submitting to Supabase...');

            const { data, error } = await this.supabase
                .from('applications')
                .insert([formData])
                .select();

            if (error) {
                console.error('❌ Supabase submission error:', error);
                return {
                    success: false,
                    error: error
                };
            }

            console.log('✅ Application submitted successfully!');
            console.log('📄 Response data:', data);

            return {
                success: true,
                data: data[0],
                error: null
            };

        } catch (err) {
            console.error('❌ Unexpected error during submission:', err);
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
     * Handle form submission with UI feedback
     */
    async handleFormSubmission() {
        // Show loading state
        const submitButton = document.querySelector('.submit-application-btn');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
        }

        const result = await this.submitToSupabase();

        if (result.success) {
            // Show success message
            this.showSuccessMessage(result.data);
        } else {
            // Show error message
            this.showErrorMessage(result.error);
            
            // Re-enable submit button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit Application';
            }
        }

        return result;
    }

    /**
     * Show success message to user
     * @param {Object} data Submitted application data
     */
    showSuccessMessage(data) {
        alert(`✅ Application submitted successfully!\n\nApplication ID: ${data.id}\n\nWe'll review your application and contact you at ${data.email}.`);
        
        // Optionally redirect to a success page
        // window.location.href = '/success.html';
    }

    /**
     * Show error message to user
     * @param {Object} error Error object
     */
    showErrorMessage(error) {
        let errorMessage = '❌ Failed to submit application.\n\n';
        
        if (error.details && Array.isArray(error.details)) {
            errorMessage += 'Please fix the following issues:\n';
            error.details.forEach(err => {
                errorMessage += `• ${err}\n`;
            });
        } else {
            errorMessage += error.message || 'An unexpected error occurred.';
        }
        
        alert(errorMessage);
    }
}

// Initialize form handler
const supabaseFormHandler = new SupabaseFormHandler();

// Export to window for access from other scripts
window.supabaseFormHandler = supabaseFormHandler;

console.log('✅ Supabase Form Handler ready');

