// Fixed Form Functionality - All Issues Resolved
document.addEventListener('DOMContentLoaded', function() {
    console.log('Fixed forms script loaded');
    
    // Fix all form styling issues first
    fixFormStyling();
    
    // Initialize all form components
    initializeLocationSelectors();
    initializeDatePicker();
    initializeOccupationField();
    initializeLanguagesField();
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
    
    if (!countrySelect || !stateSelect || !citySelect) {
        console.error('Location selectors not found');
        return;
    }
    
    // Use comprehensive city database
    const locationData = window.comprehensiveCityDatabase || {};
    const citySearcher = window.createDynamicCitySearch ? window.createDynamicCitySearch() : null;
    
    // Populate countries
    Object.keys(locationData).forEach(countryKey => {
        const option = document.createElement('option');
        option.value = countryKey;
        option.textContent = locationData[countryKey].label;
        countrySelect.appendChild(option);
    });
    
    // Country change handler
    countrySelect.addEventListener('change', function() {
        const selectedCountry = this.value;
        console.log('Country selected:', selectedCountry);
        
        // Reset state and city selectors
        stateSelect.innerHTML = '<option value=\"\">Select your state/province</option>';
        citySelect.innerHTML = '<option value=\"\">Select your city</option>';
        stateSelect.disabled = !selectedCountry;
        citySelect.disabled = true;
        if (customCityGroup) customCityGroup.style.display = 'none';
        
        if (selectedCountry && locationData[selectedCountry]) {
            // Populate states
            const states = locationData[selectedCountry].states;
            Object.keys(states).forEach(stateKey => {
                const option = document.createElement('option');
                option.value = stateKey;
                option.textContent = states[stateKey].label;
                stateSelect.appendChild(option);
            });
            stateSelect.disabled = false;
        }
    });
    
    // State change handler
    stateSelect.addEventListener('change', function() {
        const selectedCountry = countrySelect.value;
        const selectedState = this.value;
        console.log('State selected:', selectedState);
        
        // Reset city selector
        citySelect.innerHTML = '<option value=\"\">Select your city</option>';
        citySelect.disabled = !selectedState;
        if (customCityGroup) customCityGroup.style.display = 'none';
        
        if (selectedCountry && selectedState && locationData[selectedCountry] && locationData[selectedCountry].states[selectedState]) {
            // Get all cities for the selected state
            const allCities = citySearcher ? citySearcher.getAllCities(selectedCountry, selectedState) : 
                             locationData[selectedCountry].states[selectedState].cities;
            
            // Show first 15 cities initially
            const citiesToShow = allCities.slice(0, 15);
            
            citiesToShow.forEach(city => {
                const option = document.createElement('option');
                option.value = city.toLowerCase().replace(/\\s+/g, '-');
                option.textContent = city;
                citySelect.appendChild(option);
            });
            
            // Add "More cities..." option if there are more than 15 cities
            if (allCities.length > 15) {
                const moreOption = document.createElement('option');
                moreOption.value = 'search-more';
                moreOption.textContent = `+ ${allCities.length - 15} more cities (type to search)`;
                moreOption.disabled = true;
                moreOption.style.fontStyle = 'italic';
                moreOption.style.color = '#666';
                citySelect.appendChild(moreOption);
            }
            
            // Add "Other" option
            const otherOption = document.createElement('option');
            otherOption.value = 'other';
            otherOption.textContent = 'Other (specify below)';
            citySelect.appendChild(otherOption);
            
            citySelect.disabled = false;
        }
    });
    
    // City change handler
    citySelect.addEventListener('change', function() {
        if (customCityGroup) {
            if (this.value === 'other') {
                customCityGroup.style.display = 'block';
                const customCityInput = document.getElementById('custom-city');
                if (customCityInput) customCityInput.required = true;
            } else {
                customCityGroup.style.display = 'none';
                const customCityInput = document.getElementById('custom-city');
                if (customCityInput) customCityInput.required = false;
            }
        }
    });
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
