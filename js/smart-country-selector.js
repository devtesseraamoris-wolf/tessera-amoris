/**
 * Smart Country Selector with Expansion Modal
 * Paraguay + Complete European Country Coverage (UN Members + Kosovo)
 * With warm, professional messaging
 */

// Paraguay + Complete European Country Coverage (UN Members + Kosovo)
const COUNTRIES = [
    { value: 'PY', label: '🇵🇾 Paraguay', region: 'paraguay' },
    { value: 'divider1', label: '─────────────── Europe ───────────────', disabled: true, style: 'divider' },
    { value: 'AL', label: '🇦🇱 Albania', region: 'europe' },
    { value: 'AD', label: '🇦🇩 Andorra', region: 'europe' },
    { value: 'AM', label: '🇦🇲 Armenia', region: 'europe' },
    { value: 'AT', label: '🇦🇹 Austria', region: 'europe' },
    { value: 'AZ', label: '🇦🇿 Azerbaijan', region: 'europe' },
    { value: 'BY', label: '🇧🇾 Belarus', region: 'europe' },
    { value: 'BE', label: '🇧🇪 Belgium', region: 'europe' },
    { value: 'BA', label: '🇧🇦 Bosnia and Herzegovina', region: 'europe' },
    { value: 'BG', label: '🇧🇬 Bulgaria', region: 'europe' },
    { value: 'HR', label: '🇭🇷 Croatia', region: 'europe' },
    { value: 'CY', label: '🇨🇾 Cyprus', region: 'europe' },
    { value: 'CZ', label: '🇨🇿 Czech Republic', region: 'europe' },
    { value: 'DK', label: '🇩🇰 Denmark', region: 'europe' },
    { value: 'EE', label: '🇪🇪 Estonia', region: 'europe' },
    { value: 'FI', label: '🇫🇮 Finland', region: 'europe' },
    { value: 'FR', label: '🇫🇷 France', region: 'europe' },
    { value: 'DE', label: '🇩🇪 Germany', region: 'europe' },
    { value: 'GE', label: '🇬🇪 Georgia', region: 'europe' },
    { value: 'GR', label: '🇬🇷 Greece', region: 'europe' },
    { value: 'VA', label: '🇻🇦 Holy See (Vatican City)', region: 'europe' },
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
    { value: 'XK', label: '🇽🇰 Kosovo', region: 'europe' },
    { value: 'TR', label: '🇹🇷 Türkiye', region: 'europe' },
    { value: 'SK', label: '🇸🇰 Slovakia', region: 'europe' },
    { value: 'SI', label: '🇸🇮 Slovenia', region: 'europe' },
    { value: 'ES', label: '🇪🇸 Spain', region: 'europe' },
    { value: 'SE', label: '🇸🇪 Sweden', region: 'europe' },
    { value: 'CH', label: '🇨🇭 Switzerland', region: 'europe' },
    { value: 'UA', label: '🇺🇦 Ukraine', region: 'europe' },
    { value: 'GB', label: '🇬🇧 United Kingdom', region: 'europe' },
    { value: 'divider2', label: '───────────────────────────────────', disabled: true, style: 'divider' },
    { value: 'OTHER', label: 'My country is not listed', region: 'other', style: 'special' }
];

// Expansion regions (NO PARAGUAY - only for countries NOT in the list)
const EXPANSION_REGIONS = [
    { value: 'americas', label: 'Americas', icon: '🌎', examples: 'USA, Canada, Brazil, Argentina, Chile, Mexico...' },
    { value: 'asia', label: 'Asia', icon: '🌏', examples: 'Japan, Singapore, South Korea, India, China...' },
    { value: 'middle_east', label: 'Middle East', icon: '🕌', examples: 'UAE, Israel, Saudi Arabia, Qatar, Bahrain...' },
    { value: 'oceania', label: 'Oceania', icon: '🦘', examples: 'Australia, New Zealand, Fiji, Papua New Guinea...' },
    { value: 'africa', label: 'Africa', icon: '🦁', examples: 'South Africa, Kenya, Egypt, Morocco, Nigeria...' }
];

class SmartCountrySelector {
    constructor() {
        this.countrySelect = document.getElementById('country');
        this.expansionData = {
            region: null,
            country: null,
            email: null
        };

        if (this.countrySelect) {
            this.countrySelect.dataset.smartSelector = 'true';
        }

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
        
        // Add all countries with improved styling
        COUNTRIES.forEach(country => {
            const option = document.createElement('option');
            option.value = country.value;
            option.textContent = country.label;
            
            if (country.disabled) {
                option.disabled = true;
                option.style.fontWeight = '600';
                option.style.color = '#D4AF37';
                option.style.textAlign = 'center';
                option.style.backgroundColor = '#f7fafc';
                option.style.fontSize = '0.85rem';
                option.style.letterSpacing = '1px';
            } else if (country.style === 'special') {
                option.style.fontWeight = '500';
                option.style.color = '#4299e1';
                option.style.fontStyle = 'italic';
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
                        <h2 class="expansion-modal-title">We're Growing Globally</h2>
                        <p class="expansion-modal-subtitle">
                            Help shape our expansion roadmap
                        </p>
                    </div>
                    
                    <div class="expansion-modal-body" id="expansionForm">
                        <div class="expansion-intro">
                            <p>
                                We're thrilled by your interest in Tessera Amoris! Currently, we're 
                                focused on creating exceptional matches between <strong>Paraguay and Europe</strong> 
                                as we refine our process and build our community.
                            </p>
                            <p style="margin-top: 16px;">
                                <strong>Your input matters:</strong> By sharing where you're from, you help us 
                                prioritize which regions to launch next. We'll keep you informed as we expand 
                                and would love to welcome you when we reach your area.
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
                                Stay in touch (optional)
                            </label>
                            <input type="email" 
                                   id="expansionEmail" 
                                   class="expansion-input" 
                                   placeholder="your@email.com">
                            <div class="expansion-input-hint">
                                <i class="fas fa-bell"></i>
                                Be the first to know when we launch in your region
                            </div>
                        </div>
                    </div>
                    
                    <div class="expansion-success-message" id="expansionSuccess">
                        <div class="expansion-success-icon">✨</div>
                        <h3 class="expansion-success-title">Thank You for Your Interest!</h3>
                        <p class="expansion-success-text">
                            We've recorded your interest and will prioritize regions based on demand. 
                            You're helping us build something truly special.
                        </p>
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
                            <i class="fas fa-info-circle"></i>
                            We're currently focused on Paraguay-Europe connections. We'll reach out 
                            when we're ready to expand to your region—typically within 6-12 months 
                            based on demand.
                        </p>
                        <button class="expansion-btn expansion-btn-primary" id="successClose">
                            Got It, Thanks!
                        </button>
                    </div>
                    
                    <div class="expansion-modal-footer" id="expansionFooter">
                        <button class="expansion-btn expansion-btn-secondary" id="cancelModal">
                            Maybe Later
                        </button>
                        <button class="expansion-btn expansion-btn-primary" id="submitInterest">
                            Share My Interest
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
        document.getElementById('cancelModal').addEventListener('click', () => {
            this.closeModal();
            // Reset to empty selection
            this.countrySelect.value = '';
        });
        
        document.getElementById('submitInterest').addEventListener('click', () => {
            this.submitExpansionInterest();
        });
        
        document.getElementById('successClose').addEventListener('click', () => {
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

