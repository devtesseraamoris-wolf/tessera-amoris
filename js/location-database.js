// Comprehensive Location Database built from LOCATION_DATA
(function(global) {
    const dataSource = (typeof LOCATION_DATA !== 'undefined' && LOCATION_DATA && LOCATION_DATA.countries)
        ? LOCATION_DATA
        : (typeof require === 'function' ? require('./location-data.js') : null);

    if (!dataSource || !dataSource.countries) {
        console.error('LOCATION_DATA is required to build the location database.');
        return;
    }

    function sanitizeCode(value) {
        if (!value) return '';
        return value
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '');
    }

    function cleanList(items) {
        return Array.from(new Set(
            (items || [])
                .map(item => (item || '').toString().trim())
                .filter(Boolean)
        ));
    }

    function buildCountries() {
        const countries = {};
        Object.entries(dataSource.countries).forEach(([countryCode, country]) => {
            const normalizedCode = countryCode.toUpperCase();
            const stateMap = {};

            (country.states || []).forEach(state => {
                const stateName = (state.name || '').trim();
                if (!stateName) return;
                const stateCode = sanitizeCode(state.code || stateName);
                stateMap[stateCode] = {
                    name: stateName,
                    cities: cleanList(state.cities || [])
                };
            });

            countries[normalizedCode] = {
                name: country.name || normalizedCode,
                states: stateMap
            };
        });
        return countries;
    }

    const countries = buildCountries();

    const LocationDatabase = {
        countries,

        getCountries() {
            return Object.keys(this.countries)
                .map(code => ({ value: code, label: this.countries[code].name }))
                .sort((a, b) => a.label.localeCompare(b.label));
        },

        getStates(countryKey) {
            if (!countryKey) return [];
            const key = countryKey.toUpperCase();
            const country = this.countries[key];
            if (!country) return [];
            return Object.keys(country.states)
                .map(code => ({ value: code, label: country.states[code].name }))
                .sort((a, b) => a.label.localeCompare(b.label));
        },

        getCities(countryKey, stateKey) {
            if (!countryKey || !stateKey) return [];
            const country = this.countries[countryKey.toUpperCase()];
            if (!country) return [];
            const state = country.states[stateKey];
            if (!state) return [];
            return state.cities.map(city => ({
                value: sanitizeCode(city),
                label: city
            }));
        },

        getCountryName(countryKey) {
            const country = this.countries[countryKey?.toUpperCase()];
            return country ? country.name : '';
        },

        getStateName(countryKey, stateKey) {
            if (!countryKey || !stateKey) return '';
            const country = this.countries[countryKey.toUpperCase()];
            if (!country) return '';
            const state = country.states[stateKey];
            return state ? state.name : '';
        }
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = LocationDatabase;
    }

    global.LocationDatabase = LocationDatabase;
})(typeof window !== 'undefined' ? window : globalThis);
