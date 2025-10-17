/**
 * Smart Country Selector with Expansion Modal
 * Paraguay + Europe focus with intelligent expansion capture
 */

// Paraguay + All European Countries
const COUNTRIES = [
    { value: 'PY', label: '🇵🇾 Paraguay', region: 'paraguay' },
    { value: 'divider1', label: '──────────── Europe ────────────', disabled: true },
    { value: 'AT', label: '🇦🇹 Austria', region: 'europe' },
    { value: 'BE', label: '🇧🇪 Belgium', region: 'europe' },
    { value: 'BG', label: '🇧🇬 Bulgaria', region: 'europe' },
    { value: 'HR', label: '🇭🇷 Croatia', region: 'europe' },
    { value: 'CY', label: '🇨🇾 Cyprus', region: 'europe' },
    { value: 'CZ', label: '🇨🇿 Czech Republic', region: 'europe' },
    { value: 'DK', label: '🇩🇰 Denmark', region: 'europe' },
    { value: 'EE', label: '🇪🇪 Estonia', region: 'europe' },
    { value: 'FI', label: '🇫🇮 Finland', region: 'europe' },
    { value: 'FR', label: '🇫🇷 France', region: 'europe' },
    { value: 'DE', label: '🇩🇪 Germany', region: 'europe' },
    { value: 'GR', label: '🇬🇷 Greece', region: 'europe' },
    { value: 'HU', label: '🇭🇺 Hungary', region: 'europe' },
    { value: 'IS', label: '🇮🇸 Iceland', region: 'europe' },
    { value: 'IE', label: '🇮🇪 Ireland', region: 'europe' },
    { value: 'IT', label: '🇮🇹 Italy', region: 'europe' },
    { value: 'LV', label: '🇱🇻 Latvia', region: 'europe' },
    { value: 'LI', label: '🇱🇮 Liechtenstein', region: 'europe' },
    { value: 'LT', label: '🇱🇹 Lithuania', region: 'europe' },
    { value: 'LU', label: '🇱🇺 Luxembourg', region: 'europe' },
    { value: 'MT', label: '🇲🇹 Malta', region: 'europe' },
    { value: 'MD', label: '🇲🇩 Moldova', region: 'europe' },
    { value: 'MC', label: '🇲🇨 Monaco', region: 'europe' },
    { value: 'ME', label: '🇲🇪 Montenegro', region: 'europe' },
    { value: 'NL', label: '🇳🇱 Netherlands', region: 'europe' },
    { value: 'MK', label: '🇲🇰 North Macedonia', region: 'europe' },
    { value: 'NO', label: '🇳🇴 Norway', region: 'europe' },
    { value: 'PL', label: '🇵🇱 Poland', region: 'europe' },
    { value: 'PT', label: '🇵🇹 Portugal', region: 'europe' },
    { value: 'RO', label: '🇷🇴 Romania', region: 'europe' },
    { value: 'RU', label: '🇷🇺 Russia', region: 'europe' },
    { value: 'SM', label: '🇸🇲 San Marino', region: 'europe' },
    { value: 'RS', label: '🇷🇸 Serbia', region: 'europe' },
    { value: 'SK', label: '🇸🇰 Slovakia', region: 'europe' },
    { value: 'SI', label: '🇸🇮 Slovenia', region: 'europe' },
    { value: 'ES', label: '🇪🇸 Spain', region: 'europe' },
    { value: 'SE', label: '🇸🇪 Sweden', region: 'europe' },
    { value: 'CH', label: '🇨🇭 Switzerland', region: 'europe' },
    { value: 'UA', label: '🇺🇦 Ukraine', region: 'europe' },
    { value: 'GB', label: '🇬🇧 United Kingdom', region: 'europe' },
    { value: 'VA', label: '🇻🇦 Vatican City', region: 'europe' },
    { value: 'divider2', label: '──────────────────────────────', disabled: true },
    { value: 'OTHER', label: '🌍 My country isn\'t listed yet', region: 'other' }
];

// Expansion regions
const EXPANSION_REGIONS = [
    { value: 'americas', label: 'Americas', icon: '🌎', examples: 'USA, Canada, Brazil, Argentina, Chile...' },
    { value: 'asia', label: 'Asia', icon: '🌏', examples: 'Japan, Singapore, South Korea, India...' },
    { value: 'middle_east', label: 'Middle East', icon: '🕌', examples: 'UAE, Israel, Saudi Arabia, Qatar...' },
    { value: 'oceania', label: 'Oceania', icon: '🦘', examples: 'Australia, New Zealand, Fiji...' },
    { value: 'africa', label: 'Africa', icon: '🦁', examples: 'South Africa, Kenya, Egypt, Morocco...' }
];

class SmartCountrySelector {
    constructor() {
        this.countrySelect = document.getElementById('country');
        this.expansionData = {
            region: null,
            country: null,
            email: null
        };
        
        this.init();
    }
    
    init() {
        this.populateCountries();
        this.createExpansionModal();
        this.attachEventListeners();
    }
    
    populateCountries() {
        // Clear existing options except the first one
        while (this.countrySelect.options.length > 1) {
            this.countrySelect.remove(1);
        }
        
        // Add all countries
        COUNTRIES.forEach(country => {
            const option = document.createElement('option');
            option.value = country.value;
            option.textContent = country.label;
            if (country.disabled) {
                option.disabled = true;
                option.style.fontWeight = 'bold';
                option.style.color = '#718096';
                option.style.textAlign = 'center';
            }
            this.countrySelect.appendChild(option);
        });
    }
    
