// Tessera Amoris - Application Form JavaScript (Final Fixed Version)

document.addEventListener('DOMContentLoaded', function() {
    // Form sections and progress steps
    const formSections = document.querySelectorAll('.form-section');
    const formContent = document.querySelector('.form-content');
    const applicationContainer = document.getElementById('application-form-container');
    const progressSteps = document.querySelectorAll('.progress-step');
    const btnNext = document.querySelectorAll('.btn-next');
    const btnPrev = document.querySelectorAll('.btn-prev');
    const btnSubmit = document.querySelector('.btn-submit');
    const primaryNextButton = btnNext.length > 0 ? btnNext[0] : null;
    const primaryPrevButton = btnPrev.length > 0 ? btnPrev[0] : null;

    // Current step index
    let currentStep = 0;
    window.currentStep = currentStep;
    
    // Initialize form
    let heightResetTimeout = null;

    function initForm() {
        showSection(currentStep, { skipScroll: true });
        updateProgress();
        updateNavigationButtons();
        syncFormHeight(formSections[currentStep]);

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
        
        // Initialize country code selector with comprehensive codes
        initCountryCodeSelector();
        
        // Initialize value tags
        initValueTags();
        
        // Initialize file uploads
        initFileUploads();
    }
    
    // Show specific form section
    function showSection(index, options = {}) {
        const { skipScroll = false } = options;

        if (!formSections.length) {
            return;
        }

        const targetSection = formSections[index];
        if (!targetSection) {
            return;
        }

        const previousSection = document.querySelector('.form-section.active');
        const startingHeight = previousSection ? previousSection.offsetHeight : targetSection.offsetHeight;

        if (formContent && startingHeight) {
            formContent.style.minHeight = `${startingHeight}px`;
        }

        formSections.forEach((section, i) => {
            const isActive = i === index;
            if (isActive) {
                section.classList.add('active');
                section.setAttribute('aria-hidden', 'false');
            } else {
                section.classList.remove('active');
                section.setAttribute('aria-hidden', 'true');
            }
        });

        requestAnimationFrame(() => {
            syncFormHeight(targetSection);
        });

        updateNavigationButtons();

        if (!skipScroll) {
            scrollToCurrentSection();
        }
        updateNavigationButtons();
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

    function updateNavigationButtons() {
        if (primaryPrevButton) {
            if (currentStep === 0) {
                primaryPrevButton.setAttribute('disabled', 'disabled');
                primaryPrevButton.classList.add('is-disabled');
                primaryPrevButton.style.visibility = 'hidden';
                primaryPrevButton.setAttribute('aria-hidden', 'true');
            } else {
                primaryPrevButton.removeAttribute('disabled');
                primaryPrevButton.classList.remove('is-disabled');
                primaryPrevButton.style.visibility = 'visible';
                primaryPrevButton.setAttribute('aria-hidden', 'false');
            }
        }

        if (primaryNextButton && btnSubmit) {
            if (currentStep === formSections.length - 1) {
                primaryNextButton.style.display = 'none';
                primaryNextButton.setAttribute('aria-hidden', 'true');
                btnSubmit.style.display = 'inline-flex';
                btnSubmit.setAttribute('aria-hidden', 'false');
            } else {
                primaryNextButton.style.display = 'inline-flex';
                primaryNextButton.setAttribute('aria-hidden', 'false');
                btnSubmit.style.display = 'none';
                btnSubmit.setAttribute('aria-hidden', 'true');
            }
        }
    }

    // Validate current section
    function validateSection(index) {
        if (window.formValidation) {
            const result = window.formValidation.validateSection(index);
            console.log(`Section ${index} validation: ${result.isValid ? 'passed' : 'failed'}`);
            return result;
        }
        return { isValid: true, errors: [] };
    }
    
    // Go to next step
    function nextStep() {
        const validationResult = validateSection(currentStep);

        if (validationResult.isValid) {
            if (currentStep < formSections.length - 1) {
                currentStep++;
                window.currentStep = currentStep;
                showSection(currentStep);
                updateProgress();
                scrollToCurrentSection();
            }
        } else {
            handleValidationErrors(validationResult);
        }
    }

    // Go to previous step
    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            window.currentStep = currentStep;
            showSection(currentStep);
            updateProgress();
            scrollToCurrentSection();
        }
    }

    // Submit form
    function submitForm(e) {
        e.preventDefault();

        const validationResult = validateSection(currentStep);

        if (validationResult.isValid) {
            const formContent = document.querySelector('.form-content');
            const successMessage = document.querySelector('.success-message');

            if (formContent && successMessage) {
                formContent.style.display = 'none';
                successMessage.classList.add('active');
            }
        } else {
            handleValidationErrors(validationResult);
        }
    }

    function handleValidationErrors(validationResult) {
        if (window.formValidation && validationResult.errors && validationResult.errors.length > 0) {
            window.formValidation.showValidationNotification(validationResult.errors);
        }
        focusFirstError();
    }

    function scrollToCurrentSection() {
        const activeSection = formSections[currentStep];

        if (!activeSection) {
            return;
        }

        const header = document.querySelector('header');
        const headerOffset = header ? header.offsetHeight : 0;
        const targetPosition = activeSection.getBoundingClientRect().top + window.pageYOffset - (headerOffset + 24);

        window.scrollTo({
            top: targetPosition < 0 ? 0 : targetPosition,
            behavior: 'smooth'
        });
    }

    function focusFirstError() {
        const activeSection = formSections[currentStep];

        if (!activeSection) {
            return;
        }

        const errorElement = activeSection.querySelector('.form-error-message, .error, [aria-invalid="true"], input:invalid, select:invalid, textarea:invalid');

        if (!errorElement) {
            return;
        }

        const focusableScope = errorElement.classList && errorElement.classList.contains('form-error-message')
            ? (errorElement.parentElement || errorElement)
            : errorElement;

        let focusTarget = null;

        if (focusableScope && typeof focusableScope.matches === 'function' && focusableScope.matches('input, select, textarea, button')) {
            focusTarget = focusableScope;
        } else if (focusableScope && typeof focusableScope.querySelector === 'function') {
            focusTarget = focusableScope.querySelector('input, select, textarea, button');
        }

        if (focusTarget && typeof focusTarget.focus === 'function') {
            focusTarget.focus({ preventScroll: true });
        }

        const scrollTarget = focusableScope || errorElement;
        if (scrollTarget && typeof scrollTarget.scrollIntoView === 'function') {
            scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        focusFirstError();
        syncFormHeight(formSections[currentStep]);
    }

    function scrollToCurrentSection() {
        if (!applicationContainer) {
            return;
        }

        const header = document.querySelector('header');
        const headerOffset = header ? header.offsetHeight : 0;
        const targetPosition = applicationContainer.getBoundingClientRect().top + window.pageYOffset - (headerOffset + 24);

        window.scrollTo({
            top: targetPosition < 0 ? 0 : targetPosition,
            behavior: 'smooth'
        });
    }

    function focusFirstError() {
        const activeSection = formSections[currentStep];

        if (!activeSection) {
            return;
        }

        const errorElement = activeSection.querySelector('.form-error-message, .error, [aria-invalid="true"], input:invalid, select:invalid, textarea:invalid');

        if (!errorElement) {
            return;
        }

        const focusableScope = errorElement.classList && errorElement.classList.contains('form-error-message')
            ? (errorElement.parentElement || errorElement)
            : errorElement;

        let focusTarget = null;

        if (focusableScope && typeof focusableScope.matches === 'function' && focusableScope.matches('input, select, textarea, button')) {
            focusTarget = focusableScope;
        } else if (focusableScope && typeof focusableScope.querySelector === 'function') {
            focusTarget = focusableScope.querySelector('input, select, textarea, button');
        }

        if (focusTarget && typeof focusTarget.focus === 'function') {
            focusTarget.focus({ preventScroll: true });
        }

        const scrollTarget = focusableScope || errorElement;
        if (scrollTarget && typeof scrollTarget.scrollIntoView === 'function') {
            scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function syncFormHeight(section = formSections[currentStep]) {
        if (!formContent || !section) {
            return;
        }

        if (heightResetTimeout) {
            clearTimeout(heightResetTimeout);
        }

        const targetHeight = section.offsetHeight;

        if (targetHeight) {
            formContent.style.minHeight = `${targetHeight}px`;

            heightResetTimeout = setTimeout(() => {
                formContent.style.minHeight = `${section.offsetHeight}px`;
            }, 450);
        }
    }

    window.addEventListener('resize', () => {
        syncFormHeight();
    });

    window.syncApplicationFormHeight = function() {
        syncFormHeight();
    };
    
    // Initialize country code selector with comprehensive codes
    function initCountryCodeSelector() {
        const countrySelect = document.getElementById('country');
        const countryCodeSelect = document.getElementById('country-code');
        
        if (!countryCodeSelect) {
            console.log('Country code selector not found');
            return;
        }
        
        // Comprehensive country codes mapping
        const countryCodes = {
            'United States': ['+1'],
            'Canada': ['+1'],
            'Brazil': ['+55'],
            'Argentina': ['+54'],
            'Paraguay': ['+595'],
            'Uruguay': ['+598'],
            'Chile': ['+56'],
            'Colombia': ['+57'],
            'Peru': ['+51'],
            'Venezuela': ['+58'],
            'Bolivia': ['+591'],
            'Ecuador': ['+593'],
            'Mexico': ['+52'],
            'Germany': ['+49'],
            'France': ['+33'],
            'Italy': ['+39'],
            'Spain': ['+34'],
            'United Kingdom': ['+44'],
            'Russia': ['+7'],
            'Poland': ['+48'],
            'Netherlands': ['+31'],
            'Belgium': ['+32'],
            'Switzerland': ['+41'],
            'Austria': ['+43'],
            'Portugal': ['+351'],
            'Sweden': ['+46'],
            'Norway': ['+47'],
            'Denmark': ['+45'],
            'Finland': ['+358'],
            'Ireland': ['+353'],
            'Greece': ['+30'],
            'Turkey': ['+90'],
            'Czech Republic': ['+420'],
            'Hungary': ['+36'],
            'Romania': ['+40'],
            'Bulgaria': ['+359'],
            'Croatia': ['+385'],
            'Serbia': ['+381'],
            'Slovenia': ['+386'],
            'Slovakia': ['+421'],
            'Ukraine': ['+380'],
            'Belarus': ['+375'],
            'Lithuania': ['+370'],
            'Latvia': ['+371'],
            'Estonia': ['+372'],
            'Australia': ['+61'],
            'New Zealand': ['+64'],
            'Japan': ['+81'],
            'China': ['+86'],
            'India': ['+91'],
            'South Korea': ['+82'],
            'Singapore': ['+65'],
            'Malaysia': ['+60'],
            'Indonesia': ['+62'],
            'Philippines': ['+63'],
            'Thailand': ['+66'],
            'Vietnam': ['+84'],
            'South Africa': ['+27'],
            'Nigeria': ['+234'],
            'Egypt': ['+20'],
            'Morocco': ['+212'],
            'Israel': ['+972'],
            'Saudi Arabia': ['+966'],
            'United Arab Emirates': ['+971'],
            'Qatar': ['+974'],
            'Kuwait': ['+965'],
            'Bahrain': ['+973'],
            'Oman': ['+968']
        };
        
        // Clear existing options and add comprehensive list
        countryCodeSelect.innerHTML = '';
        
        // Add all country codes
        Object.entries(countryCodes).forEach(([country, codes]) => {
            codes.forEach(code => {
                const option = new Option(`${code} (${country})`, code);
                countryCodeSelect.add(option);
            });
        });
        
        // Set default to +1 (US/Canada)
        countryCodeSelect.value = '+1';
        
        // Update country code when country changes (if country selector exists)
        if (countrySelect) {
            countrySelect.addEventListener('change', function() {
                const selectedCountry = this.value;
                const codes = countryCodes[selectedCountry] || ['+1'];
                
                // Select the first available code for the country
                if (codes.length > 0) {
                    countryCodeSelect.value = codes[0];
                }
            });
        }
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
    
    window.validateSection = validateSection;

    // Initialize form when DOM is ready
    initForm();
});
