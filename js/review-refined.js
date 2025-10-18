/**
 * REFINED REVIEW SECTION - Tessera Amoris
 * Vertical layout, harmonious, and strategically excellent
 */

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(refineReviewSection, 500);
});

function refineReviewSection() {
    const reviewSection = document.querySelector('[data-section="5"]');
    if (!reviewSection) return;
    
    // Journey container removed - using horizontal from strategic-review.js
    // addJourneyContainerVertical(reviewSection);
    
    // Enhance "What Happens Next" title color
    enhanceNextStepsTitle(reviewSection);
    
    // Enhance submit button
    enhanceSubmitButton(reviewSection);
}

/**
 * Add journey container with quote and vertical progress
 */
function addJourneyContainerVertical(reviewSection) {
    const header = reviewSection.querySelector('.review-header') || 
                   reviewSection.querySelector('.review-section-header') ||
                   reviewSection.querySelector('h2');
    
    if (!header) return;
    
    // Check if already added
    if (reviewSection.querySelector('.journey-container')) return;
    
    const journeyDiv = document.createElement('div');
    journeyDiv.className = 'journey-container';
    journeyDiv.innerHTML = `
        <h3 class="journey-title">Your Application Journey</h3>
        
        <div class="journey-quote">
            <p style="margin: 0; font-size: 1.05rem;">
                "Every great journey begins with a single, intentional step. Your thoughtfulness in completing this application reflects the depth and sincerity we value in our community."
            </p>
            <p class="journey-quote-author">— Tessera Amoris Team</p>
        </div>
        
        <div class="journey-progress-vertical">
            <div class="journey-step-vertical completed">
                <div class="journey-step-icon-vertical">
                    <i class="fas fa-check"></i>
                </div>
                <div class="journey-step-content-vertical">
                    <div class="journey-step-label-vertical">Personal Info</div>
                    <div class="journey-step-description">Your profile and background</div>
                </div>
            </div>
            
            <div class="journey-step-vertical completed">
                <div class="journey-step-icon-vertical">
                    <i class="fas fa-check"></i>
                </div>
                <div class="journey-step-content-vertical">
                    <div class="journey-step-label-vertical">Faith & Values</div>
                    <div class="journey-step-description">Your spiritual foundation and core beliefs</div>
                </div>
            </div>
            
            <div class="journey-step-vertical completed">
                <div class="journey-step-icon-vertical">
                    <i class="fas fa-check"></i>
                </div>
                <div class="journey-step-content-vertical">
                    <div class="journey-step-label-vertical">Preferences</div>
                    <div class="journey-step-description">Your relationship vision and partner qualities</div>
                </div>
            </div>
            
            <div class="journey-step-vertical current">
                <div class="journey-step-icon-vertical">
                    <i class="fas fa-eye"></i>
                </div>
                <div class="journey-step-content-vertical">
                    <div class="journey-step-label-vertical">Review</div>
                    <div class="journey-step-description">Final verification before submission</div>
                </div>
            </div>
        </div>
    `;
    
    header.after(journeyDiv);
}

/**
 * Enhance "What Happens Next" title with better color
 */
function enhanceNextStepsTitle(reviewSection) {
    const nextSteps = reviewSection.querySelector('.review-next-steps') ||
                      reviewSection.querySelector('.what-happens-next');
    
    if (!nextSteps) return;
    
    const title = nextSteps.querySelector('h3');
    if (title) {
        // Change from black to ivory/gold
        title.style.color = '#FFFFF0';
        title.style.textShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
    }
    
    // Enhance all step titles
    const stepTitles = nextSteps.querySelectorAll('.timeline-content h4');
    stepTitles.forEach(stepTitle => {
        stepTitle.style.color = '#FFFFF0';
    });
}

/**
 * Enhance submit button with hover effect
 */
function enhanceSubmitButton(reviewSection) {
    const submitBtn = document.querySelector('.btn-submit') ||
                      document.querySelector('.btn-submit-final');
    
    if (!submitBtn) return;
    
    const originalText = submitBtn.textContent;
    
    submitBtn.addEventListener('mouseenter', function() {
        if (!this.disabled && !this.textContent.includes('Submitting')) {
            this.innerHTML = '<i class="fas fa-heart"></i> Begin Your Legacy';
        }
    });
    
    submitBtn.addEventListener('mouseleave', function() {
        if (!this.disabled && !this.textContent.includes('Submitting')) {
            this.textContent = originalText;
        }
    });
}

// Export for debugging
window.refineReviewSection = refineReviewSection;

