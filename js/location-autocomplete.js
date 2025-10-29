/**
 * Location Autocomplete
 * Google Maps/Uber-style single field for location input
 */

(function() {
    'use strict';
    
    // Sample location database (simplified for demo)
    // In production, this would be a comprehensive database or API
    const LOCATIONS = [
        // Paraguay
        { city: 'Asunción', state: 'Asunción', country: 'Paraguay' },
        { city: 'Ciudad del Este', state: 'Alto Paraná', country: 'Paraguay' },
        { city: 'Encarnación', state: 'Itapúa', country: 'Paraguay' },
        
        // Brazil
        { city: 'São Paulo', state: 'São Paulo', country: 'Brazil' },
        { city: 'Rio de Janeiro', state: 'Rio de Janeiro', country: 'Brazil' },
        { city: 'Brasília', state: 'Distrito Federal', country: 'Brazil' },
        { city: 'Salvador', state: 'Bahia', country: 'Brazil' },
        { city: 'Fortaleza', state: 'Ceará', country: 'Brazil' },
        { city: 'Belo Horizonte', state: 'Minas Gerais', country: 'Brazil' },
        { city: 'Curitiba', state: 'Paraná', country: 'Brazil' },
        { city: 'Manaus', state: 'Amazonas', country: 'Brazil' },
        { city: 'Recife', state: 'Pernambuco', country: 'Brazil' },
        { city: 'Porto Alegre', state: 'Rio Grande do Sul', country: 'Brazil' },
        
        // Argentina
        { city: 'Buenos Aires', state: 'Buenos Aires', country: 'Argentina' },
        { city: 'Córdoba', state: 'Córdoba', country: 'Argentina' },
        { city: 'Rosario', state: 'Santa Fe', country: 'Argentina' },
        { city: 'Mendoza', state: 'Mendoza', country: 'Argentina' },
        
        // USA
        { city: 'New York', state: 'New York', country: 'United States' },
        { city: 'Los Angeles', state: 'California', country: 'United States' },
        { city: 'Chicago', state: 'Illinois', country: 'United States' },
        { city: 'Houston', state: 'Texas', country: 'United States' },
        { city: 'Miami', state: 'Florida', country: 'United States' },
        { city: 'San Francisco', state: 'California', country: 'United States' },
        { city: 'Boston', state: 'Massachusetts', country: 'United States' },
        { city: 'Seattle', state: 'Washington', country: 'United States' },
        
        // UK
        { city: 'London', state: 'England', country: 'United Kingdom' },
        { city: 'Manchester', state: 'England', country: 'United Kingdom' },
        { city: 'Birmingham', state: 'England', country: 'United Kingdom' },
        { city: 'Edinburgh', state: 'Scotland', country: 'United Kingdom' },
        
        // Italy
        { city: 'Rome', state: 'Lazio', country: 'Italy' },
        { city: 'Milan', state: 'Lombardy', country: 'Italy' },
        { city: 'Florence', state: 'Tuscany', country: 'Italy' },
        { city: 'Venice', state: 'Veneto', country: 'Italy' },
        
        // Spain
        { city: 'Madrid', state: 'Madrid', country: 'Spain' },
        { city: 'Barcelona', state: 'Catalonia', country: 'Spain' },
        { city: 'Valencia', state: 'Valencia', country: 'Spain' },
        { city: 'Seville', state: 'Andalusia', country: 'Spain' },
        
        // France
        { city: 'Paris', state: 'Île-de-France', country: 'France' },
        { city: 'Lyon', state: 'Auvergne-Rhône-Alpes', country: 'France' },
        { city: 'Marseille', state: 'Provence-Alpes-Côte d\'Azur', country: 'France' },
        { city: 'Nice', state: 'Provence-Alpes-Côte d\'Azur', country: 'France' },
        
        // Germany
        { city: 'Berlin', state: 'Berlin', country: 'Germany' },
        { city: 'Munich', state: 'Bavaria', country: 'Germany' },
        { city: 'Frankfurt', state: 'Hesse', country: 'Germany' },
        { city: 'Hamburg', state: 'Hamburg', country: 'Germany' },
        
        // Add more locations as needed...
    ];
    
    class LocationAutocomplete {
        constructor() {
            this.input = document.getElementById('location');
            this.suggestionsContainer = document.getElementById('location-suggestions');
            this.hiddenCountry = document.getElementById('country');
            this.hiddenState = document.getElementById('state');
            this.hiddenCity = document.getElementById('city');
            
            this.selectedLocation = null;
            this.currentFocus = -1;
            
            if (!this.input) return;
            
            this.init();
        }
        
        init() {
            // Input event listener
            this.input.addEventListener('input', () => this.handleInput());
            
            // Keyboard navigation
            this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
            
            // Click outside to close
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.location-autocomplete-container')) {
                    this.hideSuggestions();
                }
            });
            
            // Clear selection on manual edit
            this.input.addEventListener('input', () => {
                if (this.selectedLocation) {
                    this.input.classList.remove('has-selection');
                    this.selectedLocation = null;
                    this.clearHiddenFields();
                }
            });
        }
        
        handleInput() {
            const query = this.input.value.trim();
            
            if (query.length < 2) {
                this.hideSuggestions();
                return;
            }
            
            const results = this.search(query);
            this.showSuggestions(results);
        }
        
        search(query) {
            const lowerQuery = query.toLowerCase();
            
            return LOCATIONS.filter(location => {
                const cityMatch = location.city.toLowerCase().includes(lowerQuery);
                const countryMatch = location.country.toLowerCase().includes(lowerQuery);
                const stateMatch = location.state.toLowerCase().includes(lowerQuery);
                
                return cityMatch || countryMatch || stateMatch;
            }).slice(0, 10); // Limit to 10 results
        }
        
        showSuggestions(results) {
            this.currentFocus = -1;
            
            if (results.length === 0) {
                this.suggestionsContainer.innerHTML = `
                    <div class="location-suggestions-empty">
                        No locations found. Try a different search.
                    </div>
                `;
                this.suggestionsContainer.style.display = 'block';
                return;
            }
            
            this.suggestionsContainer.innerHTML = results.map((location, index) => `
                <div class="location-suggestion-item" data-index="${index}">
                    <div class="location-suggestion-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="location-suggestion-text">
                        <div class="location-suggestion-city">${location.city}</div>
                        <div class="location-suggestion-country">${location.state}, ${location.country}</div>
                    </div>
                </div>
            `).join('');
            
            // Add click listeners
            this.suggestionsContainer.querySelectorAll('.location-suggestion-item').forEach((item, index) => {
                item.addEventListener('click', () => this.selectLocation(results[index]));
            });
            
            this.suggestionsContainer.style.display = 'block';
        }
        
        hideSuggestions() {
            this.suggestionsContainer.style.display = 'none';
            this.currentFocus = -1;
        }
        
        selectLocation(location) {
            this.selectedLocation = location;
            
            // Update input
            this.input.value = `${location.city}, ${location.country}`;
            this.input.classList.add('has-selection');
            
            // Update hidden fields
            this.hiddenCity.value = location.city;
            this.hiddenState.value = location.state;
            this.hiddenCountry.value = location.country;
            
            // Hide suggestions
            this.hideSuggestions();
            
            console.log('Location selected:', location);
        }
        
        clearHiddenFields() {
            this.hiddenCity.value = '';
            this.hiddenState.value = '';
            this.hiddenCountry.value = '';
        }
        
        handleKeyDown(e) {
            const items = this.suggestionsContainer.querySelectorAll('.location-suggestion-item');
            
            if (items.length === 0) return;
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.currentFocus++;
                if (this.currentFocus >= items.length) this.currentFocus = 0;
                this.setActive(items);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.currentFocus--;
                if (this.currentFocus < 0) this.currentFocus = items.length - 1;
                this.setActive(items);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (this.currentFocus > -1 && items[this.currentFocus]) {
                    items[this.currentFocus].click();
                }
            } else if (e.key === 'Escape') {
                this.hideSuggestions();
            }
        }
        
        setActive(items) {
            items.forEach((item, index) => {
                if (index === this.currentFocus) {
                    item.classList.add('active');
                    item.scrollIntoView({ block: 'nearest' });
                } else {
                    item.classList.remove('active');
                }
            });
        }
        
        getSelectedLocation() {
            return this.selectedLocation;
        }
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.locationAutocomplete = new LocationAutocomplete();
        });
    } else {
        window.locationAutocomplete = new LocationAutocomplete();
    }
    
})();
