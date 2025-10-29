/**
 * EXCEPTIONAL REVIEW SECTION - Data Population
 * Populates the beautiful timeline review section with form data
 */

(function() {
    'use strict';

    // Listen for section transitions
    document.addEventListener('sectionTransitioned', function(event) {
        if (event.detail && event.detail.section === 5) {
            console.log('🎨 Populating exceptional review section...');
            populateExceptionalReview();
        }
    });

    function populateExceptionalReview() {
        const store = window.formDataStore;
        if (!store) {
            console.error('❌ Form data store not found');
            return;
        }

        // Personal Profile
        populatePersonalProfile(store);
        
        // Faith Journey
        populateFaithJourney(store);
        
        // Relationship Vision
        populateRelationshipVision(store);
        
        console.log('✅ Exceptional review section populated');
    }

    function populatePersonalProfile(store) {
        // Full Name
        setText('review-full-name', store.full_name || 'Not provided');
        
        // Date of Birth
        if (store.birth_month && store.birth_day && store.birth_year) {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December'];
            const birthDate = `${months[store.birth_month - 1]} ${store.birth_day}, ${store.birth_year}`;
            setText('review-birth-date', birthDate);
        } else {
            setText('review-birth-date', 'Not provided');
        }
        
        // Gender
        const genderMap = {
            'male': 'Male',
            'female': 'Female',
            'other': 'Other'
        };
        setText('review-gender', genderMap[store.gender] || 'Not provided');
        
        // Email
        setText('review-email', store.email || 'Not provided');
        
        // Phone
        if (store.country_code && store.phone) {
            setText('review-phone', `${store.country_code} ${store.phone}`);
        } else {
            setText('review-phone', 'Not provided');
        }
        
        // Location
        const locationParts = [store.city, store.state, store.country].filter(Boolean);
        setText('review-location', locationParts.length > 0 ? locationParts.join(', ') : 'Not provided');
        
        // Nationality
        setText('review-nationality', store.nationality || 'Not provided');
        
        // Occupation
        setText('review-occupation', store.occupation || 'Not provided');
        
        // Education
        const educationMap = {
            'high-school': 'High School',
            'bachelors': "Bachelor's Degree",
            'masters': "Master's Degree",
            'doctorate': 'Doctorate',
            'other': 'Other'
        };
        setText('review-education', educationMap[store.education] || 'Not provided');
        
        // Languages
        if (Array.isArray(store.languages) && store.languages.length > 0) {
            setText('review-languages', store.languages.join(', '));
        } else {
            setText('review-languages', 'Not provided');
        }
    }

    function populateFaithJourney(store) {
        // Faith Tradition
        const faithMap = {
            'christian-catholic': 'Catholic',
            'christian-protestant': 'Protestant',
            'christian-orthodox': 'Orthodox',
            'christian-other': 'Christian (Other)',
            'other': 'Other'
        };
        setText('review-faith-tradition', faithMap[store.faith_tradition] || 'Not provided');
        
        // Community Involvement
        const involvementMap = {
            'very-active': 'Very Active',
            'active': 'Active',
            'occasional': 'Occasional',
            'minimal': 'Minimal'
        };
        setText('review-community', involvementMap[store.community_involvement] || 'Not provided');
        
        // Faith Importance
        const importanceMap = {
            'essential': 'Essential',
            'very-important': 'Very Important',
            'important': 'Important',
            'somewhat-important': 'Somewhat Important'
        };
        setText('review-faith-importance', importanceMap[store.values_importance] || 'Not provided');
        
        // Faith Journey (textarea)
        setText('review-faith-journey', store.values_journey || 'Not provided');
        
        // Family Vision (textarea)
        setText('review-family-vision', store.family_vision || 'Not provided');
    }

    function populateRelationshipVision(store) {
        // Relationship Goal
        const goalMap = {
            'marriage': 'Marriage',
            'courtship': 'Courtship leading to marriage',
            'friendship': 'Friendship first',
            'open': 'Open to possibilities'
        };
        setText('review-relationship-goal', goalMap[store.relationship_goal] || 'Not provided');
        
        // Previously Married
        const yesNoMap = {
            'yes': 'Yes',
            'no': 'No'
        };
        setText('review-previous-marriage', yesNoMap[store.previous_marriage] || 'Not provided');
        
        // Have Children
        setText('review-have-children', yesNoMap[store.have_children] || 'Not provided');
        
        // Want Children
        const wantChildrenMap = {
            'yes': 'Yes, definitely',
            'maybe': 'Maybe/Open to discussion',
            'no': 'No'
        };
        setText('review-want-children', wantChildrenMap[store.want_children] || 'Not provided');
        
        // Partner Age Range
        setText('review-partner-age', store.partner_age_range || 'Not provided');
        
        // Willing to Relocate
        const relocationMap = {
            'yes': 'Yes, willing to relocate',
            'maybe': 'Open to discussion',
            'no': 'Prefer to stay in current location'
        };
        setText('review-relocation', relocationMap[store.relocation_willingness] || 'Not provided');
        
        // Partner Qualities (textarea)
        const partnerQualities = document.getElementById('partner-qualities');
        if (partnerQualities && partnerQualities.value) {
            setText('review-partner-qualities', partnerQualities.value);
        } else {
            setText('review-partner-qualities', 'Not provided');
        }
    }

    function setText(elementId, text) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = text;
        }
    }

    // Edit button functionality
    document.addEventListener('click', function(event) {
        if (event.target.closest('.edit-button')) {
            const button = event.target.closest('.edit-button');
            const sectionNum = button.getAttribute('data-edit-section');
            
            if (sectionNum && window.tesseraFormControl) {
                window.tesseraFormControl.transitionToSection(parseInt(sectionNum));
            }
        }
    });

    // Make function globally available
    window.populateExceptionalReview = populateExceptionalReview;

})();

