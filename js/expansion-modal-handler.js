/**
 * Expansion Modal Handler
 * Handles the "My country isn't listed yet" modal functionality
 */

(function() {
    'use strict';

    function initializeExpansionModal() {
        console.log('[Tessera] Expansion Modal Handler v2.0 initializing...');
        const modal = document.getElementById('expansionModal');
        const form = document.getElementById('expansionInterestForm');
        const cancelBtn = document.getElementById('expansionCancelBtn');
        const submitBtn = document.getElementById('expansionSubmitBtn');
        const formContainer = document.getElementById('expansionFormContainer');
        const successMessage = document.getElementById('expansionSuccessMessage');
        
        if (!modal || !form) {
            console.warn('[Tessera] Expansion modal elements not found');
            return;
        }
        console.log('[Tessera] Expansion modal initialized successfully');
        
        // Cancel button handler
        if (cancelBtn) {
            cancelBtn.addEventListener('click', closeExpansionModal);
        }
        
        // Form submission handler
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            await submitExpansionInterest();
        });
        
        // Click outside to close
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeExpansionModal();
            }
        });
    }
    
    function showExpansionModal() {
        console.log('[Tessera] Opening expansion modal');
        const modal = document.getElementById('expansionModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeExpansionModal() {
        const modal = document.getElementById('expansionModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Reset country selector
        const countrySelect = document.getElementById('country');
        if (countrySelect) {
            countrySelect.value = '';
        }

        // Reset form and show it again
        const formContainer = document.getElementById('expansionFormContainer');
        if (formContainer) {
            formContainer.style.display = 'block';
        }

        const successMessage = document.getElementById('expansionSuccessMessage');
        if (successMessage) {
            successMessage.classList.remove('active');
        }

        const form = document.getElementById('expansionInterestForm');
        if (form) {
            form.reset();
        }

        const submitBtn = document.getElementById('expansionSubmitBtn');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Interest';
        }
    }
    
    async function submitExpansionInterest() {
        const region = document.querySelector('input[name="region"]:checked')?.value;
        const country = document.getElementById('expansion-country')?.value.trim();
        const email = document.getElementById('expansion-email')?.value.trim();
        const submitBtn = document.getElementById('expansionSubmitBtn');

        if (!region || !country) {
            alert('Please select a region and specify your country.');
            return;
        }

        // Disable submit button
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
        }

        const data = { 
            region, 
            country, 
            email: email || null, 
            timestamp: new Date().toISOString() 
        };

        // Save to localStorage as backup
        try {
            const existing = JSON.parse(localStorage.getItem('tessera_expansion_interests') || '[]');
            existing.push(data);
            localStorage.setItem('tessera_expansion_interests', JSON.stringify(existing));
            console.log('Expansion interest saved to localStorage:', data);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }

        // Try to send to API
        try {
            const response = await fetch('/api/submit-expansion-interest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log('Expansion interest submitted to API successfully');
            } else {
                console.warn('API submission failed, but saved to localStorage');
            }
        } catch (error) {
            console.log('API not available, saved to localStorage only:', error);
        }

        // Show success message
        const formContainer = document.getElementById('expansionFormContainer');
        const successMessage = document.getElementById('expansionSuccessMessage');
        
        if (formContainer) {
            formContainer.style.display = 'none';
        }
        
        if (successMessage) {
            successMessage.classList.add('active');
        }

        // Hide submit button in success view
        if (submitBtn) {
            submitBtn.style.display = 'none';
        }

        const cancelBtn = document.getElementById('expansionCancelBtn');
        if (cancelBtn) {
            cancelBtn.textContent = 'Close';
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeExpansionModal);
    } else {
        initializeExpansionModal();
    }

    // Expose functions globally
    window.showExpansionModal = showExpansionModal;
    window.closeExpansionModal = closeExpansionModal;
    window.submitExpansionInterest = submitExpansionInterest;
})();

