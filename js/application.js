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
        
        if (countrySelect && countryCodeSelect) {
            // Country codes mapping (simplified version)
            const countryCodes = {
                'United States': '+1',
                'Canada': '+1',
                'United Kingdom': '+44',
                'Australia': '+61',
                'Germany': '+49',
                'France': '+33',
                'Spain': '+34',
                'Italy': '+39',
                'Brazil': '+55',
                'Mexico': '+52',
                'Argentina': '+54',
                'Chile': '+56',
                'Colombia': '+57',
                'Peru': '+51',
                'Venezuela': '+58',
                'Paraguay': '+595',
                'Uruguay': '+598',
                'Bolivia': '+591',
                'Ecuador': '+593',
                'Japan': '+81',
                'China': '+86',
                'India': '+91',
                'Russia': '+7',
                'South Africa': '+27',
                'Nigeria': '+234',
                'Egypt': '+20',
                'Saudi Arabia': '+966',
                'United Arab Emirates': '+971',
                'Israel': '+972',
                'Turkey': '+90',
                'Greece': '+30',
                'Portugal': '+351',
                'Ireland': '+353',
                'Sweden': '+46',
                'Norway': '+47',
                'Denmark': '+45',
                'Finland': '+358',
                'Netherlands': '+31',
                'Belgium': '+32',
                'Switzerland': '+41',
                'Austria': '+43',
                'Poland': '+48',
                'Czech Republic': '+420',
                'Hungary': '+36',
                'Romania': '+40',
                'Bulgaria': '+359',
                'Croatia': '+385',
                'Serbia': '+381',
                'Slovenia': '+386',
                'Slovakia': '+421',
                'Ukraine': '+380',
                'Belarus': '+375',
                'Lithuania': '+370',
                'Latvia': '+371',
                'Estonia': '+372',
                'Moldova': '+373',
                'Georgia': '+995',
                'Armenia': '+374',
                'Azerbaijan': '+994',
                'Kazakhstan': '+7',
                'Uzbekistan': '+998',
                'Turkmenistan': '+993',
                'Kyrgyzstan': '+996',
                'Tajikistan': '+992',
                'Mongolia': '+976',
                'North Korea': '+850',
                'South Korea': '+82',
                'Taiwan': '+886',
                'Hong Kong': '+852',
                'Macao': '+853',
                'Singapore': '+65',
                'Malaysia': '+60',
                'Indonesia': '+62',
                'Philippines': '+63',
                'Thailand': '+66',
                'Vietnam': '+84',
                'Cambodia': '+855',
                'Laos': '+856',
                'Myanmar': '+95',
                'Bangladesh': '+880',
                'Pakistan': '+92',
                'Sri Lanka': '+94',
                'Nepal': '+977',
                'Bhutan': '+975',
                'Maldives': '+960',
                'Afghanistan': '+93',
                'Iran': '+98',
                'Iraq': '+964',
                'Syria': '+963',
                'Lebanon': '+961',
                'Jordan': '+962',
                'Kuwait': '+965',
                'Bahrain': '+973',
                'Qatar': '+974',
                'Oman': '+968',
                'Yemen': '+967',
                'New Zealand': '+64',
                'Fiji': '+679',
                'Papua New Guinea': '+675',
                'Solomon Islands': '+677',
                'Vanuatu': '+678',
                'Samoa': '+685',
                'Tonga': '+676',
                'Kiribati': '+686',
                'Tuvalu': '+688',
                'Marshall Islands': '+692',
                'Micronesia': '+691',
                'Palau': '+680',
                'Nauru': '+674',
                'Morocco': '+212',
                'Algeria': '+213',
                'Tunisia': '+216',
                'Libya': '+218',
                'Sudan': '+249',
                'South Sudan': '+211',
                'Ethiopia': '+251',
                'Eritrea': '+291',
                'Somalia': '+252',
                'Djibouti': '+253',
                'Kenya': '+254',
                'Tanzania': '+255',
                'Uganda': '+256',
                'Rwanda': '+250',
                'Burundi': '+257',
                'Democratic Republic of the Congo': '+243',
                'Republic of the Congo': '+242',
                'Gabon': '+241',
                'Equatorial Guinea': '+240',
                'Cameroon': '+237',
                'Central African Republic': '+236',
                'Chad': '+235',
                'Niger': '+227',
                'Mali': '+223',
                'Burkina Faso': '+226',
                'Senegal': '+221',
                'Gambia': '+220',
                'Guinea-Bissau': '+245',
                'Guinea': '+224',
                'Sierra Leone': '+232',
                'Liberia': '+231',
                'Ivory Coast': '+225',
                'Ghana': '+233',
                'Togo': '+228',
                'Benin': '+229',
                'Mauritania': '+222',
                'Western Sahara': '+212',
                'Cape Verde': '+238',
                'Sao Tome and Principe': '+239',
                'Angola': '+244',
                'Namibia': '+264',
                'Botswana': '+267',
                'Zimbabwe': '+263',
                'Zambia': '+260',
                'Malawi': '+265',
                'Mozambique': '+258',
                'Madagascar': '+261',
                'Mauritius': '+230',
                'Comoros': '+269',
                'Seychelles': '+248',
                'Lesotho': '+266',
                'Eswatini': '+268'
            };
            
            // Update country code when country changes
            countrySelect.addEventListener('change', function() {
                const selectedCountry = this.value;
                const countryCode = countryCodes[selectedCountry] || '';
                
                // Find or create the option
                let option = Array.from(countryCodeSelect.options).find(opt => opt.value === countryCode);
                
                if (!option && countryCode) {
                    option = new Option(countryCode, countryCode);
                    countryCodeSelect.add(option);
                }
                
                if (option) {
                    countryCodeSelect.value = countryCode;
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
