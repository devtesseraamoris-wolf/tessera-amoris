/**
 * Paraguay-Europe Country Selector
 * Replaces strategic-location-database.js
 * Complete working implementation
 */

// Paraguay + ALL 44 European Countries (UN Official List)
const AVAILABLE_COUNTRIES = [
    { code: 'PY', name: 'Paraguay', flag: '🇵🇾', hasStates: true },
    // Europe - All 44 countries
    { code: 'AL', name: 'Albania', flag: '🇦🇱', hasStates: false },
    { code: 'AD', name: 'Andorra', flag: '🇦🇩', hasStates: false },
    { code: 'AT', name: 'Austria', flag: '🇦🇹', hasStates: false },
    { code: 'BY', name: 'Belarus', flag: '🇧🇾', hasStates: false },
    { code: 'BE', name: 'Belgium', flag: '🇧🇪', hasStates: false },
    { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦', hasStates: false },
    { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', hasStates: false },
    { code: 'HR', name: 'Croatia', flag: '🇭🇷', hasStates: false },
    { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', hasStates: false },
    { code: 'DK', name: 'Denmark', flag: '🇩🇰', hasStates: false },
    { code: 'EE', name: 'Estonia', flag: '🇪🇪', hasStates: false },
    { code: 'FI', name: 'Finland', flag: '🇫🇮', hasStates: false },
    { code: 'FR', name: 'France', flag: '🇫🇷', hasStates: false },
    { code: 'DE', name: 'Germany', flag: '🇩🇪', hasStates: false },
    { code: 'GR', name: 'Greece', flag: '🇬🇷', hasStates: false },
    { code: 'VA', name: 'Holy See (Vatican City)', flag: '🇻🇦', hasStates: false },
    { code: 'HU', name: 'Hungary', flag: '🇭🇺', hasStates: false },
    { code: 'IS', name: 'Iceland', flag: '🇮🇸', hasStates: false },
    { code: 'IE', name: 'Ireland', flag: '🇮🇪', hasStates: false },
    { code: 'IT', name: 'Italy', flag: '🇮🇹', hasStates: false },
    { code: 'LV', name: 'Latvia', flag: '🇱🇻', hasStates: false },
    { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮', hasStates: false },
    { code: 'LT', name: 'Lithuania', flag: '🇱🇹', hasStates: false },
    { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', hasStates: false },
    { code: 'MT', name: 'Malta', flag: '🇲🇹', hasStates: false },
    { code: 'MD', name: 'Moldova', flag: '🇲🇩', hasStates: false },
    { code: 'MC', name: 'Monaco', flag: '🇲🇨', hasStates: false },
    { code: 'ME', name: 'Montenegro', flag: '🇲🇪', hasStates: false },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱', hasStates: false },
    { code: 'MK', name: 'North Macedonia', flag: '🇲🇰', hasStates: false },
    { code: 'NO', name: 'Norway', flag: '🇳🇴', hasStates: false },
    { code: 'PL', name: 'Poland', flag: '🇵🇱', hasStates: false },
    { code: 'PT', name: 'Portugal', flag: '🇵🇹', hasStates: false },
    { code: 'RO', name: 'Romania', flag: '🇷🇴', hasStates: false },
    { code: 'RU', name: 'Russia', flag: '🇷🇺', hasStates: false },
    { code: 'SM', name: 'San Marino', flag: '🇸🇲', hasStates: false },
    { code: 'RS', name: 'Serbia', flag: '🇷🇸', hasStates: false },
    { code: 'SK', name: 'Slovakia', flag: '🇸🇰', hasStates: false },
    { code: 'SI', name: 'Slovenia', flag: '🇸🇮', hasStates: false },
    { code: 'ES', name: 'Spain', flag: '🇪🇸', hasStates: false },
    { code: 'SE', name: 'Sweden', flag: '🇸🇪', hasStates: false },
    { code: 'CH', name: 'Switzerland', flag: '🇨🇭', hasStates: false },
    { code: 'UA', name: 'Ukraine', flag: '🇺🇦', hasStates: false },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', hasStates: false }
];

// Paraguay departments (states)
const PARAGUAY_DEPARTMENTS = {
    'PY': {
        name: 'Paraguay',
        states: {
            'asuncion': { name: 'Asunción', cities: ['Asunción'] },
            'concepcion': { name: 'Concepción', cities: ['Concepción', 'Horqueta', 'Belén'] },
            'san-pedro': { name: 'San Pedro', cities: ['San Pedro', 'Lima', 'General Elizardo Aquino'] },
            'cordillera': { name: 'Cordillera', cities: ['Caacupé', 'Eusebio Ayala', 'Tobatí'] },
            'guaira': { name: 'Guairá', cities: ['Villarrica', 'Coronel Martínez', 'Borja'] },
            'caaguazu': { name: 'Caaguazú', cities: ['Coronel Oviedo', 'Caaguazú', 'Repatriación'] },
            'caazapa': { name: 'Caazapá', cities: ['Caazapá', 'San Juan Nepomuceno', 'Yuty'] },
            'itapua': { name: 'Itapúa', cities: ['Encarnación', 'Hohenau', 'Obligado', 'Bella Vista'] },
            'misiones': { name: 'Misiones', cities: ['San Juan Bautista', 'San Ignacio', 'Santa Rosa'] },
            'paraguari': { name: 'Paraguarí', cities: ['Paraguarí', 'Pirayú', 'Carapeguá'] },
            'alto-parana': { name: 'Alto Paraná', cities: ['Ciudad del Este', 'Presidente Franco', 'Hernandarias', 'Minga Guazú'] },
            'central': { name: 'Central', cities: ['Lambaré', 'San Lorenzo', 'Fernando de la Mora', 'Luque', 'Capiatá', 'Ñemby'] },
            'neembucu': { name: 'Ñeembucú', cities: ['Pilar', 'Humaitá', 'Desmochados'] },
            'amambay': { name: 'Amambay', cities: ['Pedro Juan Caballero', 'Bella Vista', 'Capitán Bado'] },
            'canindeyu': { name: 'Canindeyú', cities: ['Salto del Guairá', 'Katueté', 'Curuguaty'] },
            'presidente-hayes': { name: 'Presidente Hayes', cities: ['Villa Hayes', 'Benjamín Aceval', 'Nanawa'] },
            'alto-paraguay': { name: 'Alto Paraguay', cities: ['Fuerte Olimpo', 'Puerto Casado', 'Bahía Negra'] },
            'boqueron': { name: 'Boquerón', cities: ['Filadelfia', 'Loma Plata', 'Mariscal Estigarribia'] }
        }
    }
};

// Expansion regions
const EXPANSION_REGIONS = [
    { value: 'americas', label: 'Americas', icon: '🌎', examples: 'USA, Canada, Brazil, Argentina, Chile, Mexico...' },
    { value: 'asia', label: 'Asia', icon: '🌏', examples: 'Japan, Singapore, South Korea, India, China...' },
    { value: 'middle_east', label: 'Middle East', icon: '🕌', examples: 'UAE, Israel, Saudi Arabia, Qatar, Turkey...' },
    { value: 'oceania', label: 'Oceania', icon: '🦘', examples: 'Australia, New Zealand, Fiji, Papua New Guinea...' },
    { value: 'africa', label: 'Africa', icon: '🦁', examples: 'South Africa, Kenya, Egypt, Morocco, Nigeria...' }
];

// Initialize the selector
function initializeParaguayEuropeSelector() {
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');
    
    if (!countrySelect) {
        console.error('Country select not found');
        return;
    }
    
    // Clear and populate countries
    countrySelect.innerHTML = '<option value="">Select your country</option>';
    
    // Add Paraguay
    const pyOption = document.createElement('option');
    pyOption.value = 'PY';
    pyOption.textContent = '🇵🇾 Paraguay';
    countrySelect.appendChild(pyOption);
    
    // Add Europe divider
    const europeDivider = document.createElement('option');
    europeDivider.disabled = true;
    europeDivider.textContent = '─────────────── Europe ───────────────';
    europeDivider.style.fontWeight = '600';
    europeDivider.style.color = '#D4AF37';
    europeDivider.style.textAlign = 'center';
    europeDivider.style.backgroundColor = '#f7fafc';
    countrySelect.appendChild(europeDivider);
    
    // Add all European countries
    AVAILABLE_COUNTRIES.filter(c => c.code !== 'PY').forEach(country => {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = `${country.flag} ${country.name}`;
        countrySelect.appendChild(option);
    });
    
    // Add bottom divider
    const bottomDivider = document.createElement('option');
    bottomDivider.disabled = true;
    bottomDivider.textContent = '───────────────────────────────────';
    bottomDivider.style.fontWeight = '600';
    bottomDivider.style.color = '#D4AF37';
    bottomDivider.style.textAlign = 'center';
    countrySelect.appendChild(bottomDivider);
    
    // Add "My country isn't listed yet"
    const otherOption = document.createElement('option');
    otherOption.value = 'OTHER';
    otherOption.textContent = '🌍 My country isn\'t listed yet';
    otherOption.style.fontWeight = '500';
    otherOption.style.color = '#4299e1';
    otherOption.style.fontStyle = 'italic';
    countrySelect.appendChild(otherOption);
    
    // Handle country selection
    countrySelect.addEventListener('change', function() {
        const selectedCountry = this.value;
        
        if (selectedCountry === 'OTHER') {
            showExpansionModal();
            return;
        }
        
        if (selectedCountry === 'PY') {
            // Paraguay - show departments
            if (stateSelect) {
                stateSelect.disabled = false;
                stateSelect.innerHTML = '<option value="">Select your department</option>';
                
                const departments = PARAGUAY_DEPARTMENTS['PY'].states;
                Object.keys(departments).forEach(deptKey => {
                    const dept = departments[deptKey];
                    const option = document.createElement('option');
                    option.value = deptKey;
                    option.textContent = dept.name;
                    stateSelect.appendChild(option);
                });
            }
            
            if (citySelect) {
                citySelect.disabled = true;
                citySelect.innerHTML = '<option value="">Select your city</option>';
            }
        } else {
            // European countries - ask for city directly
            if (stateSelect) {
                stateSelect.disabled = true;
                stateSelect.innerHTML = '<option value="">Not applicable</option>';
            }
            
            if (citySelect) {
                citySelect.disabled = false;
                citySelect.innerHTML = '<option value="">Enter your city</option><option value="other">Other (specify)</option>';
            }
        }
    });
    
    // Handle state/department selection for Paraguay
    if (stateSelect) {
        stateSelect.addEventListener('change', function() {
            const selectedCountry = countrySelect.value;
            const selectedState = this.value;
            
            if (selectedCountry === 'PY' && selectedState && citySelect) {
                citySelect.disabled = false;
                citySelect.innerHTML = '<option value="">Select your city</option>';
                
                const cities = PARAGUAY_DEPARTMENTS['PY'].states[selectedState].cities;
                cities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
                
                // Add "Other" option
                const otherOption = document.createElement('option');
                otherOption.value = 'other';
                otherOption.textContent = 'Other (specify)';
                citySelect.appendChild(otherOption);
            }
        });
    }
    
    // Create expansion modal
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
    
    // Reset country select
    const countrySelect = document.getElementById('country');
    if (countrySelect) {
        countrySelect.value = '';
    }
    
    // Reset form
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
    
    // Reset inputs
    document.querySelectorAll('input[name="expansion-region"]').forEach(input => input.checked = false);
    const countryInput = document.getElementById('expansionCountry');
    if (countryInput) countryInput.value = '';
    const emailInput = document.getElementById('expansionEmail');
    if (emailInput) emailInput.value = '';
}

function createExpansionModal() {
    // Check if modal already exists
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
    
    // Close on overlay click
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
    
    // Save to localStorage
    try {
        const existing = JSON.parse(localStorage.getItem('expansionInterests') || '[]');
        existing.push(data);
        localStorage.setItem('expansionInterests', JSON.stringify(existing));
        console.log('Expansion interest saved:', data);
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
    
    // Try to save to API
    try {
        await fetch('/api/submit-expansion-interest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.log('API not available, saved to localStorage only');
    }
    
    // Show success
    document.getElementById('expansionForm').style.display = 'none';
    document.getElementById('expansionFooter').style.display = 'none';
    document.getElementById('expansionSuccess').classList.add('active');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeParaguayEuropeSelector);
} else {
    initializeParaguayEuropeSelector();
}

