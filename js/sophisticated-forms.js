// Enhanced Location Selection with Country-State-City Hierarchy
document.addEventListener('DOMContentLoaded', function() {
    // Initialize location selectors
    initializeLocationSelectors();
    
    // Initialize date picker
    initializeDatePicker();
    
    // Initialize occupation search with better visibility
    initializeOccupationSearch();
});

function initializeLocationSelectors() {
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');
    const customCityGroup = document.getElementById('custom-city-group');
    const customCityInput = document.getElementById('custom-city');

    const hideCustomCity = () => {
        if (!customCityGroup) return;
        customCityGroup.hidden = true;
        if (customCityInput) {
            customCityInput.required = false;
            customCityInput.value = '';
        }
    };

    const showCustomCity = () => {
        if (!customCityGroup) return;
        customCityGroup.hidden = false;
        if (customCityInput) {
            customCityInput.required = true;
        }
    };

    hideCustomCity();
    
    function appendOtherOption(selectEl, placeholderText = 'Select your city') {
        if (!selectEl) return;
        selectEl.innerHTML = `<option value="">${placeholderText}</option>`;
        const otherOption = document.createElement('option');
        otherOption.value = 'other';
        otherOption.textContent = 'Other (specify below)';
        selectEl.appendChild(otherOption);
        selectEl.disabled = false;
    }
    
    if (!countrySelect || !stateSelect || !citySelect) return;
    
    // Populate countries
    const countries = LocationDatabase.getCountries();
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.value;
        option.textContent = country.label;
        countrySelect.appendChild(option);
    });
    
    // Country change handler
    countrySelect.addEventListener('change', function() {
        const selectedCountry = this.value;
        
        // Reset and disable state and city selectors
        stateSelect.innerHTML = '<option value="">Select your state/province</option>';
        citySelect.innerHTML = '<option value="">Select your city</option>';
        stateSelect.disabled = !selectedCountry;
        citySelect.disabled = true;
        hideCustomCity();
    stateSelect.disabled = !selectedCountry;
    citySelect.disabled = true;
    hideCustomCity();
        
        if (selectedCountry) {
            // Populate states for selected country
            const states = LocationDatabase.getStates(selectedCountry);
            states.forEach(state => {
                const option = document.createElement('option');
                option.value = state.value;
                option.textContent = state.label;
                stateSelect.appendChild(option);
            });
        }
    });
    
    // State change handler
    stateSelect.addEventListener('change', function() {
        const selectedCountry = countrySelect.value;
        const selectedState = this.value;
        
        // Reset city selector
        citySelect.innerHTML = '<option value="">Select your city</option>';
        citySelect.disabled = !selectedState;
        hideCustomCity();
    citySelect.disabled = !selectedState;
    hideCustomCity();
        
        if (selectedCountry && selectedState) {
            // Populate cities for selected state
            const cities = LocationDatabase.getCities(selectedCountry, selectedState);
            if (cities.length) {
                cities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city.value;
                    option.textContent = city.label;
                    citySelect.appendChild(option);
                });
            }

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
                appendOtherOption(citySelect, 'Select your city');
            }
        }
    });

    // City change handler
    citySelect.addEventListener('change', function() {
        if (this.value === 'other') {
            showCustomCity();
            if (customCityInput) {
                customCityInput.focus();
            }
            if (customCityInput) customCityInput.focus();
        } else {
            hideCustomCity();
        }
    });
}

function initializeDatePicker() {
    const monthSelect = document.getElementById('birth-month');
    const daySelect = document.getElementById('birth-day');
    const yearSelect = document.getElementById('birth-year');
    
    if (!monthSelect || !daySelect || !yearSelect) return;
    
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
    
    // Populate days based on selected month and year
    function updateDays() {
        const month = parseInt(monthSelect.value);
        const year = parseInt(yearSelect.value);
        
        // Preserve currently selected day
        const currentDay = daySelect.value;
        
        daySelect.innerHTML = '<option value="">Day</option>';
        
        if (month && year) {
            const daysInMonth = new Date(year, month, 0).getDate();
            for (let day = 1; day <= daysInMonth; day++) {
                const option = document.createElement('option');
                option.value = day;
                option.textContent = day;
                daySelect.appendChild(option);
            }
            
            // Restore previously selected day if it's still valid
            if (currentDay && parseInt(currentDay) <= daysInMonth) {
                daySelect.value = currentDay;
            }
        }
    }
    
    monthSelect.addEventListener('change', updateDays);
    yearSelect.addEventListener('change', updateDays);
}

