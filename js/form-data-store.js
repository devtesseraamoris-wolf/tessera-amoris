/**
 * Global Form Data Store
 * Stores all form data to prevent loss when sections are hidden
 * This ensures data persists across section transitions
 */

(function() {
    'use strict';

    // Initialize global data store
    window.formDataStore = {
        // Section 1: Personal Information
        full_name: '',
        birth_month: '',
        birth_day: '',
        birth_year: '',
        gender: '',
        email: '',
        country_code: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        nationality: '',
        occupation: '',
        education: '',
        languages: [],
        
        // Section 2: Faith & Values
        faith_tradition: '',
        community_involvement: '',
        values_importance: '',
        values_journey: '',
        family_vision: '',
        core_values: [],
        
        // Section 3: Relationship Preferences
        relationship_goal: '',
        previous_marriage: '',
        have_children: '',
        want_children: '',
        partner_location: '',
        partner_age_range: '',
        relocation_willingness: '',
        
        // Section 4: Verification
        background_check_consent: false,
        
        // Section 5: Terms & Conditions
        terms_agreement: false,
        privacy_agreement: false
    };

    // Field ID to store key mapping
    const fieldMapping = {
        'full-name': 'full_name',
        'birth-month': 'birth_month',
        'birth-day': 'birth_day',
        'birth-year': 'birth_year',
        'gender': 'gender',
        'email': 'email',
        'country-code': 'country_code',
        'phone': 'phone',
        'country': 'country',
        'state': 'state',
        'city': 'city',
        'nationality': 'nationality',
        'occupation': 'occupation',
        'education': 'education',
        'languages': 'languages',
        'faith-tradition': 'faith_tradition',
        'community-involvement': 'community_involvement',
        'values-importance': 'values_importance',
        'values-journey': 'values_journey',
        'family-vision': 'family_vision',
        'relationship-goal': 'relationship_goal',
        'previous-marriage': 'previous_marriage',
        'have-children': 'have_children',
        'want-children': 'want_children',
        'partner-location': 'partner_location',
        'partner-age-range': 'partner_age_range',
        'relocation': 'relocation_willingness',
        'verification-consent': 'background_check_consent',
        'terms-agreement': 'terms_agreement',
        'privacy-agreement': 'privacy_agreement'
    };

    /**
     * Save a field value to the data store
     */
    function saveFieldToStore(fieldId, value) {
        const storeKey = fieldMapping[fieldId];
        if (storeKey) {
            // Don't save empty values (except for checkboxes which can be false)
            if (value === '' || value === null || value === undefined) {
                // Only skip if it's not a checkbox (checkboxes can be false)
                if (typeof value !== 'boolean') {
                    console.log(`⏭️  Skipped empty value for: ${storeKey}`);
                    return;
                }
            }
            
            // Don't overwrite existing non-empty values with empty values
            if ((value === '' || value === null || value === undefined) && window.formDataStore[storeKey]) {
                console.log(`⏭️  Skipped overwriting ${storeKey} with empty value`);
                return;
            }
            
            window.formDataStore[storeKey] = value;
            console.log(`💾 Saved to store: ${storeKey} = ${typeof value === 'object' ? JSON.stringify(value) : value}`);
            
            // Dispatch event for other components to react
            const event = new CustomEvent('formDataUpdated', {
                detail: { field: storeKey, value: value }
            });
            document.dispatchEvent(event);
        }
    }

    /**
     * Get a field value from the data store
     */
    window.getFromDataStore = function(storeKey) {
        return window.formDataStore[storeKey];
    };

    /**
     * Attach listeners to all form fields
     */
    function attachFieldListeners() {
        // Regular inputs, selects, and textareas
        document.querySelectorAll('input, select, textarea').forEach(field => {
            if (!field.id) return; // Skip fields without IDs
            
            // Use 'change' for checkboxes, radios, and selects; 'input' for text fields
            const eventType = (field.type === 'checkbox' || field.type === 'radio' || field.tagName === 'SELECT') ? 'change' : 'input';
            
            field.addEventListener(eventType, (e) => {
                let value;
                
                if (e.target.type === 'checkbox') {
                    value = e.target.checked;
                } else if (e.target.type === 'radio') {
                    value = e.target.value;
                } else {
                    value = e.target.value;
                }
                
                saveFieldToStore(e.target.id, value);
            });
            
            // Also save on blur to catch any missed changes
            field.addEventListener('blur', (e) => {
                let value;
                
                if (e.target.type === 'checkbox') {
                    value = e.target.checked;
                } else {
                    value = e.target.value;
                }
                
                saveFieldToStore(e.target.id, value);
            });
        });
        
        console.log('✅ Form Data Store: Listeners attached to all fields');
    }

    /**
     * Special handler for custom components (occupation, languages, etc.)
     */
    function attachCustomComponentListeners() {
        // Occupation selector
        const occupationObserver = new MutationObserver((mutations) => {
            const occupationInput = document.getElementById('occupation');
            if (occupationInput && occupationInput.value) {
                saveFieldToStore('occupation', occupationInput.value);
            }
        });
        
        const occupationContainer = document.querySelector('.occupation-selector-container');
        if (occupationContainer) {
            occupationObserver.observe(occupationContainer, {
                childList: true,
                subtree: true,
                attributes: true
            });
        }
        
        // Languages selector
        const languagesObserver = new MutationObserver((mutations) => {
            const languagesInput = document.getElementById('languages');
            if (languagesInput && languagesInput.value) {
                try {
                    const langs = JSON.parse(languagesInput.value);
                    saveFieldToStore('languages', langs);
                } catch (e) {
                    // Not valid JSON yet
                }
            }
        });
        
        const languagesContainer = document.querySelector('.elegant-languages-selector');
        if (languagesContainer) {
            languagesObserver.observe(languagesContainer, {
                childList: true,
                subtree: true,
                attributes: true
            });
        }
        
        console.log('✅ Form Data Store: Custom component listeners attached');
    }

    /**
     * Load initial values from form fields (if any)
     */
    function loadInitialValues() {
        Object.keys(fieldMapping).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                let value;
                if (field.type === 'checkbox') {
                    value = field.checked;
                } else {
                    value = field.value;
                }
                
                if (value) {
                    saveFieldToStore(fieldId, value);
                }
            }
        });
        
        console.log('✅ Form Data Store: Initial values loaded');
    }

    /**
     * Debug function to view current store state
     */
    window.viewDataStore = function() {
        console.log('%c📊 Current Data Store State', 'background: #4CAF50; color: white; padding: 5px; font-weight: bold;');
        console.log(JSON.stringify(window.formDataStore, null, 2));
        return window.formDataStore;
    };

    /**
     * Initialize the data store system
     */
    function init() {
        console.log('🚀 Initializing Form Data Store...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    attachFieldListeners();
                    attachCustomComponentListeners();
                    loadInitialValues();
                }, 1000); // Wait for other components to initialize
            });
        } else {
            setTimeout(() => {
                attachFieldListeners();
                attachCustomComponentListeners();
                loadInitialValues();
            }, 1000);
        }
    }

    // Start initialization
    init();

    console.log('✅ Form Data Store loaded!');
    console.log('💡 Type viewDataStore() to see current state');

})();

