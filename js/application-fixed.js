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
        
        if (countrySelect && countryCodeSelect) {
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
            
            // Update country code when country changes
            countrySelect.addEventListener('change', function() {
                const selectedCountry = this.value;
                const codes = countryCodes[selectedCountry] || ['+1'];
                
                // Clear existing options except the first one
                while (countryCodeSelect.options.length > 1) {
                    countryCodeSelect.removeChild(countryCodeSelect.lastChild);
                }
                
                // Add country codes for selected country
                codes.forEach(code => {
                    const option = new Option(code, code);
                    countryCodeSelect.add(option);
                });
                
                // Select the first available code
                if (codes.length > 0) {
                    countryCodeSelect.value = codes[0];
                }
            });
            
            // Trigger change event to set initial value
            if (countrySelect.value) {
                countrySelect.dispatchEvent(new Event('change'));
            }
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
    
    // Initialize form when DOM is ready
    initForm();
});
