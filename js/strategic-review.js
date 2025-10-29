/**
 * Strategic Review - Enhanced Form Review Section
 * Displays collected data in visual snapshot cards
 */

// Build the strategic review section with visual cards
function buildStrategicReview() {
    console.log('🔄 Populating review section from data store...');
    
    const store = window.formDataStore || {};
    
    // Update snapshot cards
    updatePersonalSnapshot(store);
    updateFaithSnapshot(store);
    updateRelationshipSnapshot(store);
    
    console.log('✅ Review section populated from data store');
}

// Update Personal Information snapshot card
function updatePersonalSnapshot(store) {
    // Name
    const nameEl = document.querySelector('#personal-snapshot .snapshot-field[data-field="name"] .snapshot-value');
    if (nameEl) {
        nameEl.textContent = store.full_name || 'Not provided';
    }
    
    // Age
    const ageEl = document.querySelector('#personal-snapshot .snapshot-field[data-field="age"] .snapshot-value');
    if (ageEl) {
        const age = calculateAge(store.birth_year, store.birth_month, store.birth_day);
        ageEl.textContent = age || 'Not provided';
    }
    
    // Location
    const locationEl = document.querySelector('#personal-snapshot .snapshot-field[data-field="location"] .snapshot-value');
    if (locationEl) {
        const location = formatLocation(store.city, store.state, store.country);
        locationEl.textContent = location || 'Not provided';
    }
    
    // Occupation
    const occupationEl = document.querySelector('#personal-snapshot .snapshot-field[data-field="occupation"] .snapshot-value');
    if (occupationEl) {
        occupationEl.textContent = store.occupation || 'Not provided';
    }
    
    // Education
    const educationEl = document.querySelector('#personal-snapshot .snapshot-field[data-field="education"] .snapshot-value');
    if (educationEl) {
        const education = formatEducation(store.education);
        educationEl.textContent = education || 'Not provided';
    }
    
    // Languages
    const languagesEl = document.querySelector('#personal-snapshot .snapshot-field[data-field="languages"] .snapshot-value');
    if (languagesEl) {
        const languages = formatLanguages(store.languages);
        languagesEl.textContent = languages || 'Not provided';
    }
}

// Update Faith & Values snapshot card
function updateFaithSnapshot(store) {
    // Tradition
    const traditionEl = document.querySelector('#faith-snapshot .snapshot-field[data-field="tradition"] .snapshot-value');
    if (traditionEl) {
        const tradition = formatFaithTradition(store.faith_tradition);
        traditionEl.textContent = tradition || 'Not provided';
    }
    
    // Involvement
    const involvementEl = document.querySelector('#faith-snapshot .snapshot-field[data-field="involvement"] .snapshot-value');
    if (involvementEl) {
        const involvement = formatCommunityInvolvement(store.community_involvement);
        involvementEl.textContent = involvement || 'Not provided';
    }
    
    // Importance
    const importanceEl = document.querySelector('#faith-snapshot .snapshot-field[data-field="importance"] .snapshot-value');
    if (importanceEl) {
        const importance = formatValuesImportance(store.values_importance);
        importanceEl.textContent = importance || 'Not provided';
    }
}

// Update Relationship Vision snapshot card
function updateRelationshipSnapshot(store) {
    // Goal
    const goalEl = document.querySelector('#relationship-snapshot .snapshot-field[data-field="goal"] .snapshot-value');
    if (goalEl) {
        const goal = formatRelationshipGoal(store.relationship_goal);
        goalEl.textContent = goal || 'Not provided';
    }
    
    // Location
    const locationEl = document.querySelector('#relationship-snapshot .snapshot-field[data-field="location"] .snapshot-value');
    if (locationEl) {
        locationEl.textContent = store.partner_location || 'Not provided';
    }
    
    // Age Range
    const ageRangeEl = document.querySelector('#relationship-snapshot .snapshot-field[data-field="age-range"] .snapshot-value');
    if (ageRangeEl) {
        ageRangeEl.textContent = store.partner_age_range || 'Not provided';
    }
}

// Helper Functions
function calculateAge(year, month, day) {
    if (!year || !month || !day) return null;
    
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age.toString();
}

function formatLocation(city, state, country) {
    const parts = [];
    if (city) parts.push(city);
    if (state) parts.push(state);
    if (country) parts.push(country);
    return parts.join(', ') || null;
}

function formatEducation(education) {
    const educationMap = {
        'high-school': 'High School',
        'some-college': 'Some College',
        'associates': "Associate's Degree",
        'bachelors': "Bachelor's Degree",
        'masters': "Master's Degree",
        'doctorate': 'Doctorate',
        'professional': 'Professional Degree',
        'trade': 'Trade/Vocational',
        'other': 'Other'
    };
    return educationMap[education] || education || null;
}

function formatLanguages(languages) {
    if (!languages) return null;
    if (Array.isArray(languages)) {
        return languages.join(', ');
    }
    if (typeof languages === 'string') {
        try {
            const parsed = JSON.parse(languages);
            return Array.isArray(parsed) ? parsed.join(', ') : languages;
        } catch {
            return languages;
        }
    }
    return null;
}

function formatFaithTradition(tradition) {
    const traditionMap = {
        'christian-catholic': 'Catholic',
        'christian-protestant': 'Protestant',
        'christian-orthodox': 'Orthodox',
        'christian-other': 'Other Christian',
        'jewish': 'Jewish',
        'muslim': 'Muslim',
        'hindu': 'Hindu',
        'buddhist': 'Buddhist',
        'spiritual': 'Spiritual but not religious',
        'other': 'Other',
        'prefer-not-say': 'Prefer not to say'
    };
    return traditionMap[tradition] || tradition || null;
}

function formatCommunityInvolvement(involvement) {
    const involvementMap = {
        'very-active': 'Very Active - Leadership role',
        'active': 'Active - Regular attendance',
        'occasional': 'Occasional - Special events',
        'minimal': 'Minimal - Rarely attend',
        'none': 'None - Not involved'
    };
    return involvementMap[involvement] || involvement || null;
}

function formatValuesImportance(importance) {
    const importanceMap = {
        'essential': 'Essential - Core to my life',
        'very-important': 'Very Important - Major priority',
        'important': 'Important - Significant factor',
        'somewhat': 'Somewhat - One of many factors',
        'not-very': 'Not Very - Minor consideration'
    };
    return importanceMap[importance] || importance || null;
}

function formatRelationshipGoal(goal) {
    const goalMap = {
        'marriage': 'Marriage and family',
        'long-term': 'Long-term committed relationship',
        'companionship': 'Companionship and partnership',
        'exploring': 'Exploring possibilities',
        'friendship-first': 'Friendship first'
    };
    return goalMap[goal] || goal || null;
}

// Listen for section transition events
document.addEventListener('sectionTransitioned', function(event) {
    if (event.detail && event.detail.section === 5) {
        // Refresh review section when entering section 5
        setTimeout(() => {
            buildStrategicReview();
        }, 100);
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Build review section when page loads
    buildStrategicReview();
});

// Expose globally
window.buildStrategicReview = buildStrategicReview;
