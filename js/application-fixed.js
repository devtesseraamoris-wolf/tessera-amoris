// Tessera Amoris - Application Form JavaScript (Fixed Version)

document.addEventListener('DOMContentLoaded', function() {
    // Form sections and progress steps
    const formSections = document.querySelectorAll('.form-section');
    const progressSteps = document.querySelectorAll('.progress-step');
    const btnNext = document.querySelectorAll('.btn-next');
    const btnPrev = document.querySelectorAll('.btn-prev');
    const btnSubmit = document.querySelector('.btn-submit');
    
    // Current step index
    let currentStep = 0;
    
    // Initialize form
    function initForm() {
        showSection(currentStep);
        updateProgress();
        
        // Add event listeners to navigation buttons
        btnNext.forEach(button => {
            button.addEventListener('click', nextStep);
        });
        
        btnPrev.forEach(button => {
            button.addEventListener('click', prevStep);
        });
        
        if (btnSubmit) {
            btnSubmit.addEventListener('click', submitForm);
        }
        
        // Initialize country code selector
        initCountryCodeSelector();
        
        // Initialize value tags
        initValueTags();
        
        // Initialize file uploads
        initFileUploads();
    }
    
    // Show specific form section
    function showSection(index) {
        formSections.forEach((section, i) => {
            if (i === index) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }
    
    // Update progress bar
    function updateProgress() {
        progressSteps.forEach((step, i) => {
            if (i < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (i === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    }
    
    // Validate current section (FIXED VERSION)
    function validateSection(index) {
        const section = formSections[index];
        let isValid = true;
        
        // Get all required inputs in the current section
        const requiredInputs = section.querySelectorAll('input[required], select[required], textarea[required]');
        
        // Validate standard form inputs
        requiredInputs.forEach(input => {
            const value = input.value ? input.value.trim() : '';
            
            if (!value) {
                isValid = false;
                input.classList.add('is-invalid');
                
                // Create or update invalid feedback message
                let feedback = input.nextElementSibling;
                if (!feedback || !feedback.classList.contains('invalid-feedback')) {
                    feedback = document.createElement('div');
                    feedback.className = 'invalid-feedback';
                    feedback.style.color = '#dc3545';
                    feedback.style.fontSize = '0.875rem';
                    feedback.style.marginTop = '0.25rem';
                    input.parentNode.insertBefore(feedback, input.nextSibling);
                }
                feedback.textContent = 'This field is required.';
            } else {
                input.classList.remove('is-invalid');
                
                // Remove invalid feedback if exists
                const feedback = input.nextElementSibling;
                if (feedback && feedback.classList.contains('invalid-feedback')) {
                    feedback.remove();
                }
            }
        });
        
        // Special validation for custom components
        
        // 1. Occupation field validation (make it optional for now)
        const occupationContainer = section.querySelector('.occupation-selector');
        if (occupationContainer) {
            // Occupation is optional, so we don't fail validation
            console.log('Occupation field found - treating as optional');
        }
        
        // 2. Languages field validation (make it optional for now)
        const languagesContainer = section.querySelector('.languages-selector');
        if (languagesContainer) {
            // Languages is optional, so we don't fail validation
            console.log('Languages field found - treating as optional');
        }
        
        // 3. Date picker validation
        const monthSelect = section.querySelector('select[name="birth-month"]');
        const daySelect = section.querySelector('select[name="birth-day"]');
        const yearSelect = section.querySelector('select[name="birth-year"]');
        
        if (monthSelect && daySelect && yearSelect) {
            if (!monthSelect.value || !daySelect.value || !yearSelect.value) {
                if (!monthSelect.value) {
                    monthSelect.classList.add('is-invalid');
                    isValid = false;
                }
                if (!daySelect.value) {
                    daySelect.classList.add('is-invalid');
                    isValid = false;
                }
                if (!yearSelect.value) {
                    yearSelect.classList.add('is-invalid');
                    isValid = false;
                }
            } else {
                monthSelect.classList.remove('is-invalid');
                daySelect.classList.remove('is-invalid');
                yearSelect.classList.remove('is-invalid');
            }
        }
        
        console.log(`Section ${index} validation result:`, isValid);
        return isValid;
    }
    
    // Go to next step
    function nextStep() {
        console.log('Next step clicked, current step:', currentStep);
        
        if (validateSection(currentStep)) {
            if (currentStep < formSections.length - 1) {
                currentStep++;
                showSection(currentStep);
                updateProgress();
                window.scrollTo(0, 0);
                console.log('Advanced to step:', currentStep);
            }
        } else {
            console.log('Validation failed for step:', currentStep);
        }
    }
    
    // Go to previous step
    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            showSection(currentStep);
            updateProgress();
            window.scrollTo(0, 0);
        }
    }
    
    // Submit form
    function submitForm(e) {
        e.preventDefault();
        
        if (validateSection(currentStep)) {
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show a success message
            
            const formContent = document.querySelector('.form-content');
            const successMessage = document.querySelector('.success-message');
            
            if (formContent && successMessage) {
                formContent.style.display = 'none';
                successMessage.classList.add('active');
            }
        }
    }
    
    // Initialize country code selector with comprehensive codes
    function initCountryCodeSelector() {
        const countrySelect = document.getElementById('country');
        const countryCodeSelect = document.getElementById('country-code');
        
        if (!countrySelect || !countryCodeSelect) {
            return;
        }

        const locationCountries = (typeof LOCATION_DATA !== 'undefined' && LOCATION_DATA.countries) ? LOCATION_DATA.countries : {};
        const countryCodes = {};
        const countryLabels = {};

        Object.entries(locationCountries).forEach(([code, country]) => {
            if (Array.isArray(country.dialCodes) && country.dialCodes.length) {
                countryCodes[code] = [...country.dialCodes];
            }
            countryLabels[code] = country.name || code;
        });

        countryCodes.OTHER = countryCodes.OTHER || ['+1'];
        countryLabels.OTHER = countryLabels.OTHER || 'Other';

        const resolveCountry = () => {
            const selected = countrySelect.value;
            if (selected && countryCodes[selected]) {
                return selected;
            }
            if (selected) {
                return 'OTHER';
            }
            return 'PY';
        };

        const updateCodes = (countryCode) => {
            const codes = countryCodes[countryCode] || countryCodes.OTHER || ['+1'];
            countryCodeSelect.innerHTML = '';
            codes.forEach(code => {
                const label = countryLabels[countryCode] || countryLabels.OTHER;
                const option = new Option(`${code} (${label})`, code);
                countryCodeSelect.add(option);
            });
            if (codes.length) {
                countryCodeSelect.value = codes[0];
            }
        };

        updateCodes(resolveCountry());

        countrySelect.addEventListener('change', () => {
            updateCodes(resolveCountry());
        });
    }
    
    // Initialize value tags
    function initValueTags() {
        const valueTags = document.querySelectorAll('.value-tag');
        
        valueTags.forEach(tag => {
            tag.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                const input = document.querySelector(`input[value="${value}"]`);
                
                this.classList.toggle('selected');
                
                if (input) {
                    input.checked = this.classList.contains('selected');
                }
            });
        });
    }
    
    // Initialize file uploads
    function initFileUploads() {
        const fileInputs = document.querySelectorAll('.file-upload-input');
        
        fileInputs.forEach(input => {
            input.addEventListener('change', function() {
                const filePreview = this.closest('.file-upload').nextElementSibling;
                
                if (filePreview && filePreview.classList.contains('file-preview')) {
                    filePreview.innerHTML = '';
                    
                    if (this.files.length > 0) {
                        filePreview.classList.add('active');
                        
                        Array.from(this.files).forEach(file => {
                            const previewItem = document.createElement('div');
                            previewItem.className = 'file-preview-item';
                            
                            const previewName = document.createElement('div');
                            previewName.className = 'file-preview-name';
                            previewName.textContent = file.name;
                            
                            const previewRemove = document.createElement('button');
                            previewRemove.className = 'file-preview-remove';
                            previewRemove.innerHTML = '&times;';
                            previewRemove.addEventListener('click', function() {
                                previewItem.remove();
                                
                                if (filePreview.children.length === 0) {
                                    filePreview.classList.remove('active');
                                    input.value = '';
                                }
                            });
                            
                            previewItem.appendChild(previewName);
                            previewItem.appendChild(previewRemove);
                            filePreview.appendChild(previewItem);
                        });
                    } else {
                        filePreview.classList.remove('active');
                    }
                }
            });
        });
    }
    
    // Initialize form when DOM is ready
    initForm();
});
