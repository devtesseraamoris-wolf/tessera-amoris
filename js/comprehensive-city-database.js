// Dynamic Location Data Service for Paraguay and European Countries
(function() {
    const LOCATION_API_ENDPOINTS = {
        states: 'https://countriesnow.space/api/v0.1/countries/states',
        cities: 'https://countriesnow.space/api/v0.1/countries/state/cities'
    };

    const allowedCountries = {
        'PY': { label: 'Paraguay', apiName: 'Paraguay' },
        'AL': { label: 'Albania', apiName: 'Albania' },
        'AD': { label: 'Andorra', apiName: 'Andorra' },
        'AT': { label: 'Austria', apiName: 'Austria' },
        'BY': { label: 'Belarus', apiName: 'Belarus' },
        'BE': { label: 'Belgium', apiName: 'Belgium' },
        'BA': { label: 'Bosnia and Herzegovina', apiName: 'Bosnia and Herzegovina' },
        'BG': { label: 'Bulgaria', apiName: 'Bulgaria' },
        'HR': { label: 'Croatia', apiName: 'Croatia' },
        'CZ': { label: 'Czech Republic', apiName: 'Czech Republic' },
        'DK': { label: 'Denmark', apiName: 'Denmark' },
        'EE': { label: 'Estonia', apiName: 'Estonia' },
        'FI': { label: 'Finland', apiName: 'Finland' },
        'FR': { label: 'France', apiName: 'France' },
        'DE': { label: 'Germany', apiName: 'Germany' },
        'GR': { label: 'Greece', apiName: 'Greece' },
        'VA': { label: 'Holy See (Vatican City)', apiName: 'Holy See (Vatican City State)' },
        'HU': { label: 'Hungary', apiName: 'Hungary' },
        'IS': { label: 'Iceland', apiName: 'Iceland' },
        'IE': { label: 'Ireland', apiName: 'Ireland' },
        'IT': { label: 'Italy', apiName: 'Italy' },
        'LV': { label: 'Latvia', apiName: 'Latvia' },
        'LI': { label: 'Liechtenstein', apiName: 'Liechtenstein' },
        'LT': { label: 'Lithuania', apiName: 'Lithuania' },
        'LU': { label: 'Luxembourg', apiName: 'Luxembourg' },
        'MT': { label: 'Malta', apiName: 'Malta' },
        'MD': { label: 'Moldova', apiName: 'Moldova' },
        'MC': { label: 'Monaco', apiName: 'Monaco' },
        'ME': { label: 'Montenegro', apiName: 'Montenegro' },
        'NL': { label: 'Netherlands', apiName: 'Netherlands' },
        'MK': { label: 'North Macedonia', apiName: 'Macedonia' },
        'NO': { label: 'Norway', apiName: 'Norway' },
        'PL': { label: 'Poland', apiName: 'Poland' },
        'PT': { label: 'Portugal', apiName: 'Portugal' },
        'RO': { label: 'Romania', apiName: 'Romania' },
        'RU': { label: 'Russia', apiName: 'Russia' },
        'SM': { label: 'San Marino', apiName: 'San Marino' },
        'RS': { label: 'Serbia', apiName: 'Serbia' },
        'SK': { label: 'Slovakia', apiName: 'Slovakia' },
        'SI': { label: 'Slovenia', apiName: 'Slovenia' },
        'ES': { label: 'Spain', apiName: 'Spain' },
        'SE': { label: 'Sweden', apiName: 'Sweden' },
        'CH': { label: 'Switzerland', apiName: 'Switzerland' },
        'UA': { label: 'Ukraine', apiName: 'Ukraine' },
        'GB': { label: 'United Kingdom', apiName: 'United Kingdom' }
    };

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
                .filter(item => item.length > 0)
        ));
    }

    function registerFallbackDataset(countryCode, states) {
        if (!states || !states.length) return;
        const preparedStates = states.map(state => {
            const name = (state.name || '').trim();
            if (!name) return null;
            const code = sanitizeCode(state.code || name);
            const cities = cleanList(state.cities || []);
            fallbackCityMap[`${countryCode}::${code}`] = cities;
            return { code, name };
        }).filter(Boolean);

        if (preparedStates.length) {
            fallbackDatasets[countryCode] = preparedStates.sort((a, b) => a.name.localeCompare(b.name));
        }
    }

    registerFallbackDataset('PY', [
        { code: 'asuncion', name: 'Asunción (Capital District)', cities: ['Asunción'] },
        { name: 'Alto Paraguay', cities: ['Fuerte Olimpo', 'Bahía Negra', 'Carmelo Peralta', 'Puerto Casado'] },
        { name: 'Alto Paraná', cities: ['Ciudad del Este', 'Presidente Franco', 'Hernandarias', 'Minga Guazú', 'Santa Rita'] },
        { name: 'Amambay', cities: ['Pedro Juan Caballero', 'Capitán Bado', 'Bella Vista Norte', 'Zanja Pytã'] },
        { name: 'Boquerón', cities: ['Filadelfia', 'Loma Plata', 'Mariscal Estigarribia', 'Neuland'] },
        { name: 'Caaguazú', cities: ['Coronel Oviedo', 'Caaguazú', 'Repatriación', 'Juan Manuel Frutos', 'José Domingo Ocampos'] },
        { name: 'Caazapá', cities: ['Caazapá', 'San Juan Nepomuceno', 'Abaí', 'Yuty', 'Tavaí'] },
        { name: 'Canindeyú', cities: ['Salto del Guairá', 'Curuguaty', 'Katueté', 'Ybyrarobana', 'Villa Ygatimí'] },
        { name: 'Central', cities: ['San Lorenzo', 'Luque', 'Capiatá', 'Lambaré', 'Fernando de la Mora', 'Ñemby', 'Mariano Roque Alonso', 'Villa Elisa', 'Itauguá', 'Limpio'] },
        { name: 'Concepción', cities: ['Concepción', 'Horqueta', 'Loreto', 'Belén', 'Vallemí'] },
        { name: 'Cordillera', cities: ['Caacupé', 'Eusebio Ayala', 'Itacurubí de la Cordillera', 'Tobatí', 'San Bernardino'] },
        { name: 'Guairá', cities: ['Villarrica', 'Coronel Martínez', 'Borja', 'Iturbe', 'Mbocayaty'] },
        { name: 'Itapúa', cities: ['Encarnación', 'Hohenau', 'Obligado', 'Bella Vista', 'Capitán Miranda', 'Fram'] },
        { name: 'Misiones', cities: ['San Juan Bautista', 'Ayolas', 'San Ignacio', 'San Miguel', 'Villa Florida'] },
        { name: 'Ñeembucú', cities: ['Pilar', 'Humaitá', 'Paso de Patria', 'Isla Umbú', 'Desmochados'] },
        { name: 'Paraguarí', cities: ['Paraguarí', 'Carapeguá', 'Pirayú', 'Yaguarón', 'La Colmena'] },
        { name: 'Presidente Hayes', cities: ['Villa Hayes', 'Nanawa', 'Pozo Colorado', 'Teniente Irala Fernández', 'Nueva Asunción'] },
        { name: 'San Pedro', cities: ['San Pedro de Ycuamandiyú', 'Santa Rosa del Aguaray', 'Choré', 'Lima', 'Itacurubí del Rosario'] }
    ]);

    registerFallbackDataset('AD', [
        { name: 'Andorra la Vella', cities: ['Andorra la Vella', 'Santa Coloma', 'La Margineda'] },
        { name: 'Canillo', cities: ['Canillo', 'Soldeu', 'El Tarter'] },
        { name: 'Encamp', cities: ['Encamp', 'Pas de la Casa', 'Vila'] },
        { name: 'Escaldes-Engordany', cities: ['Escaldes-Engordany', 'Engolasters', 'Els Vilars'] },
        { name: 'La Massana', cities: ['La Massana', 'Arinsal', 'Anyós'] },
        { name: 'Ordino', cities: ['Ordino', 'La Cortinada', 'El Serrat'] },
        { name: 'Sant Julià de Lòria', cities: ['Sant Julià de Lòria', 'Fontaneda', 'Bixessarri'] }
    ]);

    registerFallbackDataset('VA', [
        { name: 'Vatican City', cities: ['Vatican City'] }
    ]);

    registerFallbackDataset('LI', [
        { name: 'Balzers', cities: ['Balzers'] },
        { name: 'Eschen', cities: ['Eschen'] },
        { name: 'Gamprin', cities: ['Gamprin', 'Bendern'] },
        { name: 'Mauren', cities: ['Mauren', 'Schaanwald'] },
        { name: 'Planken', cities: ['Planken'] },
        { name: 'Ruggell', cities: ['Ruggell'] },
        { name: 'Schaan', cities: ['Schaan'] },
        { name: 'Schellenberg', cities: ['Schellenberg'] },
        { name: 'Triesen', cities: ['Triesen'] },
        { name: 'Triesenberg', cities: ['Triesenberg', 'Masescha', 'Malbun'] },
        { name: 'Vaduz', cities: ['Vaduz'] }
    ]);

    registerFallbackDataset('MC', [
        { name: 'Fontvieille', cities: ['Fontvieille'] },
        { name: 'La Condamine', cities: ['La Condamine'] },
        { name: 'Monte Carlo', cities: ['Monte Carlo'] },
        { name: 'Monaco-Ville', cities: ['Monaco-Ville'] }
    ]);

    registerFallbackDataset('SM', [
        { name: 'Acquaviva', cities: ['Acquaviva'] },
        { name: 'Borgo Maggiore', cities: ['Borgo Maggiore'] },
        { name: 'Chiesanuova', cities: ['Chiesanuova'] },
        { name: 'Domagnano', cities: ['Domagnano'] },
        { name: 'Faetano', cities: ['Faetano'] },
        { name: 'Fiorentino', cities: ['Fiorentino'] },
        { name: 'Montegiardino', cities: ['Montegiardino'] },
        { name: 'San Marino', cities: ['City of San Marino'] },
        { name: 'Serravalle', cities: ['Serravalle'] }
    ]);

    registerFallbackDataset('MT', [
        { name: 'Northern Region', cities: ['Mellieħa', 'St. Paul\'s Bay', 'Mġarr'] },
        { name: 'Southern Region', cities: ['Żejtun', 'Żurrieq', 'Birżebbuġa'] },
        { name: 'Central Region', cities: ['Birkirkara', 'Qormi', 'Mosta'] },
        { name: 'South Eastern Region', cities: ['Marsaxlokk', 'Żabbar', 'Għaxaq'] },
        { name: 'Western Region', cities: ['Rabat', 'Żebbuġ', 'Siġġiewi'] },
        { name: 'Gozo Region', cities: ['Victoria', 'Xewkija', 'Xagħra'] }
    ]);

    registerFallbackDataset('LU', [
        { name: 'Diekirch District', cities: ['Diekirch', 'Ettelbruck', 'Wiltz'] },
        { name: 'Grevenmacher District', cities: ['Grevenmacher', 'Echternach', 'Remich'] },
        { name: 'Luxembourg District', cities: ['Luxembourg City', 'Esch-sur-Alzette', 'Differdange'] }
    ]);

    const supportsFetch = typeof fetch === 'function';

    async function fetchStatesFromApi(countryCode) {
        if (!supportsFetch) return [];
        const country = allowedCountries[countryCode];
        if (!country) return [];

        try {
            const response = await fetch(LOCATION_API_ENDPOINTS.states, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country: country.apiName })
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const result = await response.json();
            if (!result || result.error || !result.data || !Array.isArray(result.data.states)) {
                return [];
            }

            const uniqueStates = [];
            const seen = new Set();

            result.data.states.forEach(state => {
                const name = (state.name || state.state_code || '').toString().trim();
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
        if (!country || !stateName) return [];

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

        let states = await fetchStatesFromApi(countryCode);
        if (!states.length && fallbackDatasets[countryCode]) {
            states = fallbackDatasets[countryCode];
        }

        if (!states.length) {
            const countryLabel = allowedCountries[countryCode] ? allowedCountries[countryCode].label : 'General Region';
            states = [{ code: sanitizeCode(`${countryCode}-all`), name: `${countryLabel} - All Regions` }];
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

        let cities = await fetchCitiesFromApi(countryCode, stateCode);
        if (!cities.length && fallbackCityMap[cacheKey]) {
            cities = fallbackCityMap[cacheKey];
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
        window.comprehensiveCityDatabase = {};
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = service;
    }
})();
