// Quick Node smoke test for comprehensive-city-database
// Usage: node scripts/test-location.js PY py-central-asuncion

const path = require('path');
const svc = require(path.join('..', 'js', 'comprehensive-city-database.js'));

(async () => {
    try {
        console.log('Service loaded. Countries:', Object.keys(svc.countries).length);
        const country = process.argv[2] || 'PY';
        const states = await svc.getStates(country);
        console.log(`States for ${country}:`, states.slice(0, 10));
        if (states.length) {
            const firstState = states[0].code;
            const cities = await svc.getCities(country, firstState);
            console.log(`Cities for ${country}::${firstState}:`, cities.slice(0, 20));
        }
    } catch (err) {
        console.error('Test failed', err);
    }
})();