/**
 * FLAG RENDERER
 * Ensures flag emojis render properly, uses fallback images if needed
 * 
 * Author: High Web Strategist & Creative Designer
 * Date: October 30, 2025
 */

(function() {
    'use strict';
    
    /**
     * Check if emoji is supported
     */
    function isEmojiSupported() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) return false;
        
        ctx.fillText('🇵🇾', 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Check if any pixels were drawn
        for (let i = 0; i < imageData.data.length; i += 4) {
            if (imageData.data[i + 3] > 0) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Use flag images as fallback
     */
    function useFlagImages() {
        const paraguayBadges = document.querySelectorAll('.badge-paraguay');
        const europeBadges = document.querySelectorAll('.badge-europe');
        
        paraguayBadges.forEach(badge => {
            // Create flag image
            const flagImg = document.createElement('img');
            flagImg.src = 'data:image/svg+xml;base64,' + btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="16" height="11">
                    <rect width="60" height="13.33" fill="#D52B1E"/>
                    <rect y="13.33" width="60" height="13.33" fill="#FFFFFF"/>
                    <rect y="26.66" width="60" height="13.34" fill="#0038A8"/>
                </svg>
            `);
            flagImg.style.cssText = 'position:absolute;left:6px;top:50%;transform:translateY(-50%);width:16px;height:11px;';
            flagImg.alt = 'PY';
            
            // Remove emoji, add image
            const style = window.getComputedStyle(badge, '::before');
            if (style.content) {
                badge.style.setProperty('--flag-content', 'none');
                badge.appendChild(flagImg);
            }
        });
        
        europeBadges.forEach(badge => {
            // Create flag image
            const flagImg = document.createElement('img');
            flagImg.src = 'data:image/svg+xml;base64,' + btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="16" height="11">
                    <rect width="60" height="40" fill="#003399"/>
                    <g fill="#FFCC00">
                        <circle cx="30" cy="20" r="1.5"/>
                        <circle cx="30" cy="10" r="1.5"/>
                        <circle cx="35" cy="12" r="1.5"/>
                        <circle cx="38" cy="16" r="1.5"/>
                        <circle cx="38" cy="24" r="1.5"/>
                        <circle cx="35" cy="28" r="1.5"/>
                        <circle cx="30" cy="30" r="1.5"/>
                        <circle cx="25" cy="28" r="1.5"/>
                        <circle cx="22" cy="24" r="1.5"/>
                        <circle cx="22" cy="16" r="1.5"/>
                        <circle cx="25" cy="12" r="1.5"/>
                    </g>
                </svg>
            `);
            flagImg.style.cssText = 'position:absolute;left:6px;top:50%;transform:translateY(-50%);width:16px;height:11px;';
            flagImg.alt = 'EU';
            
            // Remove emoji, add image
            const style = window.getComputedStyle(badge, '::before');
            if (style.content) {
                badge.style.setProperty('--flag-content', 'none');
                badge.appendChild(flagImg);
            }
        });
    }
    
    /**
     * Initialize
     */
    function init() {
        // Always use SVG images for consistency
        // Emoji rendering is inconsistent across platforms
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', useFlagImages);
        } else {
            useFlagImages();
        }
    }
    
    init();
    
})();
