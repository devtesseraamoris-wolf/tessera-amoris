
(function() {
    'use strict';

    const SELECTOR_FLAG = 'paraguay-europe-v2.0';
    if (window.tesseraParaguayEuropeSelectorInitialized === SELECTOR_FLAG) {
        console.log('[Tessera] Selector already initialized, skipping');
        return;
    }

    // Block any other location selector from running
    window.tesseraParaguayEuropeSelectorInitialized = SELECTOR_FLAG;
    window.tesseraLocationSelectorActive = SELECTOR_FLAG;
    window.tesseraBlockOtherLocationSelectors = true;
    console.log('[Tessera] Selector flag set:', SELECTOR_FLAG);

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
        { code: 'CY', name: 'Cyprus', flag: '🇨🇾', dialCode: '+357' },
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

    const COUNTRY_NATIONALITIES = {
        PY: 'Paraguayan',
        AL: 'Albanian',
        AD: 'Andorran',
        AT: 'Austrian',
        BY: 'Belarusian',
        BE: 'Belgian',
        BA: 'Bosnian',
        BG: 'Bulgarian',
        HR: 'Croatian',
        CY: 'Cypriot',
        CZ: 'Czech',
        DK: 'Danish',
        EE: 'Estonian',
        FI: 'Finnish',
        FR: 'French',
        DE: 'German',
        GR: 'Greek',
        VA: 'Vatican Citizen',
        HU: 'Hungarian',
        IS: 'Icelandic',
        IE: 'Irish',
        IT: 'Italian',
        LV: 'Latvian',
        LI: 'Liechtensteiner',
        LT: 'Lithuanian',
        LU: 'Luxembourgish',
        MT: 'Maltese',
        MD: 'Moldovan',
        MC: 'Monegasque',
        ME: 'Montenegrin',
        NL: 'Dutch',
        MK: 'North Macedonian',
        NO: 'Norwegian',
        PL: 'Polish',
        PT: 'Portuguese',
        RO: 'Romanian',
        RU: 'Russian',
        SM: 'Sammarinese',
        RS: 'Serbian',
        SK: 'Slovak',
        SI: 'Slovenian',
        ES: 'Spanish',
        SE: 'Swedish',
        CH: 'Swiss',
        UA: 'Ukrainian',
        GB: 'British'
    };

    const MANUAL_NATIONALITY_SYNONYMS = {
        Paraguayan: ['Paraguay', 'Paraguaya'],
        Brazilian: ['Brazil', 'Brasil', 'Brazilia', 'Brasilian', 'Brasileiro', 'Brasileira', 'Brazillian'],
        American: ['USA', 'US', 'United States', 'Estados Unidos', 'Estadounidense'],
        Canadian: ['Canada', 'Canadien', 'Canadienne'],
        Argentine: ['Argentina', 'Argentinian', 'Argentino', 'Argentina'],
        Mexican: ['Mexico', 'Mexican', 'Mexicano', 'Mexicana'],
        British: ['United Kingdom', 'UK', 'Great Britain', 'Britain', 'England', 'English', 'Scotland', 'Scottish', 'Wales', 'Welsh', 'Northern Ireland'],
        Dutch: ['Netherlands', 'Holland', 'Hollandaise'],
        Swiss: ['Switzerland', 'Suisse', 'Schweiz'],
        German: ['Germany', 'Deutschland', 'Deutsch'],
        French: ['France', 'Français', 'Francaise', 'Française'],
        Spanish: ['Spain', 'España', 'Espanol', 'Español', 'Española'],
        Portuguese: ['Portugal', 'Portugués', 'Portuguesa'],
        Italian: ['Italy', 'Italia', 'Italiano', 'Italiana'],
        Polish: ['Poland', 'Polska'],
        Romanian: ['Romania', 'România'],
        Hungarian: ['Hungary', 'Magyarorszag', 'Magyar'],
        Czech: ['Czechia', 'Czech Republic'],
        Slovak: ['Slovakia', 'Slovakian'],
        Slovenian: ['Slovenia', 'Slovene'],
        Serbian: ['Serbia', 'Srpski'],
        Bosnian: ['Bosnia', 'Bosnia and Herzegovina', 'Herzegovina'],
        Croatian: ['Croatia', 'Hrvatska'],
        Greek: ['Greece', 'Hellas', 'Ελλάδα'],
        Lithuanian: ['Lithuania', 'Lietuva'],
        Latvian: ['Latvia', 'Latvija'],
        Estonian: ['Estonia', 'Eesti'],
        Finnish: ['Finland', 'Suomi'],
        Swedish: ['Sweden', 'Sverige'],
        Norwegian: ['Norway', 'Norge'],
        Danish: ['Denmark', 'Danmark'],
        Irish: ['Ireland', 'Éire'],
        Icelandic: ['Iceland', 'Ísland'],
        Austrian: ['Austria', 'Österreich'],
        Belarusian: ['Belarus', 'Беларусь'],
        Ukrainian: ['Ukraine', 'Україна'],
        Russian: ['Russia', 'Российский', 'Россия'],
        Moldovan: ['Moldova', 'Moldavia'],
        Maltese: ['Malta', 'Maltija'],
        Cypriot: ['Cyprus', 'Κύπρος'],
        Luxembourgish: ['Luxembourg', 'Letzebuerg'],
        Andorran: ['Andorra'],
        Monegasque: ['Monaco'],
        Montenegrin: ['Montenegro'],
        North Macedonian: ['North Macedonia', 'Macedonia'],
        Sammarinese: ['San Marino'],
        Vatican Citizen: ['Vatican', 'Holy See'],
        Albanian: ['Albania', 'Shqipëri'],
        Bulgarian: ['Bulgaria', 'България'],
    };

    const DEFAULT_NATIONALITY_SUGGESTIONS = [
        'Paraguayan',
        'Brazilian',
        'American',
        'British',
        'German',
        'Spanish',
        'French',
        'Italian',
        'Dutch',
        'Portuguese'
    ];

    const EXTRA_NATIONALITY_OPTIONS = ['American', 'Brazilian', 'Canadian', 'Argentine', 'Mexican'];

    const PHONE_CODE_FALLBACKS = [
        { dialCode: '+1', label: 'United States / Canada' },
        { dialCode: '+55', label: 'Brazil' }
    ];

    const EXPANSION_REGIONS = [
        { value: 'americas', label: 'Americas', icon: '🌎', examples: 'USA, Canada, Brazil, Argentina, Chile, Mexico...' },
        { value: 'asia', label: 'Asia', icon: '🌏', examples: 'Japan, Singapore, South Korea, India, China...' },
        { value: 'middle_east', label: 'Middle East', icon: '🕌', examples: 'UAE, Israel, Saudi Arabia, Qatar, Turkey...' },
        { value: 'oceania', label: 'Oceania', icon: '🦘', examples: 'Australia, New Zealand, Fiji, Papua New Guinea...' },
        { value: 'africa', label: 'Africa', icon: '🦁', examples: 'South Africa, Kenya, Egypt, Morocco, Nigeria...' }
    ];

    const AVAILABLE_COUNTRIES = RAW_COUNTRIES.map(country => ({
        ...country,
        hasStates: Boolean(LOCATION_DATA[country.code]?.regions?.length)
    }));

    function normalizeText(value) {
        if (!value) {
            return '';
        }
        return value
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, ' ')
            .trim();
    }

    function slugify(value) {
        return normalizeText(value).replace(/\s+/g, '-');
    }

    function getPersistedLocation() {
        try {
            const stored = localStorage.getItem('tessera_form_data');
            if (stored) {
                const parsed = JSON.parse(stored);
                return {
                    country: parsed.country || '',
                    state: parsed.state || '',
                    city: parsed.city || '',
                    nationality: parsed.nationality || ''
                };
            }
        } catch (error) {
            console.warn('Unable to read persisted location data:', error);
        }
        return { country: '', state: '', city: '', nationality: '' };
    }

    function buildNationalityIndex() {
        const options = [];
        const optionLookup = new Map();
        const synonymMap = new Map();

        function register(label, synonyms) {
            if (!label) {
                return;
            }
            const normalizedLabel = normalizeText(label);
            if (!normalizedLabel) {
                return;
            }

            let option = optionLookup.get(label);
            if (!option) {
                option = {
                    label,
                    normalized: normalizedLabel,
                    keywords: new Set([normalizedLabel])
                };
                options.push(option);
                optionLookup.set(label, option);
            }

            synonymMap.set(normalizedLabel, label);

            if (Array.isArray(synonyms)) {
                synonyms.forEach(value => {
                    const normalized = normalizeText(value);
                    if (!normalized) {
                        return;
                    }
                    synonymMap.set(normalized, label);
                    option.keywords.add(normalized);
                });
            }
        }

        RAW_COUNTRIES.forEach(country => {
            const demonym = COUNTRY_NATIONALITIES[country.code];
            if (!demonym) {
                return;
            }
            const synonyms = [country.name, country.code];
            if (MANUAL_NATIONALITY_SYNONYMS[demonym]) {
                synonyms.push(...MANUAL_NATIONALITY_SYNONYMS[demonym]);
            }
            register(demonym, synonyms);
        });

        EXTRA_NATIONALITY_OPTIONS.forEach(label => {
            const synonyms = MANUAL_NATIONALITY_SYNONYMS[label] || [];
            register(label, synonyms);
        });

        return { options, synonymMap };
    }

    function dedupeList(list) {
        const seen = new Set();
        return list.filter(item => {
            if (seen.has(item)) {
                return false;
            }
            seen.add(item);
            return true;
        });
    }

    function buildSuggestionsBuilder(index) {
        const { options } = index;

        return function buildSuggestions(query) {
            const normalizedQuery = normalizeText(query);

            if (!normalizedQuery) {
                return DEFAULT_NATIONALITY_SUGGESTIONS.slice();
            }

            const startsWithMatches = [];
            const keywordMatches = [];
            const containsMatches = [];

            options.forEach(option => {
                if (option.normalized.startsWith(normalizedQuery)) {
                    startsWithMatches.push(option.label);
                    return;
                }

                const keywordHit = Array.from(option.keywords).some(keyword => keyword.startsWith(normalizedQuery));
                if (keywordHit) {
                    keywordMatches.push(option.label);
                    return;
                }

                if (option.normalized.includes(normalizedQuery)) {
                    containsMatches.push(option.label);
                    return;
                }

                const keywordContains = Array.from(option.keywords).some(keyword => keyword.includes(normalizedQuery));
                if (keywordContains) {
                    containsMatches.push(option.label);
                }
            });

            return dedupeList([...startsWithMatches, ...keywordMatches, ...containsMatches]).slice(0, 10);
        };
    }

    function resolveNationalityValue(value, index) {
        const normalized = normalizeText(value);
        if (!normalized) {
            return '';
        }

        const { options, synonymMap } = index;

        if (synonymMap.has(normalized)) {
            return synonymMap.get(normalized);
        }

        const exact = options.find(option => option.normalized === normalized);
        if (exact) {
            return exact.label;
        }

        const keyword = options.find(option => option.keywords.has(normalized));
        if (keyword) {
            return keyword.label;
        }

        const startsWith = options.find(option => option.normalized.startsWith(normalized));
        if (startsWith) {
            return startsWith.label;
        }

        const keywordStarts = options.find(option => Array.from(option.keywords).some(keyword => keyword.startsWith(normalized)));
        if (keywordStarts) {
            return keywordStarts.label;
        }

        const contains = options.find(option => option.normalized.includes(normalized));
        if (contains) {
            return contains.label;
        }

        const keywordContains = options.find(option => Array.from(option.keywords).some(keyword => keyword.includes(normalized)));
        if (keywordContains) {
            return keywordContains.label;
        }

        return value;
    }

    function populateCountries(select, selectedCountry) {
        if (!select) {
            return;
        }

        select.innerHTML = '';

        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'Select your country';
        placeholder.disabled = true;
        placeholder.selected = true;
        select.appendChild(placeholder);

        const paraguay = AVAILABLE_COUNTRIES.find(country => country.code === 'PY');
        if (paraguay) {
            select.appendChild(createCountryOption(paraguay));
        }

        const divider = document.createElement('option');
        divider.textContent = '─────────────── Europe ───────────────';
        divider.disabled = true;
        divider.style.fontWeight = '600';
        divider.style.color = '#D4AF37';
        divider.style.textAlign = 'center';
        divider.style.backgroundColor = '#f7fafc';
        select.appendChild(divider);

        AVAILABLE_COUNTRIES
            .filter(country => country.code !== 'PY')
            .forEach(country => select.appendChild(createCountryOption(country)));

        const otherOption = document.createElement('option');
        otherOption.value = 'OTHER';
        otherOption.textContent = '🌍 My country isn't listed yet';
        otherOption.style.fontWeight = '500';
        otherOption.style.color = '#4299e1';
        otherOption.style.fontStyle = 'italic';
        select.appendChild(otherOption);

        if (selectedCountry && select.querySelector(`option[value="${selectedCountry}"]`)) {
            select.value = selectedCountry;
        }
    }

    function createCountryOption(country) {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = `${country.flag} ${country.name}`;
        return option;
    }

    function populatePhoneCodes(select) {
        if (!select) {
            return;
        }

        const seen = new Set();
        const entries = [];

        RAW_COUNTRIES.forEach(country => {
            if (!country.dialCode || seen.has(country.dialCode)) {
                return;
            }
            seen.add(country.dialCode);
            entries.push({
                dialCode: country.dialCode,
                label: `${country.dialCode} ${country.flag} ${country.name}`
            });
        });

        PHONE_CODE_FALLBACKS.forEach(fallback => {
            if (!fallback.dialCode || seen.has(fallback.dialCode)) {
                return;
            }
            seen.add(fallback.dialCode);
            entries.push({ dialCode: fallback.dialCode, label: `${fallback.dialCode} (${fallback.label})` });
        });

        entries.sort((a, b) => parseInt(a.dialCode.slice(1), 10) - parseInt(b.dialCode.slice(1), 10));

        const currentValue = select.value;
        select.innerHTML = '';

        entries.forEach(entry => {
            const option = document.createElement('option');
            option.value = entry.dialCode;
            option.textContent = entry.label;
            select.appendChild(option);
        });

        if (currentValue) {
            select.value = currentValue;
        } else if (PHONE_CODE_FALLBACKS[0]) {
            select.value = PHONE_CODE_FALLBACKS[0].dialCode;
        }
    }

    function syncPhoneDialCode(countryCode, select) {
        if (!select) {
            return;
        }
        const entry = RAW_COUNTRIES.find(country => country.code === countryCode);
        if (!entry || !entry.dialCode) {
            return;
        }

        if (!Array.from(select.options).some(option => option.value === entry.dialCode)) {
            const option = document.createElement('option');
            option.value = entry.dialCode;
            option.textContent = entry.dialCode;
            select.appendChild(option);
        }

        select.value = entry.dialCode;
    }

    function resetStateCity(stateSelect, citySelect, customCityGroup, customCityInput) {
        if (stateSelect) {
            stateSelect.innerHTML = '<option value="">Select your state/province</option>';
            stateSelect.disabled = true;
        }
        if (citySelect) {
            citySelect.innerHTML = '<option value="">Select your city</option>';
            citySelect.disabled = true;
        }
        if (customCityGroup) {
            customCityGroup.style.display = 'none';
        }
        if (customCityInput) {
            customCityInput.required = false;
            customCityInput.value = '';
        }
    }

    function populateStates(stateSelect, citySelect, countryCode, preservedState, preservedCity, customCityGroup, customCityInput) {
        if (!stateSelect || !citySelect) {
            return;
        }

        const countryData = LOCATION_DATA[countryCode];
        if (!countryData || !Array.isArray(countryData.regions) || countryData.regions.length === 0) {
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
        }
    }

    function populateCities(citySelect, countryCode, stateValue, preservedCity, customCityGroup, customCityInput) {
        if (!citySelect) {
            return;
        }

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
            option.value = slugify(city);
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

    function handleCityChange(citySelect, customCityGroup, customCityInput) {
        if (!citySelect || !customCityGroup) {
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
        if (countrySelect && countrySelect.value === 'OTHER') {
            countrySelect.value = '';
        }

        document.querySelectorAll('input[name="expansion-region"]').forEach(input => {
            input.checked = false;
        });

        const countryInput = document.getElementById('expansionCountry');
        if (countryInput) {
            countryInput.value = '';
        }

        const emailInput = document.getElementById('expansionEmail');
        if (emailInput) {
            emailInput.value = '';
        }

        const form = document.getElementById('expansionForm');
        const footer = document.getElementById('expansionFooter');
        const success = document.getElementById('expansionSuccess');

        if (form) {
            form.style.display = 'block';
        }
        if (footer) {
            footer.style.display = 'flex';
        }
        if (success) {
            success.classList.remove('active');
        }
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

        document.getElementById('expansionModal').addEventListener('click', function(event) {
            if (event.target.id === 'expansionModal') {
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
        } catch (error) {
            console.error('Error saving expansion interest:', error);
        }

        try {
            await fetch('/api/submit-expansion-interest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.log('Expansion interest API not available. Saved locally.');
        }

        const form = document.getElementById('expansionForm');
        const footer = document.getElementById('expansionFooter');
        const success = document.getElementById('expansionSuccess');

        if (form) {
            form.style.display = 'none';
        }
        if (footer) {
            footer.style.display = 'none';
        }
        if (success) {
            success.classList.add('active');
        }
    }

    function setupNationalityAutocomplete(input, suggestionContainer, index) {
        if (!input || !suggestionContainer) {
            return;
        }

        const buildSuggestions = buildSuggestionsBuilder(index);
        let currentSuggestions = [];
        let activeIndex = -1;

        function closeSuggestions() {
            suggestionContainer.innerHTML = '';
            suggestionContainer.classList.remove('is-visible');
            input.setAttribute('aria-expanded', 'false');
            input.removeAttribute('aria-activedescendant');
            currentSuggestions = [];
            activeIndex = -1;
        }

        function highlightSuggestion(index) {
            const items = suggestionContainer.querySelectorAll('.nationality-suggestion-item');
            items.forEach((item, itemIndex) => {
                if (itemIndex === index) {
                    item.classList.add('is-active');
                    input.setAttribute('aria-activedescendant', item.id);
                    item.scrollIntoView({ block: 'nearest' });
                } else {
                    item.classList.remove('is-active');
                }
            });
            activeIndex = index;
            if (index < 0) {
                input.removeAttribute('aria-activedescendant');
            }
        }

        function openSuggestions(list) {
            suggestionContainer.innerHTML = '';

            if (!list.length) {
                closeSuggestions();
                return;
            }

            list.forEach((label, index) => {
                const item = document.createElement('div');
                item.className = 'nationality-suggestion-item';
                item.id = `${input.id || 'nationality'}-suggestion-${index}`;
                item.setAttribute('role', 'option');
                item.textContent = label;
                item.dataset.value = label;
                suggestionContainer.appendChild(item);
            });

            suggestionContainer.classList.add('is-visible');
            input.setAttribute('aria-expanded', 'true');
            currentSuggestions = list;
            highlightSuggestion(-1);
        }

        function selectSuggestion(value) {
            if (!value) {
                return;
            }
            input.value = value;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            closeSuggestions();
        }

        input.setAttribute('autocomplete', 'off');
        input.setAttribute('role', 'combobox');
        input.setAttribute('aria-haspopup', 'listbox');
        input.setAttribute('aria-expanded', 'false');
        suggestionContainer.setAttribute('role', 'listbox');

        input.addEventListener('input', function(event) {
            if (input.dataset.autofilledFromCountry === 'true') {
                delete input.dataset.autofilledFromCountry;
            }
            const suggestions = buildSuggestions(event.target.value);
            if (suggestions.length) {
                openSuggestions(suggestions);
            } else {
                closeSuggestions();
            }
        });

        input.addEventListener('focus', function() {
            const suggestions = buildSuggestions(input.value);
            if (suggestions.length) {
                openSuggestions(suggestions);
            }
        });

        input.addEventListener('blur', function() {
            setTimeout(closeSuggestions, 120);
            const resolved = resolveNationalityValue(input.value, index);
            if (resolved && resolved !== input.value) {
                input.value = resolved;
            }
        });

        input.addEventListener('keydown', function(event) {
            if (!suggestionContainer.classList.contains('is-visible')) {
                if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                    const suggestions = buildSuggestions(input.value);
                    if (suggestions.length) {
                        event.preventDefault();
                        openSuggestions(suggestions);
                    }
                }
                return;
            }

            if (event.key === 'ArrowDown') {
                event.preventDefault();
                if (currentSuggestions.length) {
                    const nextIndex = activeIndex + 1 >= currentSuggestions.length ? 0 : activeIndex + 1;
                    highlightSuggestion(nextIndex);
                }
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                if (currentSuggestions.length) {
                    const prevIndex = activeIndex - 1 < 0 ? currentSuggestions.length - 1 : activeIndex - 1;
                    highlightSuggestion(prevIndex);
                }
            } else if (event.key === 'Enter') {
                if (activeIndex >= 0 && currentSuggestions[activeIndex]) {
                    event.preventDefault();
                    selectSuggestion(currentSuggestions[activeIndex]);
                }
            } else if (event.key === 'Escape') {
                closeSuggestions();
            }
        });

        suggestionContainer.addEventListener('pointerdown', function(event) {
            event.preventDefault();
            const item = event.target.closest('.nationality-suggestion-item');
            if (item) {
                selectSuggestion(item.dataset.value);
            }
        });

        suggestionContainer.addEventListener('mousemove', function(event) {
            const item = event.target.closest('.nationality-suggestion-item');
            if (!item) {
                return;
            }
            const items = Array.from(suggestionContainer.querySelectorAll('.nationality-suggestion-item'));
            const index = items.indexOf(item);
            if (index >= 0 && index !== activeIndex) {
                highlightSuggestion(index);
            }
        });
    }

    function setNationalityFromCountry(countryCode, input, index) {
        if (!input) {
            return;
        }
        const demonym = COUNTRY_NATIONALITIES[countryCode];
        if (!demonym) {
            return;
        }

        if (!input.value || input.dataset.autofilledFromCountry === 'true') {
            const resolved = resolveNationalityValue(demonym, index) || demonym;
            input.value = resolved;
            input.dataset.autofilledFromCountry = 'true';
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }

    function handleCountryChange(countrySelect, stateSelect, citySelect, customCityGroup, customCityInput, phoneCodeSelect, nationalityInput, nationalityIndex) {
        const selectedCountry = countrySelect.value;

        if (!selectedCountry) {
            resetStateCity(stateSelect, citySelect, customCityGroup, customCityInput);
            if (phoneCodeSelect && PHONE_CODE_FALLBACKS[0]) {
                phoneCodeSelect.value = PHONE_CODE_FALLBACKS[0].dialCode;
            }
            return;
        }

        if (selectedCountry === 'OTHER') {
            showExpansionModal();
            resetStateCity(stateSelect, citySelect, customCityGroup, customCityInput);
            if (phoneCodeSelect) {
                phoneCodeSelect.value = '';
            }
            if (nationalityInput) {
                nationalityInput.value = '';
                delete nationalityInput.dataset.autofilledFromCountry;
                nationalityInput.dispatchEvent(new Event('input', { bubbles: true }));
                nationalityInput.dispatchEvent(new Event('change', { bubbles: true }));
            }
            return;
        }

        setNationalityFromCountry(selectedCountry, nationalityInput, nationalityIndex);
        syncPhoneDialCode(selectedCountry, phoneCodeSelect);
        populateStates(stateSelect, citySelect, selectedCountry, undefined, undefined, customCityGroup, customCityInput);
    }

    function initializeSelector() {
        console.log('[Tessera] Paraguay-Europe Selector v2.0 initializing...');
        console.log('[Tessera] Available countries:', AVAILABLE_COUNTRIES.length);
        console.log('[Tessera] Countries:', AVAILABLE_COUNTRIES.map(c => c.name).join(', '));
        const countrySelect = document.getElementById('country');
        const stateSelect = document.getElementById('state');
        const citySelect = document.getElementById('city');
        const customCityGroup = document.getElementById('custom-city-group');
        const customCityInput = document.getElementById('custom-city');
        const phoneCodeSelect = document.getElementById('country-code');
        const nationalityInput = document.getElementById('nationality');
        const suggestionContainer = document.getElementById('nationality-suggestions');

        if (!countrySelect || !stateSelect || !citySelect) {
            console.warn('Location selectors not found on the page.');
            return;
        }

        const nationalityIndex = buildNationalityIndex();
        const persisted = getPersistedLocation();

        populateCountries(countrySelect, persisted.country);
        console.log('[Tessera] Country dropdown populated with', countrySelect.options.length - 1, 'options (excluding placeholder)');
        populatePhoneCodes(phoneCodeSelect);
        setupNationalityAutocomplete(nationalityInput, suggestionContainer, nationalityIndex);
        resetStateCity(stateSelect, citySelect, customCityGroup, customCityInput);
        createExpansionModal();

        if (nationalityInput) {
            nationalityInput.addEventListener('input', function() {
                if (nationalityInput.dataset.autofilledFromCountry === 'true') {
                    delete nationalityInput.dataset.autofilledFromCountry;
                }
            });
            if (persisted.nationality) {
                nationalityInput.value = persisted.nationality;
            }
        }

        countrySelect.addEventListener('change', function() {
            handleCountryChange(countrySelect, stateSelect, citySelect, customCityGroup, customCityInput, phoneCodeSelect, nationalityInput, nationalityIndex);
        });

        stateSelect.addEventListener('change', function() {
            populateCities(citySelect, countrySelect.value, stateSelect.value, undefined, customCityGroup, customCityInput);
        });

        citySelect.addEventListener('change', function() {
            handleCityChange(citySelect, customCityGroup, customCityInput);
        });

        if (persisted.country && persisted.country !== 'OTHER') {
            populateStates(stateSelect, citySelect, persisted.country, persisted.state, persisted.city, customCityGroup, customCityInput);
            syncPhoneDialCode(persisted.country, phoneCodeSelect);
            setNationalityFromCountry(persisted.country, nationalityInput, nationalityIndex);
        } else if (persisted.country === 'OTHER' && phoneCodeSelect) {
            phoneCodeSelect.value = '';
        }

        if (persisted.city === 'other') {
            handleCityChange(citySelect, customCityGroup, customCityInput);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeSelector);
    } else {
        initializeSelector();
    }

    window.closeExpansionModal = closeExpansionModal;
    window.submitExpansionInterest = submitExpansionInterest;
})();
