/**
 * Remove Label Borders - Final Solution
 * Removes colored borders from form labels on page load and dynamically
 */

(function() {
    'use strict';
    
    function removeLabelBorders() {
        // Select ALL labels
        const selectors = [
            'label',
            '.form-label',
            '.sophisticated-label',
            'label[for]',
            '.form-group label',
            'div label',
            'form label'
        ];
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                // Remove all border styles
                el.style.setProperty('border', 'none', 'important');
                el.style.setProperty('border-top', 'none', 'important');
                el.style.setProperty('border-bottom', 'none', 'important');
                el.style.setProperty('border-left', 'none', 'important');
                el.style.setProperty('border-right', 'important');
                el.style.setProperty('border-width', '0', 'important');
                el.style.setProperty('border-style', 'none', 'important');
                el.style.setProperty('border-color', 'transparent', 'important');
                el.style.setProperty('box-shadow', 'none', 'important');
                el.style.setProperty('outline', 'none', 'important');
                el.style.setProperty('background', 'transparent', 'important');
                
                // Remove text-transform uppercase
                el.style.setProperty('text-transform', 'none', 'important');
                el.style.setProperty('letter-spacing', 'normal', 'important');
            });
        });
        
        console.log('✅ Label borders removed');
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', removeLabelBorders);
    } else {
        removeLabelBorders();
    }
    
    // Run again after a short delay (for dynamically loaded content)
    setTimeout(removeLabelBorders, 500);
    setTimeout(removeLabelBorders, 1000);
    setTimeout(removeLabelBorders, 2000);
    
    // Observe DOM changes and reapply
    const observer = new MutationObserver(removeLabelBorders);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
})();
