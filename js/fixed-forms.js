// Fixed Form Functionality - All Issues Resolved
const NATIONALITY_SUGGESTIONS = [
    'Paraguayan', 'Albanian', 'Andorran', 'Austrian', 'Belarusian', 'Belgian',
    'Bosnian and Herzegovinian', 'Bulgarian', 'Croatian', 'Czech', 'Danish',
    'Estonian', 'Finnish', 'French', 'German', 'Greek', 'Vatican Citizen',
    'Hungarian', 'Icelandic', 'Irish', 'Italian', 'Latvian', 'Liechtensteiner',
    'Lithuanian', 'Luxembourgish', 'Maltese', 'Moldovan', 'Monégasque',
    'Montenegrin', 'Dutch', 'North Macedonian', 'Norwegian', 'Polish',
    'Portuguese', 'Romanian', 'Russian', 'Sammarinese', 'Serbian', 'Slovak',
    'Slovenian', 'Spanish', 'Swedish', 'Swiss', 'Ukrainian', 'British',
    'Dual Nationality', "My nationality isn't listed"
];
document.addEventListener('DOMContentLoaded', function() {
    console.log('Fixed forms script loaded');
    
    // Fix all form styling issues first
    fixFormStyling();
    
    // Initialize all form components
    initializeLocationSelectors();
    initializeDatePicker();
    initializeOccupationField();
    initializeLanguagesField();
    initializeNationalityField();
    initializeAllFormFields();
});

function fixFormStyling() {
    // Create comprehensive CSS fixes
    const style = document.createElement('style');
    style.textContent = `
        /* Fix all form inputs to have proper visibility */
        input[type="text"],
        input[type="email"],
        input[type="tel"],
        select,
        textarea,
        .form-input,
        .location-select,
        .date-select {
            background-color: #ffffff !important;
            color: #2c3e50 !important;
            border: 2px solid #e1e8ed !important;
            padding: 12px 16px !important;
            font-size: 16px !important;
            border-radius: 8px !important;
            transition: all 0.3s ease !important;
            box-sizing: border-box !important;
        }
        
        /* Focus states */
        input[type="text"]:focus,
        input[type="email"]:focus,
        input[type="tel"]:focus,
        select:focus,
        textarea:focus,
        .form-input:focus,
        .location-select:focus,
        .date-select:focus {
            border-color: #d4af37 !important;
            box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1) !important;
            outline: none !important;
        }
        
        /* Disabled states */
        select:disabled,
        .location-select:disabled {
            background-color: #f8f9fa !important;
            color: #6c757d !important;
            cursor: not-allowed !important;
            opacity: 0.6 !important;
        }
        
        /* Labels */
        .form-label,
        .sophisticated-label {
            color: #2c3e50 !important;
            font-weight: 600 !important;
            margin-bottom: 8px !important;
            display: block !important;
            font-size: 16px !important;
        }
        
        /* Field descriptions */
        .field-description {
            color: #6c757d !important;
            font-size: 14px !important;
            margin-top: 4px !important;
        }

        /* Nationality suggestions */
        .nationality-suggestion-container {
            display: none;
            margin-top: 10px;
            padding: 10px 12px;
            background: #f9fafb;
            border-radius: 12px;
            border: 1px solid #e1e8ed;
            gap: 12px;
            overflow-x: auto;
            scroll-snap-type: x proximity;
        }

        .nationality-suggestion-container.active {
            display: flex;
            align-items: center;
        }

        .nationality-suggestion-container::-webkit-scrollbar {
            height: 6px;
        }

        .nationality-suggestion-container::-webkit-scrollbar-thumb {
            background: rgba(212, 175, 55, 0.6);
            border-radius: 999px;
        }

        .nationality-pill {
            flex: 0 0 auto;
            scroll-snap-align: start;
            background: linear-gradient(135deg, #f3ead1, #e7c87a);
            border: none;
            border-radius: 999px;
            padding: 6px 16px;
            color: #2c3e50;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            white-space: nowrap;
        }

        .nationality-pill:hover,
        .nationality-pill:focus {
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(212, 175, 55, 0.25);
            outline: none;
        }

        .nationality-suggestion-empty {
            color: #6c757d;
            font-style: italic;
        }

        /* Date picker container */
        .date-picker-container {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 12px;
        }
        
        /* Location row */
        .location-row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            align-items: start;
        }
        
        /* Phone input container */
        .phone-input-container {
            display: flex;
            gap: 8px;
        }
        
        .country-code-select {
            flex: 0 0 80px;
        }
        
        .phone-number-input {
            flex: 1;
        }
        
        /* Mobile responsive */
        @media (max-width: 768px) {
            .location-row,
            .date-picker-container {
                grid-template-columns: 1fr;
                gap: 16px;
            }

            .phone-input-container {
                flex-direction: column;
            }

            .country-code-select {
                flex: 1;
            }

            .nationality-suggestion-container.active {
                flex-wrap: wrap;
                justify-content: flex-start;
            }
        }
    `;
    document.head.appendChild(style);
}

