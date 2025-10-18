/**
 * Paraguay-Europe Country Selector
 * Provides full country → state/region → city hierarchy
 * while keeping the existing expansion modal experience.
 */

(function() {
    'use strict';

    // Expose a flag so other scripts know a custom location selector is active
    window.tesseraLocationSelectorActive = 'paraguay-europe-v2';

    const LOCATION_DATA = window.tesseraParaguayEuropeData || {};

    const RAW_COUNTRIES = [
        { code: 'PY', name: 'Paraguay', flag: '🇵🇾', dialCode: '+595' },
        { code: 'AL', name: 'Albania', flag: '🇦🇱', dialCode: '+355' },
        { code: 'AD', name: 'Andorra', flag: '🇦🇩', dialCode: '+376' },
        { code: 'AT', name: 'Austria', flag: '🇦🇹', dialCode: '+43' },
        { code: 'BY', name: 'Belarus', flag: '🇧🇾', dialCode: '+375' },
        { code: 'BE', name: 'Belgium', flag: '🇧🇪', dialCode: '+32' },
        { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦', dialCode: '+387' },
        { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', dialCode: '+359' },
        { code: 'HR', name: 'Croatia', flag: '🇭🇷', dialCode: '+385' },
        { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', dialCode: '+420' },
        { code: 'DK', name: 'Denmark', flag: '🇩🇰', dialCode: '+45' },
        { code: 'EE', name: 'Estonia', flag: '🇪🇪', dialCode: '+372' },
        { code: 'FI', name: 'Finland', flag: '🇫🇮', dialCode: '+358' },
        { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
        { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49' },
        { code: 'GR', name: 'Greece', flag: '🇬🇷', dialCode: '+30' },
        { code: 'VA', name: 'Holy See (Vatican City)', flag: '🇻🇦', dialCode: '+379' },
        { code: 'HU', name: 'Hungary', flag: '🇭🇺', dialCode: '+36' },
        { code: 'IS', name: 'Iceland', flag: '🇮🇸', dialCode: '+354' },
        { code: 'IE', name: 'Ireland', flag: '🇮🇪', dialCode: '+353' },
        { code: 'IT', name: 'Italy', flag: '🇮🇹', dialCode: '+39' },
        { code: 'LV', name: 'Latvia', flag: '🇱🇻', dialCode: '+371' },
        { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮', dialCode: '+423' },
        { code: 'LT', name: 'Lithuania', flag: '🇱🇹', dialCode: '+370' },
        { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', dialCode: '+352' },
        { code: 'MT', name: 'Malta', flag: '🇲🇹', dialCode: '+356' },
        { code: 'MD', name: 'Moldova', flag: '🇲🇩', dialCode: '+373' },
        { code: 'MC', name: 'Monaco', flag: '🇲🇨', dialCode: '+377' },
        { code: 'ME', name: 'Montenegro', flag: '🇲🇪', dialCode: '+382' },
        { code: 'NL', name: 'Netherlands', flag: '🇳🇱', dialCode: '+31' },
        { code: 'MK', name: 'North Macedonia', flag: '🇲🇰', dialCode: '+389' },
        { code: 'NO', name: 'Norway', flag: '🇳🇴', dialCode: '+47' },
        { code: 'PL', name: 'Poland', flag: '🇵🇱', dialCode: '+48' },
        { code: 'PT', name: 'Portugal', flag: '🇵🇹', dialCode: '+351' },
        { code: 'RO', name: 'Romania', flag: '🇷🇴', dialCode: '+40' },
        { code: 'RU', name: 'Russia', flag: '🇷🇺', dialCode: '+7' },
        { code: 'SM', name: 'San Marino', flag: '🇸🇲', dialCode: '+378' },
        { code: 'RS', name: 'Serbia', flag: '🇷🇸', dialCode: '+381' },
        { code: 'SK', name: 'Slovakia', flag: '🇸🇰', dialCode: '+421' },
        { code: 'SI', name: 'Slovenia', flag: '🇸🇮', dialCode: '+386' },
        { code: 'ES', name: 'Spain', flag: '🇪🇸', dialCode: '+34' },
        { code: 'SE', name: 'Sweden', flag: '🇸🇪', dialCode: '+46' },
        { code: 'CH', name: 'Switzerland', flag: '🇨🇭', dialCode: '+41' },
        { code: 'UA', name: 'Ukraine', flag: '🇺🇦', dialCode: '+380' },
        { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' }
    ];

    const PHONE_CODE_FALLBACKS = [
        { dialCode: '+1', label: 'United States / Canada' },
        { dialCode: '+55', label: 'Brazil' }
    ];

    const ADDITIONAL_NATIONALITIES = ['United States', 'Canada', 'Brazil', 'Argentina', 'Mexico'];

    const AVAILABLE_COUNTRIES = RAW_COUNTRIES.map(country => ({
        ...country,
        hasStates: Boolean(LOCATION_DATA[country.code]?.regions?.length)
    }));

    const EXPANSION_REGIONS = [
        { value: 'americas', label: 'Americas', icon: '🌎', examples: 'USA, Canada, Brazil, Argentina, Chile, Mexico...' },
        { value: 'asia', label: 'Asia', icon: '🌏', examples: 'Japan, Singapore, South Korea, India, China...' },
        { value: 'middle_east', label: 'Middle East', icon: '🕌', examples: 'UAE, Israel, Saudi Arabia, Qatar, Turkey...' },
        { value: 'oceania', label: 'Oceania', icon: '🦘', examples: 'Australia, New Zealand, Fiji, Papua New Guinea...' },
        { value: 'africa', label: 'Africa', icon: '🦁', examples: 'South Africa, Kenya, Egypt, Morocco, Nigeria...' }
    ];

    function slugify(value) {
        return value
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function getPersistedLocation() {
        try {
            const stored = localStorage.getItem('tessera_form_data');
            if (stored) {
                const parsed = JSON.parse(stored);
                return {
                    country: parsed.country || '',
                    state: parsed.state || '',
                    city: parsed.city || ''
                };
            }
        } catch (error) {
            console.warn('Unable to read persisted location data:', error);
        }
        return { country: '', state: '', city: '' };
    }

    function populateCountries(countrySelect, selectedCountry) {
        countrySelect.innerHTML = '<option value="">Select your country</option>';

        const paraguay = AVAILABLE_COUNTRIES.find(country => country.code === 'PY');
        if (paraguay) {
            countrySelect.appendChild(createCountryOption(paraguay));
        }

        const europeDivider = document.createElement('option');
        europeDivider.disabled = true;
        europeDivider.textContent = '─────────────── Europe ───────────────';
        europeDivider.style.fontWeight = '600';
        europeDivider.style.color = '#D4AF37';
        europeDivider.style.textAlign = 'center';
        europeDivider.style.backgroundColor = '#f7fafc';
        countrySelect.appendChild(europeDivider);

        AVAILABLE_COUNTRIES.filter(country => country.code !== 'PY').forEach(country => {
            countrySelect.appendChild(createCountryOption(country));
        });

        const bottomDivider = document.createElement('option');
        bottomDivider.disabled = true;
        bottomDivider.textContent = '───────────────────────────────────';
        bottomDivider.style.fontWeight = '600';
        bottomDivider.style.color = '#D4AF37';
        bottomDivider.style.textAlign = 'center';
        countrySelect.appendChild(bottomDivider);

        const otherOption = document.createElement('option');
        otherOption.value = 'OTHER';
        otherOption.textContent = '🌍 My country isn\'t listed yet';
        otherOption.style.fontWeight = '500';
        otherOption.style.color = '#4299e1';
        otherOption.style.fontStyle = 'italic';
        countrySelect.appendChild(otherOption);

        if (selectedCountry && countrySelect.querySelector(`option[value="${selectedCountry}"]`)) {
            countrySelect.value = selectedCountry;
        } else {
            countrySelect.value = '';
        }
    }

    function createCountryOption(country) {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = `${country.flag} ${country.name}`;
        return option;
    }

    function resetStateCity(stateSelect, citySelect, customCityGroup, customCityInput) {
        stateSelect.innerHTML = '<option value="">Select your state/province</option>';
        stateSelect.disabled = true;
        citySelect.innerHTML = '<option value="">Select your city</option>';
        citySelect.disabled = true;
        if (customCityGroup) {
            customCityGroup.style.display = 'none';
        }
        if (customCityInput) {
            customCityInput.required = false;
        }
    }

    function populateStates(stateSelect, citySelect, countryCode, preservedState, preservedCity, customCityGroup, customCityInput) {
        const countryData = LOCATION_DATA[countryCode];
        if (!countryData || !countryData.regions || countryData.regions.length === 0) {
            resetStateCity(stateSelect, citySelect, customCityGroup, customCityInput);
            return;
        }

        stateSelect.disabled = false;
        stateSelect.innerHTML = '<option value="">Select your state/province</option>';

        countryData.regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region.value;
            option.textContent = region.label;
            stateSelect.appendChild(option);
        });

        if (preservedState && stateSelect.querySelector(`option[value="${preservedState}"]`)) {
            stateSelect.value = preservedState;
            populateCities(citySelect, countryCode, preservedState, preservedCity, customCityGroup, customCityInput);
        } else {
            citySelect.innerHTML = '<option value="">Select your city</option>';
            citySelect.disabled = true;
            if (customCityGroup) {
                customCityGroup.style.display = 'none';
            }
            if (customCityInput) {
                customCityInput.required = false;
            }
        }
    }

    function populateCities(citySelect, countryCode, stateValue, preservedCity, customCityGroup, customCityInput) {
        const countryData = LOCATION_DATA[countryCode];
        const region = countryData?.regions?.find(entry => entry.value === stateValue);
        citySelect.innerHTML = '<option value="">Select your city</option>';

        if (!region) {
            citySelect.disabled = true;
            if (customCityGroup) {
                customCityGroup.style.display = 'none';
            }
            if (customCityInput) {
                customCityInput.required = false;
            }
            return;
        }

        citySelect.disabled = false;
        region.cities.forEach(city => {
            const option = document.createElement('option');
            const value = slugify(city);
            option.value = value;
            option.textContent = city;
            citySelect.appendChild(option);
        });

        const otherOption = document.createElement('option');
        otherOption.value = 'other';
        otherOption.textContent = 'Other (specify)';
        citySelect.appendChild(otherOption);

        if (preservedCity && citySelect.querySelector(`option[value="${preservedCity}"]`)) {
            citySelect.value = preservedCity;
        }

        handleCityChange(citySelect, customCityGroup, customCityInput);
    }

    function handleCountryChange(countrySelect, stateSelect, citySelect, customCityGroup, customCityInput) {
        const selectedCountry = countrySelect.value;

        if (!selectedCountry) {
            resetStateCity(stateSelect, citySelect, customCityGroup, customCityInput);
            return;
        }

        if (selectedCountry === 'OTHER') {
            showExpansionModal();
            resetStateCity(stateSelect, citySelect, customCityGroup, customCityInput);
            return;
        }

        populateStates(stateSelect, citySelect, selectedCountry, undefined, undefined, customCityGroup, customCityInput);
    }

    function handleStateChange(countrySelect, stateSelect, citySelect, customCityGroup, customCityInput) {
        const countryCode = countrySelect.value;
        const stateValue = stateSelect.value;

        if (!countryCode || !stateValue) {
            citySelect.innerHTML = '<option value="">Select your city</option>';
            citySelect.disabled = true;
            if (customCityGroup) {
                customCityGroup.style.display = 'none';
            }
            if (customCityInput) {
                customCityInput.required = false;
            }
            return;
        }

        populateCities(citySelect, countryCode, stateValue, undefined, customCityGroup, customCityInput);
    }

    function handleCityChange(citySelect, customCityGroup, customCityInput) {
        if (!customCityGroup) {
            return;
        }

        if (citySelect.value === 'other') {
            customCityGroup.style.display = 'block';
            if (customCityInput) {
                customCityInput.required = true;
            }
        } else {
            customCityGroup.style.display = 'none';
            if (customCityInput) {
                customCityInput.required = false;
            }
        }
    }

    function initializeParaguayEuropeSelector() {
        const countrySelect = document.getElementById('country');
        const stateSelect = document.getElementById('state');
        const citySelect = document.getElementById('city');
        const customCityGroup = document.getElementById('custom-city-group');
        const customCityInput = document.getElementById('custom-city');

        if (!countrySelect || !stateSelect || !citySelect) {
            console.warn('Location selectors not found on the page.');
            return;
        }

        const persisted = getPersistedLocation();

        populateCountries(countrySelect, persisted.country);
        resetStateCity(stateSelect, citySelect, customCityGroup, customCityInput);

        countrySelect.addEventListener('change', function() {
            handleCountryChange(countrySelect, stateSelect, citySelect, customCityGroup, customCityInput);
        });

        stateSelect.addEventListener('change', function() {
            handleStateChange(countrySelect, stateSelect, citySelect, customCityGroup, customCityInput);
        });

        citySelect.addEventListener('change', function() {
            handleCityChange(citySelect, customCityGroup, customCityInput);
        });

        if (persisted.country && persisted.country !== 'OTHER') {
            populateStates(stateSelect, citySelect, persisted.country, persisted.state, persisted.city, customCityGroup, customCityInput);
        }

        if (persisted.city === 'other') {
            handleCityChange(citySelect, customCityGroup, customCityInput);
        }

        createExpansionModal();
    }

    function showExpansionModal() {
        const modal = document.getElementById('expansionModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeExpansionModal() {
        const modal = document.getElementById('expansionModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        const countrySelect = document.getElementById('country');
        if (countrySelect) {
            countrySelect.value = '';
        }

        const form = document.getElementById('expansionForm');
        if (form) {
            form.style.display = 'block';
        }

        const footer = document.getElementById('expansionFooter');
        if (footer) {
            footer.style.display = 'flex';
        }

        const success = document.getElementById('expansionSuccess');
        if (success) {
            success.classList.remove('active');
        }

        document.querySelectorAll('input[name="expansion-region"]').forEach(input => input.checked = false);
        const countryInput = document.getElementById('expansionCountry');
        if (countryInput) countryInput.value = '';
        const emailInput = document.getElementById('expansionEmail');
        if (emailInput) emailInput.value = '';
    }

    function createExpansionModal() {
        if (document.getElementById('expansionModal')) {
            return;
        }

        const modalHTML = `
        <div id="expansionModal" class="expansion-modal-overlay">
            <div class="expansion-modal">
                <div class="expansion-modal-header">
                    <div class="expansion-modal-icon">🌍</div>
                    <h2 class="expansion-modal-title">We're Growing Globally</h2>
                    <p class="expansion-modal-subtitle">Help shape our expansion roadmap</p>
                </div>

                <div class="expansion-modal-body" id="expansionForm">
                    <div class="expansion-intro">
                        <p>We're thrilled by your interest in Tessera Amoris! Currently, we're focused on creating exceptional matches between <strong>Paraguay and Europe</strong> as we refine our process and build our community.</p>
                        <p style="margin-top: 16px;"><strong>Your input matters:</strong> By sharing where you're from, you help us prioritize which regions to launch next. We'll keep you informed as we expand and would love to welcome you when we reach your area.</p>
                    </div>

                    <div class="expansion-form-group">
                        <label class="expansion-form-label">Which region are you from?</label>
                        <div class="expansion-region-options">
                            ${EXPANSION_REGIONS.map(region => `
                                <div class="expansion-region-option">
                                    <input type="radio" id="region-${region.value}" name="expansion-region" value="${region.value}">
                                    <label for="region-${region.value}" class="expansion-region-label">
                                        <span class="expansion-region-icon">${region.icon}</span>
                                        <span class="expansion-region-text">
                                            <span class="expansion-region-name">${region.label}</span>
                                            <span class="expansion-region-examples">${region.examples}</span>
                                        </span>
                                    </label>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="expansion-form-group">
                        <label for="expansionCountry" class="expansion-form-label">Your specific country</label>
                        <input type="text" id="expansionCountry" class="expansion-input" placeholder="e.g., United States, Brazil, Australia...">
                    </div>

                    <div class="expansion-form-group">
                        <label for="expansionEmail" class="expansion-form-label">Stay in touch (optional)</label>
                        <input type="email" id="expansionEmail" class="expansion-input" placeholder="your@email.com">
                        <div class="expansion-input-hint">
                            <i class="fas fa-bell"></i> Be the first to know when we launch in your region
                        </div>
                    </div>
                </div>

                <div class="expansion-success-message" id="expansionSuccess">
                    <div class="expansion-success-icon">✨</div>
                    <h3 class="expansion-success-title">Thank You for Your Interest!</h3>
                    <p class="expansion-success-text">We've recorded your interest and will prioritize regions based on demand. You're helping us build something truly special.</p>

                    <div class="expansion-next-steps">
                        <div class="expansion-step-item">
                            <div class="expansion-step-icon">📊</div>
                            <div class="expansion-step-text">
                                <strong>We'll analyze demand</strong>
                                <span>Your region will be considered for our next phase</span>
                            </div>
                        </div>
                        <div class="expansion-step-item">
                            <div class="expansion-step-icon">🚀</div>
                            <div class="expansion-step-text">
                                <strong>We'll notify you first</strong>
                                <span>When we launch in your area, you'll be among the first to know</span>
                            </div>
                        </div>
                        <div class="expansion-step-item">
                            <div class="expansion-step-icon">💝</div>
                            <div class="expansion-step-text">
                                <strong>You'll get priority access</strong>
                                <span>Early supporters receive special consideration</span>
                            </div>
                        </div>
                    </div>

                    <p class="expansion-timeline-note">
                        <i class="fas fa-info-circle"></i> We're currently focused on Paraguay-Europe connections. We'll reach out when we're ready to expand to your region—typically within 6-12 months based on demand.
                    </p>

                    <button class="expansion-btn expansion-btn-primary" onclick="closeExpansionModal()">Got It, Thanks!</button>
                </div>

                <div class="expansion-modal-footer" id="expansionFooter">
                    <button class="expansion-btn expansion-btn-secondary" onclick="closeExpansionModal()">Maybe Later</button>
                    <button class="expansion-btn expansion-btn-primary" onclick="submitExpansionInterest()">Share My Interest</button>
                </div>
            </div>
        </div>
    `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        document.getElementById('expansionModal').addEventListener('click', function(e) {
            if (e.target.id === 'expansionModal') {
                closeExpansionModal();
            }
        });
    }

    async function submitExpansionInterest() {
        const region = document.querySelector('input[name="expansion-region"]:checked')?.value;
        const country = document.getElementById('expansionCountry')?.value.trim();
        const email = document.getElementById('expansionEmail')?.value.trim();

        if (!region || !country) {
            alert('Please select a region and specify your country.');
            return;
        }

        const data = { region, country, email, timestamp: new Date().toISOString() };

        try {
            const existing = JSON.parse(localStorage.getItem('expansionInterests') || '[]');
            existing.push(data);
            localStorage.setItem('expansionInterests', JSON.stringify(existing));
            console.log('Expansion interest saved:', data);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }

        try {
            await fetch('/api/submit-expansion-interest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.log('API not available, saved to localStorage only');
        }

        document.getElementById('expansionForm').style.display = 'none';
        document.getElementById('expansionFooter').style.display = 'none';
        document.getElementById('expansionSuccess').classList.add('active');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeParaguayEuropeSelector);
    } else {
        initializeParaguayEuropeSelector();
    }

    window.closeExpansionModal = closeExpansionModal;
    window.submitExpansionInterest = submitExpansionInterest;
})();
