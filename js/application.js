// Tessera Amoris - Application Form JavaScript

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
    
    // Validate current section
    function validateSection(index) {
        const section = formSections[index];
        const requiredInputs = section.querySelectorAll('[required]');
        let isValid = true;
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
                
                // Create or update invalid feedback message
                let feedback = input.nextElementSibling;
                if (!feedback || !feedback.classList.contains('invalid-feedback')) {
                    feedback = document.createElement('div');
                    feedback.className = 'invalid-feedback';
                    input.parentNode.insertBefore(feedback, input.nextSibling);
                }
                feedback.textContent = 'This field is required.';
            } else {
                input.classList.remove('is-invalid');
                
                // Remove invalid feedback if exists
                const feedback = input.nextElementSibling;
                if (feedback && feedback.classList.contains('invalid-feedback')) {
                    feedback.textContent = '';
                }
            }
            
            // Add input event listener to validate on change
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('is-invalid');
                    
                    // Remove invalid feedback if exists
                    const feedback = this.nextElementSibling;
                    if (feedback && feedback.classList.contains('invalid-feedback')) {
                        feedback.textContent = '';
                    }
                }
            });
        });
        
        return isValid;
    }
    
    // Go to next step
    function nextStep() {
        if (validateSection(currentStep)) {
            if (currentStep < formSections.length - 1) {
                currentStep++;
                showSection(currentStep);
                updateProgress();
                window.scrollTo(0, 0);
            }
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
    
    // Initialize country code selector
    function initCountryCodeSelector() {
        const countrySelect = document.getElementById('country');
        const countryCodeSelect = document.getElementById('country-code');

        if (!countryCodeSelect) {
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

        countryCodeSelect.innerHTML = '';

        Object.entries(countryCodes).forEach(([code, codes]) => {
            const label = countryLabels[code] || code;
            codes.forEach(dial => {
                const option = new Option(`${dial} (${label})`, dial);
                option.dataset.countryCode = code;
                countryCodeSelect.add(option);
            });
        });

        const resolveCountry = () => {
            const selected = countrySelect ? countrySelect.value : '';
            if (selected && countryCodes[selected]) {
                return selected;
            }
            if (selected) {
                return 'OTHER';
            }
            return 'PY';
        };

        const applyCountryCode = (code) => {
            const codes = countryCodes[code] || countryCodes.OTHER || ['+1'];
            if (codes.length) {
                countryCodeSelect.value = codes[0];
            }
        };

        applyCountryCode(resolveCountry());

        if (countrySelect) {
            countrySelect.addEventListener('change', () => {
                applyCountryCode(resolveCountry());
            });
        }
    }

    
    // Initialize value tags
    function initValueTags() {
        const valueTags = document.querySelectorAll('.value-tag');
        const valueInputs = document.querySelectorAll('.value-input');
        
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
    
    // Gender-based photo requirements
    function initGenderBasedRequirements() {
        const genderSelect = document.getElementById('gender');
        const photoRequirements = document.getElementById('photo-requirements');
        
        if (genderSelect && photoRequirements) {
            genderSelect.addEventListener('change', function() {
                const selectedGender = this.value;
                
                if (selectedGender === 'male') {
                    photoRequirements.textContent = 'Please upload 1-2 recent photos of yourself (taken within the last 6 months)';
                } else if (selectedGender === 'female') {
                    photoRequirements.textContent = 'Please upload 2-3 recent photos of yourself (taken within the last 6 months)';
                } else {
                    photoRequirements.textContent = 'Please upload 1-2 recent photos of yourself (taken within the last 6 months)';
                }
            });
        }
    }
    
    // Faith tradition custom field toggle
    function initFaithTraditionToggle() {
        const faithSelect = document.getElementById('faith-tradition');
        const faithCustom = document.getElementById('faith-custom');
        
        if (faithSelect && faithCustom) {
            faithSelect.addEventListener('change', function() {
                if (this.value === 'Other') {
                    faithCustom.style.display = 'block';
                    faithCustom.required = true;
                } else {
                    faithCustom.style.display = 'none';
                    faithCustom.required = false;
                    faithCustom.value = '';
                }
            });
            
            // Initialize on page load
            if (faithSelect.value !== 'Other') {
                faithCustom.style.display = 'none';
            }
        }
    }
    
    // Initialize enhanced features
    function initEnhancedFeatures() {
        initGenderBasedRequirements();
        initFaithTraditionToggle();
    }
    
    // Initialize the form
    initForm();
    initEnhancedFeatures();
});