    createExpansionModal() {
        const modalHTML = `
            <div id="expansionModal" class="expansion-modal-overlay">
                <div class="expansion-modal">
                    <div class="expansion-modal-header">
                        <div class="expansion-modal-icon">🌍</div>
                        <h2 class="expansion-modal-title">Help Us Expand</h2>
                        <p class="expansion-modal-subtitle">
                            Your interest helps us prioritize global expansion
                        </p>
                    </div>
                    
                    <div class="expansion-modal-body" id="expansionForm">
                        <div class="expansion-intro">
                            <p>
                                Tessera Amoris currently focuses on <strong>Paraguay-Europe connections</strong> 
                                as we perfect our matchmaking process. However, we're planning strategic 
                                expansion based on community demand.
                            </p>
                        </div>
                        
                        <div class="expansion-form-group">
                            <label class="expansion-form-label">Which region are you from?</label>
                            <div class="expansion-region-options" id="regionOptions">
                                ${EXPANSION_REGIONS.map(region => `
                                    <div class="expansion-region-option">
                                        <input type="radio" 
                                               id="region-${region.value}" 
                                               name="expansion-region" 
                                               value="${region.value}">
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
                            <label for="expansionCountry" class="expansion-form-label">
                                Your specific country
                            </label>
                            <input type="text" 
                                   id="expansionCountry" 
                                   class="expansion-input" 
                                   placeholder="e.g., United States, Brazil, Australia...">
                        </div>
                        
                        <div class="expansion-form-group">
                            <label for="expansionEmail" class="expansion-form-label">
                                Email (optional)
                            </label>
                            <input type="email" 
                                   id="expansionEmail" 
                                   class="expansion-input" 
                                   placeholder="your@email.com">
                            <div class="expansion-input-hint">
                                <i class="fas fa-bell"></i>
                                We'll notify you when we launch in your region
                            </div>
                        </div>
                    </div>
                    
                    <div class="expansion-success-message" id="expansionSuccess">
                        <div class="expansion-success-icon">✓</div>
                        <h3 class="expansion-success-title">Thank You!</h3>
                        <p class="expansion-success-text">
                            Your interest has been recorded. We'll prioritize regions with the most 
                            demand and notify you when we expand to your area.
                        </p>
                        <button class="expansion-btn expansion-btn-primary" id="successContinue">
                            Continue Application
                        </button>
                    </div>
                    
                    <div class="expansion-modal-footer" id="expansionFooter">
                        <button class="expansion-btn expansion-btn-secondary" id="continueAnyway">
                            Continue Anyway
                        </button>
                        <button class="expansion-btn expansion-btn-primary" id="submitInterest">
                            Submit Interest
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    attachEventListeners() {
        // Country select change
        this.countrySelect.addEventListener('change', (e) => {
            if (e.target.value === 'OTHER') {
                this.showExpansionModal();
            }
        });
        
        // Modal buttons
        document.getElementById('continueAnyway').addEventListener('click', () => {
            this.closeModal();
            // Reset to empty selection
            this.countrySelect.value = '';
        });
        
        document.getElementById('submitInterest').addEventListener('click', () => {
            this.submitExpansionInterest();
        });
        
        document.getElementById('successContinue').addEventListener('click', () => {
            this.closeModal();
            this.countrySelect.value = '';
        });
        
        // Close on overlay click
        document.getElementById('expansionModal').addEventListener('click', (e) => {
            if (e.target.id === 'expansionModal') {
                this.closeModal();
                this.countrySelect.value = '';
            }
        });
    }
    
    showExpansionModal() {
        const modal = document.getElementById('expansionModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        const modal = document.getElementById('expansionModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form
        document.getElementById('expansionForm').style.display = 'block';
        document.getElementById('expansionFooter').style.display = 'flex';
        document.getElementById('expansionSuccess').classList.remove('active');
        document.querySelectorAll('input[name="expansion-region"]').forEach(input => input.checked = false);
        document.getElementById('expansionCountry').value = '';
        document.getElementById('expansionEmail').value = '';
    }
    
    async submitExpansionInterest() {
        const region = document.querySelector('input[name="expansion-region"]:checked')?.value;
        const country = document.getElementById('expansionCountry').value.trim();
        const email = document.getElementById('expansionEmail').value.trim();
        
        if (!region || !country) {
            alert('Please select a region and specify your country.');
            return;
        }
        
        this.expansionData = { region, country, email };
        
        // Save to database via API
        try {
            // Try API first
            const response = await fetch('/api/submit-expansion-interest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.expansionData)
            });
            
            if (!response.ok) {
                throw new Error('API request failed');
            }
            
            console.log('Expansion interest saved:', this.expansionData);
            
            // Also save to localStorage as backup
            const existingData = JSON.parse(localStorage.getItem('expansionInterests') || '[]');
            existingData.push({
                ...this.expansionData,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('expansionInterests', JSON.stringify(existingData));
            
            // Show success message
            document.getElementById('expansionForm').style.display = 'none';
            document.getElementById('expansionFooter').style.display = 'none';
            document.getElementById('expansionSuccess').classList.add('active');
            
        } catch (error) {
            console.error('Error saving expansion interest:', error);
            alert('There was an error saving your interest. Please try again.');
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SmartCountrySelector();
});

