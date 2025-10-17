/**
 * REVIEW IMPROVEMENTS - Tessera Amoris
 * Additional enhancements to make review section more inspiring
 */

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addReviewImprovements, 500); // Wait for other scripts to load
});

function addReviewImprovements() {
    const reviewSection = document.querySelector('[data-section="5"]');
    if (!reviewSection) return;
    
    // Add inspiring quote at the top
    addInspiringQuote(reviewSection);
    
    // Enhance the "What Happens Next" section if it exists
    enhanceNextSteps(reviewSection);
    
    // Add personal touch to submit button
    enhanceSubmitButton(reviewSection);
}

/**
 * Add inspiring quote at the beginning
 */
function addInspiringQuote(reviewSection) {
    const header = reviewSection.querySelector('.review-header') || 
                   reviewSection.querySelector('.review-section-header') ||
                   reviewSection.querySelector('h2');
    
    if (!header) return;
    
    const quoteDiv = document.createElement('div');
    quoteDiv.className = 'review-inspiration-quote';
    quoteDiv.style.cssText = `
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(12, 27, 51, 0.05) 100%);
        border-left: 4px solid #D4AF37;
        padding: 1.5rem 2rem;
        margin: 2rem 0;
        border-radius: 8px;
        font-style: italic;
        color: #0c1b33;
        line-height: 1.8;
    `;
    quoteDiv.innerHTML = `
        <p style="margin: 0; font-size: 1.05rem;">
            "Every great journey begins with a single, intentional step. Your thoughtfulness in completing this application reflects the depth and sincerity we value in our community."
        </p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; color: #76777A; font-style: normal;">
            — Tessera Amoris Team
        </p>
    `;
    
    header.after(quoteDiv);
}

/**
 * Enhance "What Happens Next" section
 */
function enhanceNextSteps(reviewSection) {
    const nextSteps = reviewSection.querySelector('.review-next-steps') ||
                      reviewSection.querySelector('.what-happens-next');
    
    if (!nextSteps) return;
    
    // Add visual enhancements
    nextSteps.style.cssText = `
        background: linear-gradient(135deg, #0c1b33 0%, #1a2f4f 100%);
        border-radius: 20px;
        padding: 3rem;
        margin: 3rem 0;
        color: white;
        box-shadow: 0 8px 32px rgba(12, 27, 51, 0.3);
    `;
    
    const title = nextSteps.querySelector('h3');
    if (title) {
        title.style.cssText = `
            font-family: 'Cormorant Garamond', serif;
            font-size: 2rem;
            text-align: center;
            margin-bottom: 2.5rem;
            color: #FFFFF0;
        `;
    }
}

/**
 * Enhance submit button with personal touch
 */
function enhanceSubmitButton(reviewSection) {
    const submitBtn = document.querySelector('.btn-submit') ||
                      document.querySelector('.btn-submit-final');
    
    if (!submitBtn) return;
    
    // Add hover effect with personal message
    const originalText = submitBtn.textContent;
    
    submitBtn.addEventListener('mouseenter', function() {
        if (!this.disabled) {
            this.innerHTML = '<i class="fas fa-heart"></i> Begin Your Legacy';
        }
    });
    
    submitBtn.addEventListener('mouseleave', function() {
        if (!this.disabled) {
            this.textContent = originalText;
        }
    });
}

// Export for debugging
window.addReviewImprovements = addReviewImprovements;