function initializeLocationSelectors() {
    console.log('Initializing location selectors');

    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');
    const customCityGroup = document.getElementById('custom-city-group');
    const customCityInput = document.getElementById('custom-city');
    const locationService = window.locationDataService;

    if (!countrySelect || !stateSelect || !citySelect) {
        console.error('Location selectors not found');
        return;
    }

    if (!locationService) {
        console.error('Location data service is unavailable');
        return;
    }

    const allowedCountries = new Set(Object.keys(locationService.countries));

    // Mapping from country code (select value) to phone prefix. Keep minimal and extend as needed.
    const COUNTRY_PHONE_PREFIX = {
        'PY': '+595',
        'US': '+1',
        'GB': '+44',
        'DE': '+49',
        'FR': '+33',
        'ES': '+34',
        'IT': '+39',
        'BR': '+55'
    };

    function resetStateSelect(placeholderText) {
        stateSelect.innerHTML = `<option value="">${placeholderText}</option>`;
        stateSelect.disabled = true;
    }

    function resetCitySelect(placeholderText) {
        citySelect.innerHTML = `<option value="">${placeholderText}</option>`;
        citySelect.disabled = true;
    }

    function toggleCustomCity(shouldShow) {
        if (!customCityGroup) return;
        customCityGroup.hidden = !shouldShow;
        if (customCityInput) {
            customCityInput.required = shouldShow;
            if (!shouldShow) {
                customCityInput.value = '';
            }
        }
    }

    async function handleCountryChange() {
        const selectedCountry = countrySelect.value;
        console.log('Country selected:', selectedCountry);

        toggleCustomCity(false);
        resetStateSelect('Select your state/province');
        resetCitySelect('Select your city');

        if (!selectedCountry) {
            return;
        }

        // If we have a known phone prefix for the selected country, preselect the country-code select
        try {
            const countryCodeSelect = document.getElementById('country-code');
            if (countryCodeSelect) {
                const prefix = COUNTRY_PHONE_PREFIX[selectedCountry];
                if (prefix) {
                    // If an option with this value exists, select it. Otherwise, try to add it.
                    const existing = Array.from(countryCodeSelect.options).find(o => o.value === prefix);
                    if (existing) {
                        countryCodeSelect.value = prefix;
                    } else {
                        const opt = document.createElement('option');
                        opt.value = prefix;
                        opt.textContent = prefix;
                        countryCodeSelect.appendChild(opt);
                        countryCodeSelect.value = prefix;
                    }
                }
            }
        } catch (e) {
            console.warn('Unable to preselect country code', e);
        }

        if (!allowedCountries.has(selectedCountry)) {
            resetStateSelect('State/province not required');
            resetCitySelect('Select your city');

            const otherOption = document.createElement('option');
            otherOption.value = 'other';
            otherOption.textContent = 'Other (specify below)';
            citySelect.appendChild(otherOption);

            citySelect.disabled = false;
            return;
        }

        stateSelect.innerHTML = '<option value="">Loading states...</option>';
        stateSelect.disabled = true;

        try {
            const states = await locationService.getStates(selectedCountry);
            resetStateSelect('Select your state/province');

            if (states.length) {
                states.forEach(state => {
                    const option = document.createElement('option');
                    option.value = state.code;
                    option.textContent = state.name;
                    stateSelect.appendChild(option);
                });
                stateSelect.disabled = false;
            } else {
                stateSelect.innerHTML = '<option value="">No regions available</option>';
                const otherOption = document.createElement('option');
                otherOption.value = 'other';
                otherOption.textContent = 'Other (specify below)';
                citySelect.appendChild(otherOption);
                citySelect.disabled = false;
            }
        } catch (error) {
            console.error('Unable to populate states', error);
            resetStateSelect('Unable to load states');
            resetCitySelect('Select your city');
            const otherOption = document.createElement('option');
            otherOption.value = 'other';
            otherOption.textContent = 'Other (specify below)';
            citySelect.appendChild(otherOption);
            citySelect.disabled = false;
        }
    }

    async function handleStateChange() {
        const selectedCountry = countrySelect.value;
        const selectedState = stateSelect.value;
        console.log('State selected:', selectedState);

        toggleCustomCity(false);
        resetCitySelect('Select your city');

        if (!selectedCountry || !selectedState) {
            return;
        }

        citySelect.innerHTML = '<option value="">Loading cities...</option>';
        citySelect.disabled = true;

        try {
            const cities = await locationService.getCities(selectedCountry, selectedState);
            resetCitySelect('Select your city');

            if (cities.length) {
                cities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
            }

            const otherOption = document.createElement('option');
            otherOption.value = 'other';
            otherOption.textContent = 'Other (specify below)';
            citySelect.appendChild(otherOption);

            citySelect.disabled = false;
        } catch (error) {
            console.error('Unable to populate cities', error);
            resetCitySelect('Unable to load cities');
            const otherOption = document.createElement('option');
            otherOption.value = 'other';
            otherOption.textContent = 'Other (specify below)';
            citySelect.appendChild(otherOption);
            citySelect.disabled = false;
        }
    }

    countrySelect.addEventListener('change', handleCountryChange);
    stateSelect.addEventListener('change', handleStateChange);

    citySelect.addEventListener('change', function() {
        if (!customCityGroup) return;
        if (this.value === 'other') {
            toggleCustomCity(true);
        } else {
            toggleCustomCity(false);
        }
    });

    if (countrySelect.value) {
        handleCountryChange().then(() => {
            if (stateSelect.value) {
                handleStateChange();
            }
        });
    }
}

