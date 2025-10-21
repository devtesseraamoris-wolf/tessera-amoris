// Dynamic Location Data Service for Paraguay and European Countries
(function() {
    const dataSource = (typeof LOCATION_DATA !== 'undefined' && LOCATION_DATA && LOCATION_DATA.countries)
        ? LOCATION_DATA
        : (typeof require === 'function' ? require('./location-data.js') : null);

    if (!dataSource || !dataSource.countries) {
        console.error('LOCATION_DATA is required for the location service.');
        return;
    }

    const allowedCountries = {};
    const stateCache = {};
    const stateLookup = {};
    const cityCache = {};
    const fallbackDatasets = {};
    const fallbackCityMap = {};

    function sanitizeCode(value) {
        if (!value) return '';
        return value
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function cleanList(items) {
        return Array.from(new Set(
            (items || [])
                .map(item => (item || '').toString().trim())
                .filter(Boolean)
        ));
    }

    function registerFallbackDataset(countryCode, states) {
        if (!states || !states.length) return;

        const preparedStates = states.map(state => {
            const name = (state.name || '').trim();
            if (!name) return null;

            const code = sanitizeCode(state.code || name);
            const cities = cleanList(state.cities || []);

            // Ensure at least one city to avoid empty dropdowns
            fallbackCityMap[`${countryCode}::${code}`] = cities.length ? cities : [name];

            return { code, name };
        }).filter(Boolean);

        if (preparedStates.length) {
            fallbackDatasets[countryCode] = preparedStates.sort((a, b) => a.name.localeCompare(b.name));
        }
    }

    Object.entries(dataSource.countries).forEach(([countryCode, country]) => {
        const label = country.name || countryCode;
        const apiName = country.apiName || label;

        allowedCountries[countryCode] = { label, apiName };
        registerFallbackDataset(countryCode, country.states || []);
    });

    const supportsFetch = typeof fetch === 'function';

    async function fetchStatesFromApi(countryCode) {
        if (!supportsFetch) return [];
        const country = allowedCountries[countryCode];
        if (!country || !window.LOCATION_API_ENDPOINTS || !LOCATION_API_ENDPOINTS.states) {
            return [];
        }

        try {
            const response = await fetch(LOCATION_API_ENDPOINTS.states, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country: country.apiName })
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const result = await response.json();
            if (!result || result.error || !Array.isArray(result.data?.states)) {
                return [];
            }

            const uniqueStates = [];
            const seen = new Set();

            result.data.states.forEach(state => {
                const rawName = state.name || state.state_code || '';
                const name = rawName.toString().trim();
                if (!name) return;
                const key = name.toLowerCase();
                if (seen.has(key)) return;
                seen.add(key);
                uniqueStates.push({
                    code: sanitizeCode(state.state_code || name),
                    name
                });
            });

            return uniqueStates.sort((a, b) => a.name.localeCompare(b.name));
        } catch (error) {
            console.error('Failed to load states for', countryCode, error);
            return [];
        }
    }

    async function fetchCitiesFromApi(countryCode, stateCode) {
        if (!supportsFetch) return [];
        const country = allowedCountries[countryCode];
        const stateName = stateLookup[countryCode] ? stateLookup[countryCode][stateCode] : null;
        if (!country || !stateName || !window.LOCATION_API_ENDPOINTS || !LOCATION_API_ENDPOINTS.cities) {
            return [];
        }

        try {
            const response = await fetch(LOCATION_API_ENDPOINTS.cities, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country: country.apiName, state: stateName })
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const result = await response.json();
            if (!result || result.error) return [];

            const cities = cleanList(result.data);
            cities.sort((a, b) => a.localeCompare(b));
            return cities;
        } catch (error) {
            console.error('Failed to load cities for', countryCode, stateCode, error);
            return [];
        }
    }

    async function getStates(countryCode) {
        if (stateCache[countryCode]) {
            return stateCache[countryCode];
        }

        let states = fallbackDatasets[countryCode] ? [...fallbackDatasets[countryCode]] : [];
        if (!states.length) {
            states = await fetchStatesFromApi(countryCode);
        }

        if (!states.length) {
            stateCache[countryCode] = [];
            stateLookup[countryCode] = {};
            return [];
        }

        stateCache[countryCode] = states;
        stateLookup[countryCode] = states.reduce((lookup, state) => {
            lookup[state.code] = state.name;
            return lookup;
        }, {});

        return states;
    }

    async function getCities(countryCode, stateCode) {
        const cacheKey = `${countryCode}::${stateCode}`;
        if (cityCache[cacheKey]) {
            return cityCache[cacheKey];
        }

        let cities = fallbackCityMap[cacheKey] ? [...fallbackCityMap[cacheKey]] : [];
        if (!cities.length) {
            cities = await fetchCitiesFromApi(countryCode, stateCode);
        }

        cityCache[cacheKey] = cities;
        return cities;
    }

    function getCountryLabel(countryCode) {
        return allowedCountries[countryCode] ? allowedCountries[countryCode].label : '';
    }

    function getStateLabel(countryCode, stateCode) {
        if (!stateLookup[countryCode]) return '';
        return stateLookup[countryCode][stateCode] || '';
    }

    const service = {
        countries: allowedCountries,
        getStates,
        getCities,
        getCountryLabel,
        getStateLabel
    };

    if (typeof window !== 'undefined') {
        window.locationDataService = service;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = service;
    }
})();
