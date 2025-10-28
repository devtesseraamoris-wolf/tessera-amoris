/**
 * Strategic Review Section
 * Advanced persuasion, marketing, and visual storytelling
 */

(function() {
    'use strict';
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        buildStrategicReview();
    }
    
    function buildStrategicReview() {
        const section5 = document.querySelector('[data-section="5"]');
        if (!section5) return;
        
        // Clear existing content except inspiration
        const inspiration = section5.querySelector('.inspiration-reference');
        section5.innerHTML = '';
        if (inspiration) {
            section5.appendChild(inspiration);
        }
        
        // Build new strategic review
        const reviewHTML = `
            <!-- Hero Header - Celebration -->
            <div class="review-hero">
                <div class="review-hero-icon">✨</div>
                <h1 class="review-hero-title">Your Journey Begins Here</h1>
                <p class="review-hero-subtitle">
                    You've taken the first meaningful step toward building a legacy of love. 
                    Your thoughtful responses reflect the depth and intentionality we value in our community.
                </p>
                <div class="review-hero-badge">Application Complete</div>
            </div>
            
            <!-- Journey Progress -->
            <div class="journey-progress">
                <h2 class="journey-progress-title">Your Application Journey</h2>
                <div class="journey-steps">
                    <div class="journey-step">
                        <div class="journey-step-icon">✓</div>
                        <div class="journey-step-content">
                            <div class="journey-step-label">Personal Info</div>
                            <div class="journey-step-description">Your profile and background</div>
                        </div>
                    </div>
                    <div class="journey-step">
                        <div class="journey-step-icon">✓</div>
                        <div class="journey-step-content">
                            <div class="journey-step-label">Faith & Values</div>
                            <div class="journey-step-description">Your spiritual foundation and core beliefs</div>
                        </div>
                    </div>
                    <div class="journey-step">
                        <div class="journey-step-icon">✓</div>
                        <div class="journey-step-content">
                            <div class="journey-step-label">Preferences</div>
                            <div class="journey-step-description">Your relationship vision and partner qualities</div>
                        </div>
                    </div>
                    <div class="journey-step active">
                        <div class="journey-step-icon">👁</div>
                        <div class="journey-step-content">
                            <div class="journey-step-label">Review</div>
                            <div class="journey-step-description">Final verification before submission</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Profile Snapshot -->
            <div class="profile-snapshot">
                <div class="snapshot-card">
                    <div class="snapshot-card-header">
                        <div class="snapshot-card-icon">👤</div>
                        <h3 class="snapshot-card-title">Your Profile</h3>
                    </div>
                    <div class="snapshot-card-content" id="personal-snapshot"></div>
                </div>
                
                <div class="snapshot-card">
                    <div class="snapshot-card-header">
                        <div class="snapshot-card-icon">✝</div>
                        <h3 class="snapshot-card-title">Faith Journey</h3>
                    </div>
                    <div class="snapshot-card-content" id="faith-snapshot"></div>
                </div>
                
                <div class="snapshot-card">
                    <div class="snapshot-card-header">
                        <div class="snapshot-card-icon">💝</div>
                        <h3 class="snapshot-card-title">Relationship Vision</h3>
                    </div>
                    <div class="snapshot-card-content" id="relationship-snapshot"></div>
                </div>
            </div>
            
            <!-- Values Showcase -->
            <div class="values-showcase">
                <h2 class="values-showcase-title">Your Core Values</h2>
                <div class="values-grid" id="values-display"></div>
            </div>
            
            <!-- What Happens Next -->
            <div class="next-steps-timeline">
                <h2 class="next-steps-title">What Happens Next?</h2>
                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-number">1</div>
                        <div class="timeline-content">
                            <h4>Application Review</h4>
                            <p>Our team will carefully review your application within 3-5 business days, ensuring alignment with our community values and mission.</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-number">2</div>
                        <div class="timeline-content">
                            <h4>Personal Interview</h4>
                            <p>If approved, we'll schedule a personal interview to get to know you better and answer any questions you may have about the process.</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-number">3</div>
                        <div class="timeline-content">
                            <h4>Verification Process</h4>
                            <p>We'll complete background checks and contact your references to ensure the safety and authenticity of our community.</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-number">4</div>
                        <div class="timeline-content">
                            <h4>Begin Your Journey</h4>
                            <p>Once verified, you'll be welcomed into our exclusive community and begin receiving curated introductions based on your values and preferences.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Final CTA -->
            <div class="review-cta">
                <h2 class="review-cta-title">Ready to Begin Your Legacy?</h2>
                <p class="review-cta-text">
                    By submitting this application, you're joining a community of purpose-driven individuals 
                    committed to building meaningful, faith-centered relationships that transcend borders and create lasting legacies.
                </p>
                <div class="review-cta-buttons">
                    <button type="submit" class="btn-submit">Submit Application</button>
                    <button type="button" class="btn-edit" onclick="editApplication()">Review & Edit</button>
                </div>
            </div>
        `;
        
        section5.insertAdjacentHTML('beforeend', reviewHTML);
        
        // Populate data
        populateSnapshot();
    }
    
    function populateSnapshot() {
        // Get form data
        const formData = {
            fullName: document.getElementById('full-name')?.value || 'Not provided',
            age: calculateAge(),
            gender: document.getElementById('gender')?.value || 'Not provided',
            location: getLocation(),
            occupation: getOccupation(),
            education: document.getElementById('education')?.value || 'Not provided',
            languages: getLanguages(),
            
            faithTradition: document.getElementById('faith-tradition')?.value || 'Not provided',
            churchInvolvement: document.getElementById('community-involvement')?.value || 'Not provided',
            faithImportance: document.getElementById('values-importance')?.value || 'Not provided',
            
            relationshipGoal: document.getElementById('relationship-goal')?.value || 'Not provided',
            geographicPreference: getGeographicPreference(),
            ageRange: getAgeRange()
        };
        
        // Personal Snapshot
        const personalSnapshot = document.getElementById('personal-snapshot');
        if (personalSnapshot) {
            personalSnapshot.innerHTML = `
                <div class="snapshot-item">
                    <span class="snapshot-label">Name:</span>
                    <span class="snapshot-value">${formData.fullName}</span>
                </div>
                <div class="snapshot-item">
                    <span class="snapshot-label">Age:</span>
                    <span class="snapshot-value">${formData.age}</span>
                </div>
                <div class="snapshot-item">
                    <span class="snapshot-label">Location:</span>
                    <span class="snapshot-value">${formData.location}</span>
                </div>
                <div class="snapshot-item">
                    <span class="snapshot-label">Occupation:</span>
                    <span class="snapshot-value">${formData.occupation}</span>
                </div>
                <div class="snapshot-item">
                    <span class="snapshot-label">Education:</span>
                    <span class="snapshot-value">${formData.education}</span>
                </div>
                <div class="snapshot-item">
                    <span class="snapshot-label">Languages:</span>
                    <span class="snapshot-value">${formData.languages}</span>
                </div>
            `;
        }
        
        // Faith Snapshot
        const faithSnapshot = document.getElementById('faith-snapshot');
        if (faithSnapshot) {
            faithSnapshot.innerHTML = `
                <div class="snapshot-item">
                    <span class="snapshot-label">Tradition:</span>
                    <span class="snapshot-value">${formData.faithTradition}</span>
                </div>
                <div class="snapshot-item">
                    <span class="snapshot-label">Involvement:</span>
                    <span class="snapshot-value">${formData.churchInvolvement}</span>
                </div>
                <div class="snapshot-item">
                    <span class="snapshot-label">Importance:</span>
                    <span class="snapshot-value">${formData.faithImportance}</span>
                </div>
            `;
        }
        
        // Relationship Snapshot
        const relationshipSnapshot = document.getElementById('relationship-snapshot');
        if (relationshipSnapshot) {
            relationshipSnapshot.innerHTML = `
                <div class="snapshot-item">
                    <span class="snapshot-label">Goal:</span>
                    <span class="snapshot-value">${formData.relationshipGoal}</span>
                </div>
                <div class="snapshot-item">
                    <span class="snapshot-label">Location:</span>
                    <span class="snapshot-value">${formData.geographicPreference}</span>
                </div>
                <div class="snapshot-item">
                    <span class="snapshot-label">Age Range:</span>
                    <span class="snapshot-value">${formData.ageRange}</span>
                </div>
            `;
        }
        
        // Values Display
        const valuesDisplay = document.getElementById('values-display');
        if (valuesDisplay) {
            const selectedValues = getSelectedValues();
            valuesDisplay.innerHTML = selectedValues.map(value => 
                `<div class="value-badge">${value}</div>`
            ).join('');
        }
    }
    
    function calculateAge() {
        const month = document.getElementById('birth-month')?.value;
        const day = document.getElementById('birth-day')?.value;
        const year = document.getElementById('birth-year')?.value;
        
        if (!month || !day || !year) return 'Not provided';
        
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age + ' years old';
    }
    
    function getLocation() {
        const country = document.getElementById('country')?.value || '';
        const city = document.getElementById('city')?.value || '';
        
        if (city && country) {
            return `${city}, ${country}`;
        } else if (country) {
            return country;
        }
        return 'Not provided';
    }
    
    function getOccupation() {
        // Try hidden input first
        const occupationInput = document.getElementById('occupation');
        if (occupationInput && occupationInput.value) {
            return occupationInput.value;
        }
        // Fallback to selected display
        const occupation = document.querySelector('.occupation-selector-selected')?.textContent;
        return occupation || 'Not provided';
    }
    
    function getLanguages() {
        // Try hidden input first (JSON array)
        const languagesInput = document.getElementById('languages');
        if (languagesInput && languagesInput.value) {
            try {
                const langs = JSON.parse(languagesInput.value);
                if (langs.length > 0) {
                    return langs.join(', ');
                }
            } catch (e) {
                // Fall through to visual method
            }
        }
        // Fallback to selected tags
        const selected = document.querySelectorAll('.language-tag.selected');
        if (selected.length === 0) return 'Not provided';
        return Array.from(selected).map(tag => tag.textContent.trim()).join(', ');
    }
    
    function getGeographicPreference() {
        const partnerLocation = document.getElementById('partner-location')?.value;
        if (partnerLocation && partnerLocation !== '') {
            return partnerLocation;
        }
        const selected = document.querySelector('input[name="geographic-preference"]:checked');
        return selected ? selected.nextElementSibling?.textContent || 'Not provided' : 'Not provided';
    }
    
    function getAgeRange() {
        const ageRangeSelect = document.getElementById('partner-age-range');
        if (ageRangeSelect && ageRangeSelect.value) {
            return ageRangeSelect.value;
        }
        const min = document.getElementById('age-min')?.value;
        const max = document.getElementById('age-max')?.value;
        
        if (min && max) {
            return `${min} - ${max} years`;
        }
        return 'Not provided';
    }
    
    function getSelectedValues() {
        const selected = document.querySelectorAll('.value-tag.selected');
        if (selected.length === 0) return ['Faith', 'Family', 'Integrity', 'Commitment', 'Respect'];
        return Array.from(selected).map(tag => tag.querySelector('.value-tag-title')?.textContent || '');
    }
    
    // Global function for edit button
    window.editApplication = function() {
        const section1 = document.querySelector('[data-section="1"]');
        if (section1) {
            document.querySelectorAll('[data-section]').forEach(s => s.style.display = 'none');
            section1.style.display = 'block';
            section1.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
})();