function initializeDatePicker() {
    console.log('Initializing date picker');
    
    const monthSelect = document.getElementById('birth-month');
    const daySelect = document.getElementById('birth-day');
    const yearSelect = document.getElementById('birth-year');
    
    if (!monthSelect || !daySelect || !yearSelect) {
        console.error('Date picker elements not found');
        return;
    }
    
    // Clear existing options
    monthSelect.innerHTML = '<option value=\"\">Month</option>';
    daySelect.innerHTML = '<option value=\"\">Day</option>';
    yearSelect.innerHTML = '<option value=\"\">Year</option>';
    
    // Populate months
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = month;
        monthSelect.appendChild(option);
    });
    
    // Populate years (18 to 80 years old)
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 80;
    const endYear = currentYear - 18;
    
    for (let year = endYear; year >= startYear; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
    
    // Function to update days based on selected month (and optionally year)
    function updateDays() {
        const month = parseInt(monthSelect.value);
        const year = parseInt(yearSelect.value) || 2024; // Use current year as default if not selected
        
        daySelect.innerHTML = '<option value="">Day</option>';
        
        if (month) {
            // Calculate days in month (use year if available, otherwise assume non-leap year)
            let daysInMonth;
            if (month === 2) {
                // February - check for leap year
                daysInMonth = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
            } else if ([4, 6, 9, 11].includes(month)) {
                // April, June, September, November
                daysInMonth = 30;
            } else {
                // January, March, May, July, August, October, December
                daysInMonth = 31;
            }
            
            for (let day = 1; day <= daysInMonth; day++) {
                const option = document.createElement('option');
                option.value = day;
                option.textContent = day;
                daySelect.appendChild(option);
            }
            
            daySelect.disabled = false;
        } else {
            daySelect.disabled = true;
        }
    }
    
    // Function to refine days when year is selected (for February leap year accuracy)
    function refineDays() {
        const month = parseInt(monthSelect.value);
        const year = parseInt(yearSelect.value);
        const selectedDay = parseInt(daySelect.value);
        
        if (month && year) {
            const daysInMonth = new Date(year, month, 0).getDate();
            
            // If currently selected day is invalid for the new year/month combination
            if (selectedDay > daysInMonth) {
                daySelect.value = '';
            }
            
            // Update the days dropdown
            updateDays();
        }
    }
    
    monthSelect.addEventListener('change', updateDays);
    yearSelect.addEventListener('change', refineDays);
}

function initializeOccupationField() {
    console.log('Initializing occupation field');
    
    const occupationInput = document.getElementById('occupation');
    if (!occupationInput) {
        console.error('Occupation field not found');
        return;
    }
    
    // Set placeholder
    occupationInput.placeholder = 'Search for your occupation...';
    
    // Common occupations for autocomplete
    const commonOccupations = [
        'Software Engineer', 'Doctor', 'Lawyer', 'Teacher', 'Nurse', 'Accountant',
        'Marketing Manager', 'Sales Representative', 'Consultant', 'Architect',
        'Designer', 'Engineer', 'Project Manager', 'Business Analyst', 'Entrepreneur',
        'Financial Advisor', 'Real Estate Agent', 'Pharmacist', 'Dentist', 'Veterinarian',
        'Chef', 'Artist', 'Writer', 'Journalist', 'Photographer', 'Musician',
        'Therapist', 'Social Worker', 'Police Officer', 'Firefighter', 'Pilot',
        'Scientist', 'Researcher', 'Professor', 'Administrator', 'HR Manager'
    ];
    
    // Create datalist for autocomplete
    let datalist = document.getElementById('occupation-suggestions');
    if (!datalist) {
        datalist = document.createElement('datalist');
        datalist.id = 'occupation-suggestions';
        commonOccupations.forEach(occupation => {
            const option = document.createElement('option');
            option.value = occupation;
            datalist.appendChild(option);
        });
        occupationInput.parentNode.appendChild(datalist);
    }
    
    occupationInput.setAttribute('list', 'occupation-suggestions');
}

