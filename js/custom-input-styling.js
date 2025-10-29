/**
 * CUSTOM INPUT STYLING
 * Applies elegant custom styles to checkboxes and radio buttons
 * Ensures visibility and sophisticated appearance
 */

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCustomInputs);
    } else {
        initCustomInputs();
    }
    
    function initCustomInputs() {
        styleCheckboxes();
        styleRadioButtons();
        
        // Re-apply styles when sections change (for dynamic content)
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    styleCheckboxes();
                    styleRadioButtons();
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    function styleCheckboxes() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        
        checkboxes.forEach(function(cb) {
            // Skip if already styled
            if (cb.dataset.customStyled) return;
            cb.dataset.customStyled = 'true';
            
            // Remove conflicting inline styles
            cb.removeAttribute('style');
            
            // Apply base styles
            const baseStyles = {
                'appearance': 'none',
                '-webkit-appearance': 'none',
                '-moz-appearance': 'none',
                'width': '24px',
                'height': '24px',
                'min-width': '24px',
                'min-height': '24px',
                'border': '2px solid rgba(100, 116, 139, 0.3)',
                'border-radius': '6px',
                'background-color': 'rgba(248, 250, 252, 0.5)',
                'cursor': 'pointer',
                'position': 'relative',
                'transition': 'all 0.3s ease',
                'flex-shrink': '0',
                'margin-right': '12px',
                'display': 'inline-block',
                'vertical-align': 'middle',
                'opacity': '1',
                'visibility': 'visible'
            };
            
            Object.entries(baseStyles).forEach(function([prop, value]) {
                cb.style.setProperty(prop, value, 'important');
            });
            
            // Update styles on change
            cb.addEventListener('change', function() {
                updateCheckboxAppearance(this);
            });
            
            // Set initial appearance
            updateCheckboxAppearance(cb);
            
            // Add hover effect
            cb.addEventListener('mouseenter', function() {
                if (!this.checked) {
                    this.style.setProperty('border-color', 'rgba(212, 175, 55, 0.5)', 'important');
                    this.style.setProperty('background-color', 'rgba(255, 251, 240, 0.8)', 'important');
                }
            });
            
            cb.addEventListener('mouseleave', function() {
                updateCheckboxAppearance(this);
            });
        });
        
        // Hide custom checkmark spans
        document.querySelectorAll('.checkmark-custom').forEach(function(el) {
            el.style.display = 'none';
        });
    }
    
    function updateCheckboxAppearance(checkbox) {
        if (checkbox.checked) {
            checkbox.style.setProperty('background-color', '#64748b', 'important');
            checkbox.style.setProperty('border-color', '#64748b', 'important');
            
            // Add checkmark using pseudo-element (CSS will handle this)
            // But we need to ensure the content is visible
            checkbox.setAttribute('data-checked', 'true');
        } else {
            checkbox.style.setProperty('background-color', 'rgba(248, 250, 252, 0.5)', 'important');
            checkbox.style.setProperty('border-color', 'rgba(100, 116, 139, 0.3)', 'important');
            checkbox.removeAttribute('data-checked');
        }
    }
    
    function styleRadioButtons() {
        const radios = document.querySelectorAll('input[type="radio"]');
        
        radios.forEach(function(radio) {
            // Skip if already styled
            if (radio.dataset.customStyled) return;
            radio.dataset.customStyled = 'true';
            
            // Remove conflicting inline styles
            radio.removeAttribute('style');
            
            // Apply base styles
            const baseStyles = {
                'appearance': 'none',
                '-webkit-appearance': 'none',
                '-moz-appearance': 'none',
                'width': '24px',
                'height': '24px',
                'min-width': '24px',
                'min-height': '24px',
                'border': '2px solid rgba(100, 116, 139, 0.3)',
                'border-radius': '50%',
                'background-color': 'rgba(248, 250, 252, 0.5)',
                'cursor': 'pointer',
                'position': 'relative',
                'transition': 'all 0.3s ease',
                'flex-shrink': '0',
                'margin-right': '12px',
                'display': 'inline-block',
                'vertical-align': 'middle',
                'opacity': '1',
                'visibility': 'visible'
            };
            
            Object.entries(baseStyles).forEach(function([prop, value]) {
                radio.style.setProperty(prop, value, 'important');
            });
            
            // Update styles on change
            radio.addEventListener('change', function() {
                // Update all radios in the same group
                const name = this.name;
                document.querySelectorAll(`input[type="radio"][name="${name}"]`).forEach(function(r) {
                    updateRadioAppearance(r);
                });
            });
            
            // Set initial appearance
            updateRadioAppearance(radio);
            
            // Add hover effect
            radio.addEventListener('mouseenter', function() {
                if (!this.checked) {
                    this.style.setProperty('border-color', 'rgba(212, 175, 55, 0.5)', 'important');
                    this.style.setProperty('background-color', 'rgba(255, 251, 240, 0.8)', 'important');
                }
            });
            
            radio.addEventListener('mouseleave', function() {
                updateRadioAppearance(this);
            });
        });
    }
    
    function updateRadioAppearance(radio) {
        if (radio.checked) {
            radio.style.setProperty('border-color', '#D4AF37', 'important');
            radio.style.setProperty('background-color', 'rgba(212, 175, 55, 0.1)', 'important');
            radio.setAttribute('data-checked', 'true');
        } else {
            radio.style.setProperty('border-color', 'rgba(100, 116, 139, 0.3)', 'important');
            radio.style.setProperty('background-color', 'rgba(248, 250, 252, 0.5)', 'important');
            radio.removeAttribute('data-checked');
        }
    }
    
})();
