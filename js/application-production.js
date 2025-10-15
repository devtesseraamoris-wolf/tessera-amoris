// Production Application Form with Supabase Integration
// This file replaces the demo submitForm function with real API calls

// Import Supabase client (will be loaded from CDN in HTML)
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

document.addEventListener('DOMContentLoaded', function() {
    // Keep all existing form navigation code from application.js
    // Only override the submitForm function
    
    // Get the original submit function reference
    const originalSubmitForm = window.submitForm;
    
    // Override submitForm with production version
    window.submitForm = async function(e) {
        e.preventDefault();
        
        // Validate current section
        if (!validateSection(currentStep)) {
            return;
        }
        
        // Show loading state
        const submitBtn = document.querySelector('.btn-submit');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        
        try {
            // Collect all form data
            const formData = collectFormData();
            
            // Upload photo first if exists
            let photoUrl = null;
            const photoInput = document.getElementById('verification-photo');
            if (photoInput && photoInput.files && photoInput.files[0]) {
                photoUrl = await uploadPhoto(photoInput.files[0]);
            }
            
            // Add photo URL to form data
            formData.photoUrl = photoUrl;
            
            // Submit application
            const response = await fetch('/api/submit-application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || 'Submission failed');
            }
            
            // Show success message
            const formContent = document.querySelector('.form-content');
            const successMessage = document.querySelector('.success-message');
            
            if (formContent && successMessage) {
                formContent.style.display = 'none';
                successMessage.classList.add('active');
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            
            // Clear form data from localStorage
            localStorage.removeItem('tesseraAmorisFormData');
            
        } catch (error) {
            console.error('Submission error:', error);
            
            // Show error message
            alert(`Sorry, there was an error submitting your application: ${error.message}. Please try again or contact us for assistance.`);
            
            // Restore button
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    };
    
    // Function to collect all form data
    function collectFormData() {
        return {
            // Personal Information
            fullName: document.getElementById('full-name')?.value || '',
            dateOfBirth: document.getElementById('date-of-birth')?.value || '',
            gender: document.querySelector('input[name="gender"]:checked')?.value || '',
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            country: document.getElementById('country')?.value || '',
            city: document.getElementById('city')?.value || document.getElementById('custom-city')?.value || '',
            nationality: document.getElementById('nationality')?.value || '',
            
            // Faith & Values
            faithTradition: document.getElementById('faith-tradition')?.value || document.getElementById('faith-custom')?.value || '',
            faithImportance: document.querySelector('input[name="faith-importance"]:checked')?.value || '',
            churchInvolvement: document.getElementById('church-involvement')?.value || '',
            coreValues: collectSelectedValues(),
            
            // Relationship Goals
            maritalStatus: document.getElementById('marital-status')?.value || '',
            hasChildren: document.querySelector('input[name="has-children"]:checked')?.value === 'yes',
            childrenCount: parseInt(document.getElementById('children-count')?.value || '0'),
            wantsChildren: document.querySelector('input[name="wants-children"]:checked')?.value === 'yes',
            familyVision: document.getElementById('family-vision')?.value || '',
            partnerQualities: document.getElementById('partner-qualities')?.value || '',
            
            // Verification
            occupation: document.getElementById('occupation')?.value || document.getElementById('occupation-other')?.value || '',
            languages: collectSelectedLanguages(),
            reference1Name: document.getElementById('reference-name-1')?.value || '',
            reference1Relationship: document.getElementById('reference-relationship-1')?.value || '',
            reference1Email: document.getElementById('reference-email-1')?.value || '',
            reference1Phone: document.getElementById('reference-phone-1')?.value || '',
            reference2Name: document.getElementById('reference-name-2')?.value || '',
            reference2Relationship: document.getElementById('reference-relationship-2')?.value || '',
            reference2Email: document.getElementById('reference-email-2')?.value || '',
            reference2Phone: document.getElementById('reference-phone-2')?.value || ''
        };
    }
    
    // Function to collect selected values
    function collectSelectedValues() {
        const selectedValues = [];
        document.querySelectorAll('.value-tag.selected').forEach(tag => {
            selectedValues.push(tag.textContent.trim());
        });
        return selectedValues;
    }
    
    // Function to collect selected languages
    function collectSelectedLanguages() {
        const selectedLanguages = [];
        document.querySelectorAll('.language-tag.selected').forEach(tag => {
            selectedLanguages.push(tag.textContent.trim());
        });
        return selectedLanguages;
    }
    
    // Function to upload photo
    async function uploadPhoto(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = async function(e) {
                try {
                    const response = await fetch('/api/upload-photo', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            fileData: e.target.result,
                            fileName: file.name,
                            fileType: file.type
                        })
                    });
                    
                    const result = await response.json();
                    
                    if (!response.ok) {
                        throw new Error(result.message || 'Photo upload failed');
                    }
                    
                    resolve(result.photoUrl);
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = function() {
                reject(new Error('Failed to read file'));
            };
            
            reader.readAsDataURL(file);
        });
    }
});

