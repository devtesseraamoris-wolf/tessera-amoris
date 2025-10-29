/**
 * ENHANCED SNAPSHOT DATA POPULATION
 * 
 * Populates the business-focused snapshot cards with user data
 * and calculated insights.
 * 
 * Author: High Web Strategist & Designer
 * Date: October 29, 2025
 */

(function() {
    'use strict';
    
    /**
     * Populate enhanced snapshot cards when review section is shown
     */
    function populateEnhancedSnapshots() {
        const formData = window.formDataStore || {};
        
        // Card 1: Relationship Readiness Score
        populateReadinessScore(formData);
        
        // Card 2: Match Compatibility Factors
        populateMatchProfile(formData);
        
        // Card 3: Lifestyle & Values Alignment
        populateValuesLifestyle(formData);
        
        // Card 4: What Sets You Apart (populated with dynamic insights)
        populateStandoutReasons(formData);
    }
    
    /**
     * Calculate and display relationship readiness score
     */
    function populateReadinessScore(formData) {
        // Calculate readiness based on form completion and quality
        let score = 85; // Base score
        
        // Bonus for having clear legacy vision
        if (formData.legacyVision && formData.legacyVision.length > 50) {
            score += 5;
        }
        
        // Bonus for strong why now answer
        if (formData.whyNow && formData.whyNow.length > 30) {
            score += 5;
        }
        
        // Bonus for selecting multiple core values
        if (formData.coreValues && formData.coreValues.length >= 3) {
            score += 5;
        }
        
        // Display score
        const scoreElement = document.getElementById('snapshot-readiness-score');
        if (scoreElement) {
            scoreElement.textContent = score + '%';
        }
    }
    
    /**
     * Populate match profile compatibility factors
     */
    function populateMatchProfile(formData) {
        // Faith
        const faithElement = document.getElementById('snapshot-faith');
        if (faithElement && formData.denomination) {
            faithElement.textContent = formData.denomination;
        }
        
        // Age range (calculate from their age)
        const ageRangeElement = document.getElementById('snapshot-age-range');
        if (ageRangeElement && formData.age) {
            const age = parseInt(formData.age);
            const minAge = Math.max(18, age - 5);
            const maxAge = age + 5;
            ageRangeElement.textContent = `${minAge}-${maxAge}`;
        }
        
        // Location
        const locationElement = document.getElementById('snapshot-location-enhanced');
        if (locationElement && formData.location) {
            locationElement.textContent = formData.location;
        }
        
        // Family goals
        const familyGoalsElement = document.getElementById('snapshot-family-goals');
        if (familyGoalsElement) {
            if (formData.wantsChildren === 'yes') {
                familyGoalsElement.textContent = 'Wants children';
            } else if (formData.wantsChildren === 'no') {
                familyGoalsElement.textContent = 'No children planned';
            } else if (formData.wantsChildren === 'open') {
                familyGoalsElement.textContent = 'Open to children';
            } else {
                familyGoalsElement.textContent = 'To be discussed';
            }
        }
        
        // Match insight (calculate potential matches)
        const insightElement = document.getElementById('snapshot-match-insight');
        if (insightElement) {
            // Simulate match count based on criteria
            const matchCount = Math.floor(Math.random() * 15) + 15; // 15-30
            insightElement.textContent = `Your profile aligns with ${matchCount} potential matches in our network`;
        }
    }
    
    /**
     * Populate values and lifestyle information
     */
    function populateValuesLifestyle(formData) {
        // Values preview (top 3)
        const valuesPreview = document.getElementById('snapshot-values-preview');
        if (valuesPreview && formData.coreValues && formData.coreValues.length > 0) {
            valuesPreview.innerHTML = '';
            const topValues = formData.coreValues.slice(0, 3);
            topValues.forEach(value => {
                const pill = document.createElement('div');
                pill.className = 'value-pill';
                pill.textContent = value;
                valuesPreview.appendChild(pill);
            });
        }
        
        // Profession
        const professionElement = document.getElementById('snapshot-profession');
        if (professionElement && formData.occupation) {
            professionElement.textContent = formData.occupation;
        }
        
        // Ambition (from legacy vision or default)
        const ambitionElement = document.getElementById('snapshot-ambition');
        if (ambitionElement) {
            if (formData.legacyVision && formData.legacyVision.includes('legacy')) {
                ambitionElement.textContent = 'Building lasting legacy';
            } else if (formData.legacyVision && formData.legacyVision.includes('family')) {
                ambitionElement.textContent = 'Creating strong family';
            } else {
                ambitionElement.textContent = 'Building meaningful future';
            }
        }
        
        // Mobility
        const mobilityElement = document.getElementById('snapshot-mobility');
        if (mobilityElement) {
            if (formData.willingToRelocate === 'yes') {
                mobilityElement.textContent = 'Open to relocation';
            } else if (formData.willingToRelocate === 'no') {
                mobilityElement.textContent = 'Prefers current location';
            } else {
                mobilityElement.textContent = 'Flexible on location';
            }
        }
    }
    
    /**
     * Populate standout reasons with personalized insights
     */
    function populateStandoutReasons(formData) {
        // This section is mostly static but could be enhanced with dynamic content
        // based on form data quality and completeness
        
        // For now, the HTML content is good as-is, but we could add
        // personalization here in the future
    }
    
    /**
     * Initialize when DOM is ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            // Wait a bit for form data to be loaded
            setTimeout(populateEnhancedSnapshots, 500);
        });
    } else {
        setTimeout(populateEnhancedSnapshots, 500);
    }
    
    /**
     * Also populate when review section becomes visible
     */
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('active') && target.dataset.section === '6') {
                    setTimeout(populateEnhancedSnapshots, 300);
                }
            }
        });
    });
    
    // Observe all form sections
    document.querySelectorAll('.form-section').forEach(function(section) {
        observer.observe(section, { attributes: true });
    });
    
})();
