/**
 * Date Picker and Country Code Initialization
 * Populates month, day, year dropdowns and country codes for Europe and Paraguay
 */

(function() {
  'use strict';

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initializeDatePicker();
    initializeCountryCode();
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
    monthSelect.innerHTML = '<option value="">Month</option>';
    daySelect.innerHTML = '<option value="">Day</option>';
    yearSelect.innerHTML = '<option value="">Year</option>';
    
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
    
    // Function to update days based on selected month and year
    function updateDays() {
      const month = parseInt(monthSelect.value);
      const year = parseInt(yearSelect.value) || currentYear;
      
      const selectedDay = daySelect.value;
      daySelect.innerHTML = '<option value="">Day</option>';
      
      if (month) {
        // Calculate days in month
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
        
        // Restore selected day if still valid
        if (selectedDay && parseInt(selectedDay) <= daysInMonth) {
          daySelect.value = selectedDay;
        }
        
        daySelect.disabled = false;
      } else {
        daySelect.disabled = true;
      }
    }
    
    monthSelect.addEventListener('change', updateDays);
    yearSelect.addEventListener('change', updateDays);
    
    console.log('Date picker initialized successfully');
  }

  function initializeCountryCode() {
    console.log('Initializing country code selector');
    
    const countryCodeSelect = document.getElementById('country-code');
    
    if (!countryCodeSelect) {
      console.error('Country code selector not found');
      return;
    }
    
    // Country codes for Paraguay and all European countries
    const countryCodes = [
      { code: '+595', country: 'Paraguay' },
      // European countries
      { code: '+355', country: 'Albania' },
      { code: '+376', country: 'Andorra' },
      { code: '+43', country: 'Austria' },
      { code: '+375', country: 'Belarus' },
      { code: '+32', country: 'Belgium' },
      { code: '+387', country: 'Bosnia and Herzegovina' },
      { code: '+359', country: 'Bulgaria' },
      { code: '+385', country: 'Croatia' },
      { code: '+357', country: 'Cyprus' },
      { code: '+420', country: 'Czech Republic' },
      { code: '+45', country: 'Denmark' },
      { code: '+372', country: 'Estonia' },
      { code: '+358', country: 'Finland' },
      { code: '+33', country: 'France' },
      { code: '+49', country: 'Germany' },
      { code: '+30', country: 'Greece' },
      { code: '+36', country: 'Hungary' },
      { code: '+354', country: 'Iceland' },
      { code: '+353', country: 'Ireland' },
      { code: '+39', country: 'Italy' },
      { code: '+383', country: 'Kosovo' },
      { code: '+371', country: 'Latvia' },
      { code: '+423', country: 'Liechtenstein' },
      { code: '+370', country: 'Lithuania' },
      { code: '+352', country: 'Luxembourg' },
      { code: '+389', country: 'North Macedonia' },
      { code: '+356', country: 'Malta' },
      { code: '+373', country: 'Moldova' },
      { code: '+377', country: 'Monaco' },
      { code: '+382', country: 'Montenegro' },
      { code: '+31', country: 'Netherlands' },
      { code: '+47', country: 'Norway' },
      { code: '+48', country: 'Poland' },
      { code: '+351', country: 'Portugal' },
      { code: '+40', country: 'Romania' },
      { code: '+7', country: 'Russia' },
      { code: '+378', country: 'San Marino' },
      { code: '+381', country: 'Serbia' },
      { code: '+421', country: 'Slovakia' },
      { code: '+386', country: 'Slovenia' },
      { code: '+34', country: 'Spain' },
      { code: '+46', country: 'Sweden' },
      { code: '+41', country: 'Switzerland' },
      { code: '+380', country: 'Ukraine' },
      { code: '+44', country: 'United Kingdom' },
      { code: '+379', country: 'Vatican City' }
    ];
    
    // Sort by country name
    countryCodes.sort((a, b) => a.country.localeCompare(b.country));
    
    // Clear existing options
    countryCodeSelect.innerHTML = '';
    
    // Add all country codes
    countryCodes.forEach(({ code, country }) => {
      const option = document.createElement('option');
      option.value = code;
      option.textContent = `${code} (${country})`;
      countryCodeSelect.appendChild(option);
    });
    
    // Set default to Paraguay
    countryCodeSelect.value = '+595';
    
    console.log('Country code selector initialized with', countryCodes.length, 'countries');
  }
})();

