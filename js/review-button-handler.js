/**
 * Review Button Handler
 * Scrolls to top of review section when clicked
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const reviewButton = document.getElementById('review-application-button');
        
        if (reviewButton) {
            reviewButton.addEventListener('click', function() {
                // Scroll to top of review section
                const reviewSection = document.querySelector('.review-section-container');
                if (reviewSection) {
                    reviewSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Add a subtle pulse animation
                    reviewSection.style.animation = 'pulse 0.5s ease-in-out';
                    setTimeout(() => {
                        reviewSection.style.animation = '';
                    }, 500);
                }
                
                console.log('📋 Review button clicked - scrolling to top');
            });
        }
    });
})();