function initializeOccupationSearch() {
    const occupationInput = document.getElementById('occupation');
    if (!occupationInput) return;
    
    // Improve visibility by ensuring proper styling
    occupationInput.style.backgroundColor = '#ffffff';
    occupationInput.style.color = '#2c3e50';
    occupationInput.style.border = '2px solid #e1e8ed';
    occupationInput.style.padding = '12px 16px';
    occupationInput.style.fontSize = '16px';
    occupationInput.style.borderRadius = '8px';
    
    // Focus and blur handlers for better UX
    occupationInput.addEventListener('focus', function() {
        this.style.borderColor = '#d4af37';
        this.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
    });
    
    occupationInput.addEventListener('blur', function() {
        this.style.borderColor = '#e1e8ed';
        this.style.boxShadow = 'none';
    });
    
    // Common occupations for autocomplete suggestions
    const commonOccupations = [
        'Software Engineer', 'Doctor', 'Lawyer', 'Teacher', 'Nurse', 'Accountant',
        'Marketing Manager', 'Sales Representative', 'Consultant', 'Architect',
        'Designer', 'Engineer', 'Project Manager', 'Business Analyst', 'Entrepreneur',
        'Financial Advisor', 'Real Estate Agent', 'Pharmacist', 'Dentist', 'Veterinarian',
        'Chef', 'Artist', 'Writer', 'Journalist', 'Photographer', 'Musician',
        'Therapist', 'Social Worker', 'Police Officer', 'Firefighter', 'Pilot',
        'Scientist', 'Researcher', 'Professor', 'Administrator', 'HR Manager',
        'Operations Manager', 'Product Manager', 'Data Analyst', 'Web Developer',
        'Graphic Designer', 'Interior Designer', 'Civil Engineer', 'Mechanical Engineer',
        'Electrical Engineer', 'Chemical Engineer', 'Biomedical Engineer', 'Psychologist',
        'Psychiatrist', 'Surgeon', 'Specialist', 'General Practitioner', 'Pediatrician'
    ];
    
    // Create datalist for autocomplete
    const datalist = document.createElement('datalist');
    datalist.id = 'occupation-suggestions';
    commonOccupations.forEach(occupation => {
        const option = document.createElement('option');
        option.value = occupation;
        datalist.appendChild(option);
    });
    
    occupationInput.setAttribute('list', 'occupation-suggestions');
    occupationInput.parentNode.appendChild(datalist);
}

// CSS improvements for better visibility
const style = document.createElement('style');
style.textContent = `
    .location-selector-container {
        margin: 24px 0;
    }
    
    .location-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
        align-items: start;
    }
    
    .location-field {
        display: flex;
        flex-direction: column;
    }
    
    .location-select {
        background-color: #ffffff !important;
        color: #2c3e50 !important;
        border: 2px solid #e1e8ed !important;
        padding: 12px 16px !important;
        font-size: 16px !important;
        border-radius: 8px !important;
        transition: all 0.3s ease !important;
    }
    
    .location-select:focus {
        border-color: #d4af37 !important;
        box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1) !important;
        outline: none !important;
    }
    
    .location-select:disabled {
        background-color: #f8f9fa !important;
        color: #6c757d !important;
        cursor: not-allowed !important;
    }
    
    .sophisticated-field input[type="text"],
    .sophisticated-field input[type="email"],
    .sophisticated-field input[type="tel"],
    .form-input {
        background-color: #ffffff !important;
        color: #2c3e50 !important;
        border: 2px solid #e1e8ed !important;
        padding: 12px 16px !important;
        font-size: 16px !important;
        border-radius: 8px !important;
        transition: all 0.3s ease !important;
    }
    
    .sophisticated-field input:focus,
    .form-input:focus {
        border-color: #d4af37 !important;
        box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1) !important;
        outline: none !important;
    }
    
    .sophisticated-label,
    .form-label {
        color: #2c3e50 !important;
        font-weight: 600 !important;
        margin-bottom: 8px !important;
        display: block !important;
    }
    
    .field-description {
        color: #6c757d !important;
        font-size: 14px !important;
        margin-top: 4px !important;
    }
    
    @media (max-width: 768px) {
        .location-row {
            grid-template-columns: 1fr;
            gap: 16px;
        }
    }
`;
document.head.appendChild(style);
