// Sophisticated Values Selection and Partner Preferences Components

class SophisticatedValuesSelector {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.selectedValues = [];
        this.maxSelections = 5;
        
        this.values = [
            { id: 'family', name: 'Family', icon: '👨‍👩‍👧‍👦', description: 'Prioritizing family bonds and relationships' },
            { id: 'integrity', name: 'Integrity', icon: '🛡️', description: 'Living with honesty and moral principles' },
            { id: 'commitment', name: 'Commitment', icon: '🤝', description: 'Dedication to promises and relationships' },
            { id: 'respect', name: 'Respect', icon: '🙏', description: 'Treating others with dignity and consideration' },
            { id: 'honesty', name: 'Honesty', icon: '💎', description: 'Truthfulness in all interactions' },
            { id: 'loyalty', name: 'Loyalty', icon: '🔒', description: 'Faithfulness and steadfast support' },
            { id: 'compassion', name: 'Compassion', icon: '❤️', description: 'Empathy and care for others' },
            { id: 'wisdom', name: 'Wisdom', icon: '🦉', description: 'Sound judgment and deep understanding' },
            { id: 'courage', name: 'Courage', icon: '🦁', description: 'Bravery in facing challenges' },
            { id: 'humility', name: 'Humility', icon: '🌱', description: 'Modesty and openness to learning' },
            { id: 'generosity', name: 'Generosity', icon: '🎁', description: 'Giving freely of time, resources, and love' },
            { id: 'service', name: 'Service', icon: '🤲', description: 'Helping others and contributing to community' },
            { id: 'growth', name: 'Personal Growth', icon: '🌟', description: 'Continuous self-improvement and learning' },
            { id: 'balance', name: 'Life Balance', icon: '⚖️', description: 'Harmony between work, relationships, and self' },
            { id: 'adventure', name: 'Adventure', icon: '🗺️', description: 'Embracing new experiences and challenges' },
            { id: 'creativity', name: 'Creativity', icon: '🎨', description: 'Expressing imagination and innovation' }
        ];
        
        this.createValuesSelector();
    }

    createValuesSelector() {
        const container = document.createElement('div');
        container.className = 'sophisticated-values-selector';
        
        // Create header
        const header = document.createElement('div');
        header.className = 'values-header';
        header.innerHTML = `
            <h3>Core Values Selection</h3>
            <p>Choose up to ${this.maxSelections} values that best represent what matters most to you</p>
            <div class="selection-counter">
                <span class="selected-count">0</span> / ${this.maxSelections} selected
            </div>
        `;
        
        // Create values grid
        const valuesGrid = document.createElement('div');
        valuesGrid.className = 'values-grid';
        
        this.values.forEach(value => {
            const valueCard = document.createElement('div');
            valueCard.className = 'value-card';
            valueCard.dataset.valueId = value.id;
            
            valueCard.innerHTML = `
                <div class="value-icon">${value.icon}</div>
                <div class="value-name">${value.name}</div>
                <div class="value-description">${value.description}</div>
                <div class="selection-indicator">
                    <div class="checkmark">✓</div>
                </div>
            `;
            
            valueCard.addEventListener('click', () => {
                this.toggleValue(value.id, valueCard);
            });
            
            valuesGrid.appendChild(valueCard);
        });
        
        container.appendChild(header);
        container.appendChild(valuesGrid);
        
        // Replace original container
        this.container.parentNode.replaceChild(container, this.container);
        
        // Create hidden inputs for form submission
        const hiddenContainer = document.createElement('div');
        hiddenContainer.className = 'hidden-values-inputs';
        hiddenContainer.style.display = 'none';
        container.appendChild(hiddenContainer);
        
        this.container = container;
        this.updateCounter();
    }

    toggleValue(valueId, cardElement) {
        const index = this.selectedValues.indexOf(valueId);
        
        if (index > -1) {
            // Remove value
            this.selectedValues.splice(index, 1);
            cardElement.classList.remove('selected');
        } else {
            // Add value if under limit
            if (this.selectedValues.length < this.maxSelections) {
                this.selectedValues.push(valueId);
                cardElement.classList.add('selected');
            } else {
                // Show limit message
                this.showLimitMessage();
                return;
            }
        }
        
        this.updateCounter();
        this.updateHiddenInputs();
    }

    updateCounter() {
        const counter = this.container.querySelector('.selected-count');
        counter.textContent = this.selectedValues.length;
        
        const header = this.container.querySelector('.values-header');
        if (this.selectedValues.length === this.maxSelections) {
            header.classList.add('limit-reached');
        } else {
            header.classList.remove('limit-reached');
        }
    }

    updateHiddenInputs() {
        const hiddenContainer = this.container.querySelector('.hidden-values-inputs');
        hiddenContainer.innerHTML = '';
        
        this.selectedValues.forEach(valueId => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'values[]';
            input.value = valueId;
            hiddenContainer.appendChild(input);
        });
    }

    showLimitMessage() {
        const existingMessage = this.container.querySelector('.limit-message');
        if (existingMessage) return;
        
        const message = document.createElement('div');
        message.className = 'limit-message';
        message.textContent = `You can select up to ${this.maxSelections} values. Please deselect one to choose another.`;
        
        const header = this.container.querySelector('.values-header');
        header.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
}

