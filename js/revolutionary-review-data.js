/**
 * REVOLUTIONARY REVIEW - Data Population
 * 
 * Populates the revolutionary review section with form data
 * Includes fallbacks and error handling
 * 
 * Author: High Web Strategist & Marketing Expert
 * Date: October 29, 2025
 */

(function() {
    'use strict';

    console.log('🚀 Revolutionary Review Data Handler Loaded');

    // Listen for section transitions
    document.addEventListener('sectionTransitioned', function(event) {
        if (event.detail && event.detail.section === 6) {
            console.log('🎨 Populating revolutionary review section...');
            setTimeout(populateRevolutionaryReview, 300); // Small delay for DOM rendering
        }
    });

    // Also trigger on direct navigation to section 6
    document.addEventListener('DOMContentLoaded', function() {
        // Check if we're already on section 6
        const section6 = document.querySelector('.form-section[data-section="6"]');
        if (section6 && section6.classList.contains('active')) {
            console.log('🎨 Already on section 6, populating...');
            setTimeout(populateRevolutionaryReview, 500);
        }
    });

    function populateRevolutionaryReview() {
        console.log('📊 Starting data population...');
        
        // Populate all sections
        populateVisionHero();
        populateSnapshotCards();
        populateWhyHere();
        populateValues();
        populateMatchCriteria();
        populateDetailedReview();
        setTodayDate();
        
        // Initialize toggle button
        initializeToggleButton();
        
        console.log('✅ Revolutionary review section populated');
    }

    function populateVisionHero() {
        const store = window.formDataStore || {};
        const legacyVision = store.legacy_vision || getFieldValue('legacy-vision');
        
        const quoteElement = document.getElementById('review-legacy-vision-quote');
        if (quoteElement) {
            if (legacyVision && legacyVision.trim()) {
                quoteElement.textContent = legacyVision;
            } else {
                quoteElement.textContent = 'Your vision for a meaningful legacy and lasting relationship...';
                quoteElement.style.opacity = '0.6';
            }
        }
    }

    function populateSnapshotCards() {
        const store = window.formDataStore || {};
        
        // Name
        const name = store.full_name || getFieldValue('full-name');
        setText('snapshot-name', name || 'Your Name');
        
        // Age (calculate from birth date)
        let age = '—';
        if (store.birth_year) {
            const currentYear = new Date().getFullYear();
            age = currentYear - parseInt(store.birth_year);
        } else {
            const birthYear = getFieldValue('birth-year');
            if (birthYear) {
                const currentYear = new Date().getFullYear();
                age = currentYear - parseInt(birthYear);
            }
        }
        setText('snapshot-age', age !== '—' ? `${age} years old` : 'Age');
        
        // Location
        const city = store.city || getFieldValue('city');
        const country = store.country || getFieldValue('country');
        let location = '—';
        if (city && country) {
            location = `${city}, ${country}`;
        } else if (city) {
            location = city;
        } else if (country) {
            location = country;
        }
        setText('snapshot-location', location !== '—' ? location : 'Your Location');
        
        // Occupation
        const occupation = store.occupation || getFieldValue('occupation');
        setText('snapshot-occupation', occupation || 'Your Occupation');
    }

    function populateWhyHere() {
        const store = window.formDataStore || {};
        const whyNow = store.why_now || getFieldValue('why-now');
        
        const quoteElement = document.getElementById('review-why-now-quote');
        if (quoteElement) {
            if (whyNow && whyNow.trim()) {
                quoteElement.textContent = whyNow;
            } else {
                quoteElement.textContent = 'Your reason for taking this step toward a meaningful relationship...';
                quoteElement.style.opacity = '0.6';
            }
        }
    }

    function populateValues() {
        const store = window.formDataStore || {};
        const coreValues = store.core_values || [];
        
        const constellation = document.getElementById('values-constellation');
        if (constellation) {
            constellation.innerHTML = '';
            
            if (coreValues.length > 0) {
                coreValues.forEach((value, index) => {
                    const badge = document.createElement('div');
                    badge.className = 'value-badge';
                    badge.textContent = formatValue(value);
                    badge.style.animationDelay = `${index * 0.1}s`;
                    constellation.appendChild(badge);
                });
            } else {
                // Try to get from form directly
                const valueCheckboxes = document.querySelectorAll('input[name="core-values"]:checked');
                if (valueCheckboxes.length > 0) {
                    valueCheckboxes.forEach((checkbox, index) => {
                        const badge = document.createElement('div');
                        badge.className = 'value-badge';
                        badge.textContent = formatValue(checkbox.value);
                        badge.style.animationDelay = `${index * 0.1}s`;
                        constellation.appendChild(badge);
                    });
                } else {
                    // Default message
                    const message = document.createElement('p');
                    message.textContent = 'Your core values will appear here';
                    message.style.color = '#64748b';
                    message.style.fontStyle = 'italic';
                    constellation.appendChild(message);
                }
            }
        }
    }

    function populateMatchCriteria() {
        const store = window.formDataStore || {};
        
        // Faith
        const faith = store.faith_tradition || getFieldValue('faith-tradition');
        setText('criteria-faith', formatFaith(faith) || 'faith tradition');
        
        // Age range
        const ageRange = store.partner_age_range || getFieldValue('partner-age-range');
        setText('criteria-age-range', ageRange || '—');
        
        // Values (use first 2 core values)
        const coreValues = store.core_values || [];
        let valuesText = 'your core values';
        if (coreValues.length > 0) {
            valuesText = coreValues.slice(0, 2).map(v => formatValue(v)).join(' and ');
        }
        setText('criteria-values', valuesText);
        
        // Relationship goal
        const goal = store.relationship_goal || getFieldValue('relationship-goal');
        setText('criteria-goal', formatRelationshipGoal(goal) || 'a meaningful relationship');
    }

    function populateDetailedReview() {
        const store = window.formDataStore || {};
        
        // Personal Profile
        setText('review-full-name', store.full_name || getFieldValue('full-name') || 'Not provided');
        
        // Birth date
        if (store.birth_month && store.birth_day && store.birth_year) {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December'];
            const birthDate = `${months[store.birth_month - 1]} ${store.birth_day}, ${store.birth_year}`;
            setText('review-birth-date', birthDate);
        } else {
            const month = getFieldValue('birth-month');
            const day = getFieldValue('birth-day');
            const year = getFieldValue('birth-year');
            if (month && day && year) {
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                              'July', 'August', 'September', 'October', 'November', 'December'];
                const birthDate = `${months[month - 1]} ${day}, ${year}`;
                setText('review-birth-date', birthDate);
            } else {
                setText('review-birth-date', 'Not provided');
            }
        }
        
        // Gender
        const gender = store.gender || getFieldValue('gender');
        setText('review-gender', formatGender(gender) || 'Not provided');
        
        // Email
        setText('review-email', store.email || getFieldValue('email') || 'Not provided');
        
        // Phone
        const countryCode = store.country_code || getFieldValue('country-code');
        const phone = store.phone || getFieldValue('phone');
        if (countryCode && phone) {
            setText('review-phone', `${countryCode} ${phone}`);
        } else {
            setText('review-phone', 'Not provided');
        }
        
        // Location
        const city = store.city || getFieldValue('city');
        const state = store.state || getFieldValue('state');
        const country = store.country || getFieldValue('country');
        const locationParts = [city, state, country].filter(Boolean);
        setText('review-location', locationParts.length > 0 ? locationParts.join(', ') : 'Not provided');
        
        // Nationality
        setText('review-nationality', store.nationality || getFieldValue('nationality') || 'Not provided');
        
        // Occupation
        setText('review-occupation', store.occupation || getFieldValue('occupation') || 'Not provided');
        
        // Education
        const education = store.education || getFieldValue('education');
        setText('review-education', formatEducation(education) || 'Not provided');
        
        // Languages
        const languages = store.languages || [];
        if (languages.length > 0) {
            setText('review-languages', languages.join(', '));
        } else {
            const langCheckboxes = document.querySelectorAll('input[name="languages"]:checked');
            if (langCheckboxes.length > 0) {
                const langs = Array.from(langCheckboxes).map(cb => cb.value);
                setText('review-languages', langs.join(', '));
            } else {
                setText('review-languages', 'Not provided');
            }
        }
        
        // Faith & Values
        const faithTradition = store.faith_tradition || getFieldValue('faith-tradition');
        setText('review-faith-tradition', formatFaith(faithTradition) || 'Not provided');
        
        const community = store.community_involvement || getFieldValue('community-involvement');
        setText('review-community', formatCommunity(community) || 'Not provided');
        
        // Core values
        const coreValues = store.core_values || [];
        if (coreValues.length > 0) {
            setText('review-core-values', coreValues.map(v => formatValue(v)).join(', '));
        } else {
            const valueCheckboxes = document.querySelectorAll('input[name="core-values"]:checked');
            if (valueCheckboxes.length > 0) {
                const values = Array.from(valueCheckboxes).map(cb => formatValue(cb.value));
                setText('review-core-values', values.join(', '));
            } else {
                setText('review-core-values', 'Not provided');
            }
        }
        
        // Relationship Vision
        const relationshipGoal = store.relationship_goal || getFieldValue('relationship-goal');
        setText('review-relationship-goal', formatRelationshipGoal(relationshipGoal) || 'Not provided');
        
        const wantChildren = store.want_children || getFieldValue('want-children');
        setText('review-want-children', formatYesNo(wantChildren) || 'Not provided');
        
        const partnerAge = store.partner_age_range || getFieldValue('partner-age-range');
        setText('review-partner-age', partnerAge || 'Not provided');
        
        const relocation = store.relocation_willingness || getFieldValue('relocation-willingness');
        setText('review-relocation', formatYesNo(relocation) || 'Not provided');
    }

    function initializeToggleButton() {
        const toggleBtn = document.getElementById('toggle-details-btn');
        const detailedContent = document.getElementById('detailed-review-content');
        
        if (toggleBtn && detailedContent) {
            toggleBtn.addEventListener('click', function() {
                const isVisible = detailedContent.style.display !== 'none';
                
                if (isVisible) {
                    detailedContent.style.display = 'none';
                    toggleBtn.classList.remove('active');
                } else {
                    detailedContent.style.display = 'block';
                    toggleBtn.classList.add('active');
                    
                    // Smooth scroll to detailed section
                    setTimeout(() => {
                        detailedContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                }
            });
        }
    }

    function setTodayDate() {
        const dateElement = document.getElementById('review-date-today');
        if (dateElement) {
            const today = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            dateElement.textContent = today.toLocaleDateString('en-US', options);
        }
    }

    // Helper functions
    function setText(elementId, text) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = text;
        }
    }

    function getFieldValue(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            if (field.type === 'checkbox' || field.type === 'radio') {
                return field.checked ? field.value : '';
            }
            return field.value;
        }
        return '';
    }

    function formatValue(value) {
        const valueMap = {
            'family': 'Family',
            'faith': 'Faith',
            'integrity': 'Integrity',
            'compassion': 'Compassion',
            'growth': 'Personal Growth',
            'service': 'Service to Others',
            'tradition': 'Tradition',
            'innovation': 'Innovation',
            'community': 'Community',
            'education': 'Education',
            'health': 'Health & Wellness',
            'creativity': 'Creativity'
        };
        return valueMap[value] || value;
    }

    function formatFaith(faith) {
        const faithMap = {
            'christian-catholic': 'Catholic',
            'christian-protestant': 'Protestant',
            'christian-orthodox': 'Orthodox',
            'christian-other': 'Christian (Other)',
            'jewish': 'Jewish',
            'muslim': 'Muslim',
            'hindu': 'Hindu',
            'buddhist': 'Buddhist',
            'spiritual': 'Spiritual but not religious',
            'other': 'Other'
        };
        return faithMap[faith] || faith;
    }

    function formatGender(gender) {
        const genderMap = {
            'male': 'Male',
            'female': 'Female',
            'other': 'Other'
        };
        return genderMap[gender] || gender;
    }

    function formatEducation(education) {
        const educationMap = {
            'high-school': 'High School',
            'bachelors': "Bachelor's Degree",
            'masters': "Master's Degree",
            'doctorate': 'Doctorate',
            'other': 'Other'
        };
        return educationMap[education] || education;
    }

    function formatCommunity(community) {
        const communityMap = {
            'very-active': 'Very Active',
            'active': 'Active',
            'somewhat-active': 'Somewhat Active',
            'not-active': 'Not Active'
        };
        return communityMap[community] || community;
    }

    function formatRelationshipGoal(goal) {
        const goalMap = {
            'marriage': 'Marriage',
            'long-term': 'Long-term Committed Relationship',
            'open': 'Open to Possibilities'
        };
        return goalMap[goal] || goal;
    }

    function formatYesNo(value) {
        if (value === 'yes' || value === true) return 'Yes';
        if (value === 'no' || value === false) return 'No';
        if (value === 'maybe') return 'Maybe';
        return value;
    }

    // Export for debugging
    window.revolutionaryReviewDebug = {
        populate: populateRevolutionaryReview,
        store: () => window.formDataStore
    };

})();
