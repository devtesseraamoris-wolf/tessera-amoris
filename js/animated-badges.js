/**
 * ANIMATED BADGES - JavaScript Enhancement
 * 
 * Provides smooth animated border rotation using CSS custom properties
 * for a premium, sophisticated visual effect.
 * 
 * Author: High Web Strategist & Creative Designer
 * Date: October 30, 2025
 */

(function() {
    'use strict';
    
    /**
     * Initialize animated badges
     */
    function initAnimatedBadges() {
        const badges = document.querySelectorAll('.badge-paraguay, .badge-europe');
        
        if (badges.length === 0) return;
        
        badges.forEach(badge => {
            // Set initial angle
            badge.style.setProperty('--angle', '0deg');
            
            // Create smooth rotation animation
            let angle = 0;
            const speed = 0.5; // degrees per frame
            
            function animate() {
                angle = (angle + speed) % 360;
                badge.style.setProperty('--angle', `${angle}deg`);
                requestAnimationFrame(animate);
            }
            
            // Start animation
            requestAnimationFrame(animate);
        });
    }
    
    /**
     * Check if user prefers reduced motion
     */
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    /**
     * Initialize on DOM ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            if (!prefersReducedMotion()) {
                initAnimatedBadges();
            }
        });
    } else {
        if (!prefersReducedMotion()) {
            initAnimatedBadges();
        }
    }
    
})();