class SophisticatedPartnerPreferences {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.createPartnerPreferences();
    }

    createPartnerPreferences() {
        const container = document.createElement('div');
        container.className = 'sophisticated-partner-preferences';
        
        // Location preferences with smart suggestions
        const locationSection = this.createLocationPreferences();
        container.appendChild(locationSection);
        
        // Age range with interactive slider
        const ageSection = this.createAgeRangeSelector();
        container.appendChild(ageSection);
        
        // Lifestyle compatibility
        const lifestyleSection = this.createLifestylePreferences();
        container.appendChild(lifestyleSection);
        
        this.container.parentNode.replaceChild(container, this.container);
        this.container = container;
    }

    createLocationPreferences() {
        const section = document.createElement('div');
        section.className = 'preference-section location-preferences';
        
        section.innerHTML = `
            <h3>Geographic Preferences</h3>
            <p>Where would you like to find your ideal partner?</p>
            
            <div class="location-options">
                <div class="location-option" data-value="local">
                    <div class="option-icon">🏠</div>
                    <div class="option-content">
                        <div class="option-title">Local Connection</div>
                        <div class="option-description">Within 50 miles of your location</div>
                    </div>
                </div>
                
                <div class="location-option" data-value="national">
                    <div class="option-icon">🗺️</div>
                    <div class="option-content">
                        <div class="option-title">National Search</div>
                        <div class="option-description">Anywhere in your country</div>
                    </div>
                </div>
                
                <div class="location-option" data-value="continental">
                    <div class="option-icon">🌍</div>
                    <div class="option-content">
                        <div class="option-title">Continental Match</div>
                        <div class="option-description">Within your continent</div>
                    </div>
                </div>
                
                <div class="location-option" data-value="global">
                    <div class="option-icon">✈️</div>
                    <div class="option-content">
                        <div class="option-title">Global Connection</div>
                        <div class="option-description">Open to worldwide matches</div>
                    </div>
                </div>
            </div>
            
            <div class="relocation-preference">
                <label class="preference-label">Willingness to Relocate</label>
                <div class="relocation-options">
                    <label class="radio-option">
                        <input type="radio" name="relocation" value="yes-anywhere">
                        <span class="radio-custom"></span>
                        <span class="radio-text">Yes, anywhere for love</span>
                    </label>
                    <label class="radio-option">
                        <input type="radio" name="relocation" value="yes-limited">
                        <span class="radio-custom"></span>
                        <span class="radio-text">Yes, with some limitations</span>
                    </label>
                    <label class="radio-option">
                        <input type="radio" name="relocation" value="no">
                        <span class="radio-custom"></span>
                        <span class="radio-text">Prefer partner relocates to me</span>
                    </label>
                </div>
            </div>
        `;
        
        // Add click handlers for location options
        const locationOptions = section.querySelectorAll('.location-option');
        locationOptions.forEach(option => {
            option.addEventListener('click', () => {
                locationOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                
                // Create hidden input
                let hiddenInput = section.querySelector('input[name="partner-location"]');
                if (!hiddenInput) {
                    hiddenInput = document.createElement('input');
                    hiddenInput.type = 'hidden';
                    hiddenInput.name = 'partner-location';
                    section.appendChild(hiddenInput);
                }
                hiddenInput.value = option.dataset.value;
            });
        });
        
        return section;
    }

    createAgeRangeSelector() {
        const section = document.createElement('div');
        section.className = 'preference-section age-range-selector';
        
        section.innerHTML = `
            <h3>Age Preferences</h3>
            <p>Select your preferred age range for a partner</p>
            
            <div class="age-range-container">
                <div class="age-inputs">
                    <div class="age-input-group">
                        <label>Minimum Age</label>
                        <input type="number" id="min-age" min="18" max="80" value="25" class="age-input">
                    </div>
                    <div class="age-range-display">
                        <span class="age-range-text">25 - 35 years</span>
                    </div>
                    <div class="age-input-group">
                        <label>Maximum Age</label>
                        <input type="number" id="max-age" min="18" max="80" value="35" class="age-input">
                    </div>
                </div>
                
                <div class="age-slider-container">
                    <input type="range" id="min-age-slider" min="18" max="80" value="25" class="age-slider">
                    <input type="range" id="max-age-slider" min="18" max="80" value="35" class="age-slider">
                </div>
            </div>
        `;
        
        // Add interactive functionality
        const minAgeInput = section.querySelector('#min-age');
        const maxAgeInput = section.querySelector('#max-age');
        const minAgeSlider = section.querySelector('#min-age-slider');
        const maxAgeSlider = section.querySelector('#max-age-slider');
        const rangeDisplay = section.querySelector('.age-range-text');
        
        const updateAgeRange = () => {
            const minAge = parseInt(minAgeInput.value);
            const maxAge = parseInt(maxAgeInput.value);
            
            // Ensure min is not greater than max
            if (minAge >= maxAge) {
                if (minAgeInput === document.activeElement) {
                    maxAgeInput.value = minAge + 1;
                    maxAgeSlider.value = minAge + 1;
                } else {
                    minAgeInput.value = maxAge - 1;
                    minAgeSlider.value = maxAge - 1;
                }
            }
            
            rangeDisplay.textContent = `${minAgeInput.value} - ${maxAgeInput.value} years`;
        };
        
        [minAgeInput, maxAgeInput, minAgeSlider, maxAgeSlider].forEach(element => {
            element.addEventListener('input', (e) => {
                if (e.target.type === 'range') {
                    if (e.target.id.includes('min')) {
                        minAgeInput.value = e.target.value;
                    } else {
                        maxAgeInput.value = e.target.value;
                    }
                } else {
                    if (e.target.id.includes('min')) {
                        minAgeSlider.value = e.target.value;
                    } else {
                        maxAgeSlider.value = e.target.value;
                    }
                }
                updateAgeRange();
            });
        });
        
        return section;
    }

    createLifestylePreferences() {
        const section = document.createElement('div');
        section.className = 'preference-section lifestyle-preferences';
        
        section.innerHTML = `
            <h3>Lifestyle Compatibility</h3>
            <p>What lifestyle factors are important to you in a partner?</p>
            
            <div class="lifestyle-grid">
                <div class="lifestyle-category">
                    <h4>Family Planning</h4>
                    <div class="lifestyle-options">
                        <label class="lifestyle-option">
                            <input type="checkbox" name="lifestyle[]" value="wants-children">
                            <span class="option-icon">👶</span>
                            <span class="option-text">Wants children</span>
                        </label>
                        <label class="lifestyle-option">
                            <input type="checkbox" name="lifestyle[]" value="has-children">
                            <span class="option-icon">👨‍👩‍👧‍👦</span>
                            <span class="option-text">Has children</span>
                        </label>
                        <label class="lifestyle-option">
                            <input type="checkbox" name="lifestyle[]" value="family-oriented">
                            <span class="option-icon">🏡</span>
                            <span class="option-text">Family-oriented</span>
                        </label>
                    </div>
                </div>
                
                <div class="lifestyle-category">
                    <h4>Career & Ambition</h4>
                    <div class="lifestyle-options">
                        <label class="lifestyle-option">
                            <input type="checkbox" name="lifestyle[]" value="career-focused">
                            <span class="option-icon">💼</span>
                            <span class="option-text">Career-focused</span>
                        </label>
                        <label class="lifestyle-option">
                            <input type="checkbox" name="lifestyle[]" value="entrepreneur">
                            <span class="option-icon">🚀</span>
                            <span class="option-text">Entrepreneurial</span>
                        </label>
                        <label class="lifestyle-option">
                            <input type="checkbox" name="lifestyle[]" value="work-life-balance">
                            <span class="option-icon">⚖️</span>
                            <span class="option-text">Values work-life balance</span>
                        </label>
                    </div>
                </div>
                
                <div class="lifestyle-category">
                    <h4>Interests & Hobbies</h4>
                    <div class="lifestyle-options">
                        <label class="lifestyle-option">
                            <input type="checkbox" name="lifestyle[]" value="active-lifestyle">
                            <span class="option-icon">🏃‍♂️</span>
                            <span class="option-text">Active lifestyle</span>
                        </label>
                        <label class="lifestyle-option">
                            <input type="checkbox" name="lifestyle[]" value="travel-lover">
                            <span class="option-icon">✈️</span>
                            <span class="option-text">Loves to travel</span>
                        </label>
                        <label class="lifestyle-option">
                            <input type="checkbox" name="lifestyle[]" value="cultural-interests">
                            <span class="option-icon">🎭</span>
                            <span class="option-text">Cultural interests</span>
                        </label>
                    </div>
                </div>
            </div>
        `;
        
        return section;
    }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize values selector if container exists
    const valuesContainer = document.querySelector('.value-tags');
    if (valuesContainer) {
        new SophisticatedValuesSelector('.value-tags');
    }

    // Initialize partner preferences if container exists
    const preferencesContainer = document.querySelector('#partner-location');
    if (preferencesContainer && preferencesContainer.parentNode) {
        new SophisticatedPartnerPreferences('#partner-location');
    }
});
