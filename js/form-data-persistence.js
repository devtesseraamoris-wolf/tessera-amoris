/**
 * Form Data Persistence
 * Ensures all form data is saved and displayed in review section
 */

(function() {
    'use strict';
    
    // Store form data in memory
    const formData = {};
    
    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        attachFormListeners();
        loadSavedData();
    }
    
    function attachFormListeners() {
        // Listen to all form inputs
        const form = document.querySelector('form');
        if (!form) return;
        
        form.addEventListener('change', function(e) {
            const target = e.target;
            if (target.id) {
                saveFieldData(target.id, target.value, target);
            }
        });
        
        form.addEventListener('input', function(e) {
            const target = e.target;
            if (target.id) {
                saveFieldData(target.id, target.value, target);
            }
        });
    }
    
    function saveFieldData(fieldId, value, element) {
        // Save to memory
        formData[fieldId] = value;
        
        // Save to localStorage for persistence
        try {
            localStorage.setItem('tessera_form_data', JSON.stringify(formData));
        } catch (e) {
            console.warn('Could not save to localStorage:', e);
        }
        
        // If this is a value tag selection, track it
        if (element.classList.contains('value-tag-checkbox') || 
            element.classList.contains('preference-checkbox')) {
            updateSelectedValues();
        }
    }
    
    function loadSavedData() {
        try {
            const saved = localStorage.getItem('tessera_form_data');
            if (saved) {
                const data = JSON.parse(saved);
                Object.assign(formData, data);
                
                // Restore form values
                for (const [fieldId, value] of Object.entries(data)) {
                    const field = document.getElementById(fieldId);
                    if (field) {
                        field.value = value;
                    }
                }
            }
        } catch (e) {
            console.warn('Could not load from localStorage:', e);
        }
    }
    
    function updateSelectedValues() {
        // Collect selected values
        const selectedValues = [];
        const valueCheckboxes = document.querySelectorAll('.value-tag-checkbox:checked');
        valueCheckboxes.forEach(checkbox => {
            const label = checkbox.closest('.value-tag')?.querySelector('.value-tag-title');
            if (label) {
                selectedValues.push(label.textContent.trim());
            }
        });
        
        formData['selected-values'] = selectedValues.join(', ');
        
        // Save to localStorage
        try {
            localStorage.setItem('tessera_form_data', JSON.stringify(formData));
        } catch (e) {
            console.warn('Could not save to localStorage:', e);
        }
    }
    
    // Make formData accessible globally for review section
    window.TesseraFormData = {
        get: function(key) {
            return formData[key];
        },
        getAll: function() {
            return { ...formData };
        },
        set: function(key, value) {
            formData[key] = value;
            try {
                localStorage.setItem('tessera_form_data', JSON.stringify(formData));
            } catch (e) {
                console.warn('Could not save to localStorage:', e);
            }
        }
    };
    
})();

