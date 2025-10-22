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
    // Initialize location selectors (wait briefly for locationDataService if needed)
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

async function initializeLocationSelectors() {
    console.log('Initializing location selectors');

    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');
    const customCityGroup = document.getElementById('custom-city-group');
    const customCityInput = document.getElementById('custom-city');

    if (!countrySelect || !stateSelect || !citySelect) {
        console.error('Location selectors not found');
        return;
    }

    // Ensure manual city is hidden and not required at initialization
    if (customCityGroup) customCityGroup.setAttribute('hidden', '');
    if (customCityInput) customCityInput.required = false;

    // Wait for the locationDataService to be available (race guard)
    let locationService = window.locationDataService;
    if (!locationService) {
        const maxWait = 2000; // ms
        const intervalMs = 100;
        let waited = 0;
        await new Promise(resolve => {
            const interval = setInterval(() => {
                if (window.locationDataService) {
                    clearInterval(interval);
                    resolve();
                    return;
                }
                waited += intervalMs;
                if (waited >= maxWait) {
                    clearInterval(interval);
                    resolve();
                }
            }, intervalMs);
        });
        locationService = window.locationDataService;
    }

    if (!locationService) {
        console.error('Location data service is unavailable after wait');
        return;
    }

    const allowedCountries = new Set(Object.keys(locationService.countries || {}));

    // Populate country select from the location service
    (function populateCountries() {
        try {
            const countriesObj = locationService.countries || {};
            const entries = Object.keys(countriesObj).map(code => ({ code, label: countriesObj[code].label || code }));
            entries.sort((a, b) => a.label.localeCompare(b.label));

            countrySelect.innerHTML = '<option value="">Select your country</option>';
            entries.forEach(entry => {
                const option = document.createElement('option');
                option.value = entry.code;
                option.textContent = entry.label;
                countrySelect.appendChild(option);
            });
            countrySelect.disabled = false;
        } catch (err) {
            console.error('Failed to populate countries', err);
        }
    })();

    // Populate country select from the location service
    (function populateCountries() {
        try {
            const countriesObj = locationService.countries || {};
            const entries = Object.keys(countriesObj).map(code => ({ code, label: countriesObj[code].label || code }));
            // Sort by label
            entries.sort((a, b) => a.label.localeCompare(b.label));

            countrySelect.innerHTML = '<option value="">Select your country</option>';
            entries.forEach(entry => {
                const option = document.createElement('option');
                option.value = entry.code;
                option.textContent = entry.label;
                countrySelect.appendChild(option);
            });
            countrySelect.disabled = false;
        } catch (err) {
            console.error('Failed to populate countries', err);
        }
    })();

    function resetStateSelect(placeholderText) {
        stateSelect.innerHTML = `<option value="">${placeholderText}</option>`;
        stateSelect.disabled = true;
    }

    function resetCitySelect(placeholderText) {
        citySelect.innerHTML = `<option value="">${placeholderText}</option>`;
        citySelect.disabled = true;
    }

    function appendOtherOption(selectEl, placeholderText = 'Select your city') {
        if (!selectEl) return;
        selectEl.innerHTML = `<option value="">${placeholderText}</option>`;
        const otherOpt = document.createElement('option');
        otherOpt.value = 'other';
        otherOpt.textContent = 'Other (specify below)';
        selectEl.appendChild(otherOpt);
        selectEl.disabled = false;
    }

    function toggleCustomCity(shouldShow) {
        if (!customCityGroup) return;
        // Use the boolean hidden property for clarity
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
        if (!allowedCountries.has(selectedCountry)) {
            resetStateSelect('State/province not required');
            resetCitySelect('Select your city');

            const otherOption = document.createElement('option');
            otherOption.value = 'other';
            otherOption.textContent = 'Other (specify below)';
            citySelect.appendChild(otherOption);

            citySelect.disabled = false;
            // Country not in curated list — user must explicitly choose 'Other' for manual city
            resetStateSelect('No regions available');
            appendOtherOption(citySelect, 'Select your city');
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
                appendOtherOption(citySelect, 'Select your city');
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
            appendOtherOption(citySelect, 'Select your city');
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

            if (cities && cities.length) {
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
                const otherOption = document.createElement('option');
                otherOption.value = 'other';
                otherOption.textContent = 'Other (specify below)';
                citySelect.appendChild(otherOption);
                citySelect.disabled = false;
            } else {
                // No cities available — require explicit 'Other' selection to reveal manual input
                appendOtherOption(citySelect, 'Select your city');
            }
        } catch (error) {
            console.error('Unable to populate cities', error);
            resetCitySelect('Unable to load cities');
            appendOtherOption(citySelect, 'Select your city');
        }
    }

    countrySelect.addEventListener('change', handleCountryChange);
    stateSelect.addEventListener('change', handleStateChange);

    citySelect.addEventListener('change', function() {
        // Show the manual city input only when user selects 'other'
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
    const premiumWrapper = nationalityInput ? nationalityInput.closest('.premium-nationality-input') : null;
    const quickPickMount = premiumWrapper ? premiumWrapper.querySelector('#nationality-quick-picks') : null;

    if (!nationalityInput || !premiumWrapper || !quickPickMount) {
        console.error('Nationality field not found');
        return;
    }

    nationalityInput.setAttribute('autocomplete', 'off');

    const curatedNationalities = NATIONALITY_SUGGESTIONS.filter(value => value && value !== "My nationality isn't listed");
    let smartAutocomplete = null;

    if (typeof SmartNationalityAutocomplete === 'function') {
        smartAutocomplete = new SmartNationalityAutocomplete('#nationality', {
            layout: 'horizontal',
            minChars: 0,
            maxSuggestions: 14,
            debounceDelay: 120,
            nationalities: curatedNationalities
        });
    } else {
        console.warn('SmartNationalityAutocomplete is not available. Applying datalist fallback.');
        const fallbackId = 'nationality-suggestions-datalist';
        let datalist = document.getElementById(fallbackId);
        if (!datalist) {
            datalist = document.createElement('datalist');
            datalist.id = fallbackId;
            curatedNationalities.forEach(nationality => {
                const option = document.createElement('option');
                option.value = nationality;
                datalist.appendChild(option);
            });
            nationalityInput.parentElement.appendChild(datalist);
        }
        nationalityInput.setAttribute('list', fallbackId);
    }

    const quickPickShowcase = [
        { name: 'Paraguayan', flag: '🇵🇾', caption: 'Homegrown pride' },
        { name: 'Spanish', flag: '🇪🇸', caption: 'Vibrant Iberia' },
        { name: 'Italian', flag: '🇮🇹', caption: 'Dolce vita' },
        { name: 'German', flag: '🇩🇪', caption: 'Precision spirit' },
        { name: 'French', flag: '🇫🇷', caption: 'Art de vivre' },
        { name: 'Portuguese', flag: '🇵🇹', caption: 'Atlantic charm' },
        { name: 'British', flag: '🇬🇧', caption: 'Across the Isles' },
        { name: 'Dual Nationality', flag: '🪢', caption: 'Blended roots' },
        { name: "My nationality isn't listed", flag: '🧭', caption: 'Share yours', custom: true }
    ];

    quickPickMount.innerHTML = '';

    const quickHeader = document.createElement('div');
    quickHeader.className = 'nationality-quick-picks-header';

    const eyebrow = document.createElement('span');
    eyebrow.className = 'nationality-quick-eyebrow';
    eyebrow.textContent = 'Quick picks';

    const helper = document.createElement('span');
    helper.className = 'nationality-quick-helper';
    helper.textContent = 'Tap a favourite or keep typing to reveal every nationality we support.';

    quickHeader.appendChild(eyebrow);
    quickHeader.appendChild(helper);
    quickPickMount.appendChild(quickHeader);

    const pillsWrapper = document.createElement('div');
    pillsWrapper.className = 'nationality-quick-pills-wrapper';

    const quickPills = document.createElement('div');
    quickPills.className = 'nationality-quick-pills';
    quickPills.setAttribute('role', 'list');

    const quickButtons = [];

    const previousButton = document.createElement('button');
    previousButton.type = 'button';
    previousButton.className = 'nationality-quick-nav';
    previousButton.setAttribute('aria-label', 'Scroll nationalities to the left');
    previousButton.innerHTML = '<span aria-hidden="true">&#10094;</span>';

    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'nationality-quick-nav';
    nextButton.setAttribute('aria-label', 'Scroll nationalities to the right');
    nextButton.innerHTML = '<span aria-hidden="true">&#10095;</span>';

    const scrollByAmount = () => Math.min(quickPills.offsetWidth * 0.85, 240);

    previousButton.addEventListener('click', () => {
        quickPills.scrollBy({ left: scrollByAmount() * -1, behavior: 'smooth' });
    });

    nextButton.addEventListener('click', () => {
        quickPills.scrollBy({ left: scrollByAmount(), behavior: 'smooth' });
    });

    const updateNavState = () => {
        const maxScroll = quickPills.scrollWidth - quickPills.clientWidth;
        const hasOverflow = maxScroll > 4;

        previousButton.hidden = !hasOverflow;
        nextButton.hidden = !hasOverflow;

        if (!hasOverflow) {
            return;
        }

        const currentScroll = quickPills.scrollLeft;
        previousButton.disabled = currentScroll <= 4;
        nextButton.disabled = currentScroll >= (maxScroll - 4);
    };

    quickPills.addEventListener('scroll', updateNavState);
    window.addEventListener('resize', updateNavState);

    const updateQuickPickSelection = (value) => {
        const normalized = (value || '').trim().toLowerCase();
        quickButtons.forEach(button => {
            const isCustom = button.dataset.custom === 'true';
            const isActive = isCustom ? normalized === '' : button.dataset.nationality === normalized;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    };

    quickPickShowcase.forEach(item => {
        const quickButton = document.createElement('button');
        quickButton.type = 'button';
        quickButton.className = 'nationality-quick-pill';
        quickButton.setAttribute('role', 'listitem');
        quickButton.dataset.nationality = (item.name || '').toLowerCase();
        quickButton.setAttribute('aria-pressed', 'false');

        if (item.custom) {
            quickButton.dataset.custom = 'true';
        }

        quickButton.innerHTML = `
            <span class="flag" aria-hidden="true">${item.flag}</span>
            <span class="name">${item.name}</span>
            ${item.caption ? `<span class="caption">${item.caption}</span>` : ''}
        `;

        quickButton.addEventListener('click', () => {
            if (item.custom) {
                if (smartAutocomplete) {
                    smartAutocomplete.clear();
                    smartAutocomplete.closeSuggestions();
                }
                nationalityInput.value = '';
                nationalityInput.focus({ preventScroll: true });
                nationalityInput.dispatchEvent(new Event('input', { bubbles: true }));
                nationalityInput.dispatchEvent(new CustomEvent('nationalitySelected', { detail: { nationality: '' } }));
                updateQuickPickSelection('');
                return;
            }

            if (smartAutocomplete) {
                smartAutocomplete.setNationality(item.name);
                smartAutocomplete.closeSuggestions();
            } else {
                nationalityInput.value = item.name;
                nationalityInput.dispatchEvent(new CustomEvent('nationalitySelected', { detail: { nationality: item.name } }));
            }

            nationalityInput.dispatchEvent(new Event('input', { bubbles: true }));
            nationalityInput.dispatchEvent(new Event('change', { bubbles: true }));
            nationalityInput.focus({ preventScroll: true });
            updateQuickPickSelection(item.name);
        });

        quickButtons.push(quickButton);
        quickPills.appendChild(quickButton);
    });

    pillsWrapper.appendChild(previousButton);
    pillsWrapper.appendChild(quickPills);
    pillsWrapper.appendChild(nextButton);
    quickPickMount.appendChild(pillsWrapper);

    const footnote = document.createElement('div');
    footnote.className = 'nationality-quick-footnote';
    footnote.innerHTML = '<i class="fas fa-compass"></i><span>We warmly welcome every background—type to search or select from the showcase.</span>';
    quickPickMount.appendChild(footnote);

    nationalityInput.addEventListener('input', () => {
        updateQuickPickSelection(nationalityInput.value);
    });

    nationalityInput.addEventListener('nationalitySelected', event => {
        if (event && event.detail && typeof event.detail.nationality === 'string') {
            updateQuickPickSelection(event.detail.nationality);
        }
    });

    updateQuickPickSelection(nationalityInput.value);

    window.requestAnimationFrame(() => {
        updateNavState();
    });
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