function initializeLanguagesField() {
    console.log('Initializing languages field');

    const languagesInput = document.getElementById('languages');
    if (!languagesInput) {
        console.error('Languages field not found');
        return;
    }
    
    // Set placeholder
    languagesInput.placeholder = 'Type to search languages...';
    
    // Common languages
    const commonLanguages = [
        'English', 'Spanish', 'Portuguese', 'French', 'German', 'Italian',
        'Chinese (Mandarin)', 'Japanese', 'Korean', 'Arabic', 'Russian',
        'Hindi', 'Dutch', 'Swedish', 'Norwegian', 'Danish', 'Polish',
        'Turkish', 'Greek', 'Hebrew', 'Thai', 'Vietnamese', 'Indonesian'
    ];
    
    // Create datalist for autocomplete
    let datalist = document.getElementById('languages-suggestions');
    if (!datalist) {
        datalist = document.createElement('datalist');
        datalist.id = 'languages-suggestions';
        commonLanguages.forEach(language => {
            const option = document.createElement('option');
            option.value = language;
            datalist.appendChild(option);
        });
        languagesInput.parentNode.appendChild(datalist);
    }
    
    languagesInput.setAttribute('list', 'languages-suggestions');
}

function initializeNationalityField() {
    console.log('Initializing nationality field');

    const nationalityInput = document.getElementById('nationality');
    const suggestionsContainer = document.getElementById('nationality-suggestions');

    if (!nationalityInput || !suggestionsContainer) {
        console.error('Nationality field not found');
        return;
    }

    nationalityInput.setAttribute('autocomplete', 'off');

    let hideTimeout = null;
    let ignoreNextFocus = false;

    function clearHideTimeout() {
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
    }

    function scheduleHide() {
        clearHideTimeout();
        hideTimeout = window.setTimeout(() => {
            suggestionsContainer.classList.remove('active');
            suggestionsContainer.innerHTML = '';
        }, 120);
    }

    function renderSuggestions(filterValue) {
        suggestionsContainer.innerHTML = '';

        const normalized = (filterValue || '').trim().toLowerCase();
        let matches = NATIONALITY_SUGGESTIONS.filter(nationality =>
            nationality.toLowerCase().includes(normalized)
        );

        if (!matches.length) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'nationality-suggestion-empty';
            emptyMessage.textContent = 'No suggestions found. Please continue typing your nationality.';
            suggestionsContainer.appendChild(emptyMessage);
            return;
        }

        matches = matches.slice(0, normalized ? 12 : 10);

        matches.forEach(nationality => {
            const pill = document.createElement('button');
            pill.type = 'button';
            pill.className = 'nationality-pill';
            pill.setAttribute('role', 'option');
            pill.dataset.value = nationality;
            pill.textContent = nationality;

            pill.addEventListener('click', () => {
                nationalityInput.value = nationality;
                ignoreNextFocus = true;
                scheduleHide();
                nationalityInput.focus({ preventScroll: true });
                nationalityInput.dispatchEvent(new Event('change', { bubbles: true }));
            });

            suggestionsContainer.appendChild(pill);
        });
    }

    function showSuggestions() {
        suggestionsContainer.classList.add('active');
        renderSuggestions(nationalityInput.value);
    }

    nationalityInput.addEventListener('focus', () => {
        if (ignoreNextFocus) {
            ignoreNextFocus = false;
            return;
        }
        clearHideTimeout();
        showSuggestions();
    });

    nationalityInput.addEventListener('input', () => {
        clearHideTimeout();
        showSuggestions();
    });

    nationalityInput.addEventListener('blur', () => {
        scheduleHide();
    });

    suggestionsContainer.addEventListener('mousedown', event => {
        event.preventDefault();
        clearHideTimeout();
    });

    suggestionsContainer.addEventListener('mouseup', () => {
        scheduleHide();
    });

    if (nationalityInput.value) {
        renderSuggestions(nationalityInput.value);
    }
}

function initializeAllFormFields() {
    console.log('Initializing all form fields');

    // Apply styling to all form inputs
    const allInputs = document.querySelectorAll('input, select, textarea');
    allInputs.forEach(input => {
        // Ensure proper styling
        if (!input.style.backgroundColor || input.style.backgroundColor === 'transparent') {
            input.style.backgroundColor = '#ffffff';
        }
        if (!input.style.color) {
            input.style.color = '#2c3e50';
        }
    });
    
    console.log('All form fields initialized');
}
