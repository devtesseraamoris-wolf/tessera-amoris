// Sophisticated References and Verification Components

class SophisticatedReferencesManager {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.references = [];
        this.relationshipTypes = [
            { value: 'friend', label: 'Close Friend', icon: '👥', description: 'Someone who knows you personally' },
            { value: 'colleague', label: 'Professional Colleague', icon: '💼', description: 'Someone from your workplace' },
            { value: 'mentor', label: 'Mentor/Teacher', icon: '🎓', description: 'Someone who has guided you' },
            { value: 'family-friend', label: 'Family Friend', icon: '🏠', description: 'Long-time family acquaintance' },
            { value: 'community-leader', label: 'Community Leader', icon: '🌟', description: 'Religious or community leader' },
            { value: 'supervisor', label: 'Supervisor/Manager', icon: '👔', description: 'Someone who has supervised your work' },
            { value: 'other', label: 'Other', icon: '📝', description: 'Please specify the relationship' }
        ];
        
        this.createReferencesManager();
    }

    createReferencesManager() {
        const container = document.createElement('div');
        container.className = 'sophisticated-references-manager';
        
        // Create header
        const header = document.createElement('div');
        header.className = 'references-header';
        header.innerHTML = `
            <h3>Character References</h3>
            <p>Provide contacts who can speak to your character and integrity. We'll reach out to them as part of our verification process.</p>
            <div class="references-counter">
                <span class="references-count">0</span> / 2 references added
            </div>
        `;
        
        // Create references list
        const referencesList = document.createElement('div');
        referencesList.className = 'references-list';
        
        // Create add reference button
        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.className = 'add-reference-btn';
        addButton.innerHTML = `
            <i class="fas fa-plus"></i>
            <span>Add Character Reference</span>
        `;
        addButton.addEventListener('click', () => this.addReference());
        
        container.appendChild(header);
        container.appendChild(referencesList);
        container.appendChild(addButton);
        
        // Replace original container
        this.container.parentNode.replaceChild(container, this.container);
        this.container = container;
        
        // Add initial references
        this.addReference();
        this.addReference();
    }

    addReference() {
        if (this.references.length >= 2) return;
        
        const referenceId = `reference-${this.references.length + 1}`;
        const reference = {
            id: referenceId,
            name: '',
            relationship: '',
            email: '',
            phone: '',
            customRelationship: ''
        };
        
        this.references.push(reference);
        
        const referenceCard = this.createReferenceCard(reference);
        const referencesList = this.container.querySelector('.references-list');
        referencesList.appendChild(referenceCard);
        
        this.updateCounter();
        this.updateAddButton();
    }

    createReferenceCard(reference) {
        const card = document.createElement('div');
        card.className = 'reference-card';
        card.dataset.referenceId = reference.id;
        
        card.innerHTML = `
            <div class="reference-header">
                <h4>Character Reference #${this.references.length}</h4>
                ${this.references.length > 1 ? '<button type="button" class="remove-reference-btn" title="Remove Reference"><i class="fas fa-times"></i></button>' : ''}
            </div>
            
            <div class="reference-form">
                <div class="form-row">
                    <div class="form-col-6">
                        <div class="sophisticated-field">
                            <label class="sophisticated-label">Full Name</label>
                            <input type="text" class="reference-input" data-field="name" placeholder="Enter full name" required>
                            <div class="field-description">First and last name of your reference</div>
                        </div>
                    </div>
                    <div class="form-col-6">
                        <div class="sophisticated-field">
                            <label class="sophisticated-label">Relationship Type</label>
                            <div class="relationship-selector">
                                <select class="relationship-select" data-field="relationship" required>
                                    <option value="">Select relationship type</option>
                                    ${this.relationshipTypes.map(type => 
                                        `<option value="${type.value}">${type.icon} ${type.label}</option>`
                                    ).join('')}
                                </select>
                            </div>
                            <div class="field-description">How do you know this person?</div>
                        </div>
                    </div>
                </div>
                
                <div class="custom-relationship-field" style="display: none;">
                    <div class="sophisticated-field">
                        <label class="sophisticated-label">Please specify the relationship</label>
                        <input type="text" class="reference-input" data-field="customRelationship" placeholder="Describe your relationship">
                        <div class="field-description">Please provide more details about your relationship</div>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-col-6">
                        <div class="sophisticated-field">
                            <label class="sophisticated-label">Email Address</label>
                            <input type="email" class="reference-input" data-field="email" placeholder="reference@example.com" required>
                            <div class="field-description">We'll send a brief reference form</div>
                        </div>
                    </div>
                    <div class="form-col-6">
                        <div class="sophisticated-field">
                            <label class="sophisticated-label">Phone Number</label>
                            <input type="tel" class="reference-input" data-field="phone" placeholder="+1 (555) 123-4567" required>
                            <div class="field-description">For verification purposes only</div>
                        </div>
                    </div>
                </div>
                
                <div class="reference-status">
                    <div class="status-indicator incomplete">
                        <i class="fas fa-circle"></i>
                        <span>Incomplete</span>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        this.setupReferenceCardEvents(card, reference);
        
        return card;
    }

    setupReferenceCardEvents(card, reference) {
        // Remove button
        const removeBtn = card.querySelector('.remove-reference-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => this.removeReference(reference.id));
        }
        
        // Input fields
        const inputs = card.querySelectorAll('.reference-input');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const field = e.target.dataset.field;
                reference[field] = e.target.value;
                this.updateReferenceStatus(card, reference);
            });
        });
        
        // Relationship selector
        const relationshipSelect = card.querySelector('.relationship-select');
        relationshipSelect.addEventListener('change', (e) => {
            reference.relationship = e.target.value;
            const customField = card.querySelector('.custom-relationship-field');
            
            if (e.target.value === 'other') {
                customField.style.display = 'block';
            } else {
                customField.style.display = 'none';
                reference.customRelationship = '';
            }
            
            this.updateReferenceStatus(card, reference);
        });
    }

    updateReferenceStatus(card, reference) {
        const statusIndicator = card.querySelector('.status-indicator');
        const isComplete = reference.name && reference.relationship && reference.email && reference.phone &&
                          (reference.relationship !== 'other' || reference.customRelationship);
        
        if (isComplete) {
            statusIndicator.className = 'status-indicator complete';
            statusIndicator.innerHTML = '<i class="fas fa-check-circle"></i><span>Complete</span>';
        } else {
            statusIndicator.className = 'status-indicator incomplete';
            statusIndicator.innerHTML = '<i class="fas fa-circle"></i><span>Incomplete</span>';
        }
    }

    removeReference(referenceId) {
        this.references = this.references.filter(ref => ref.id !== referenceId);
        const card = this.container.querySelector(`[data-reference-id="${referenceId}"]`);
        card.remove();
        
        this.updateCounter();
        this.updateAddButton();
        this.renumberReferences();
    }

    renumberReferences() {
        const cards = this.container.querySelectorAll('.reference-card');
        cards.forEach((card, index) => {
            const header = card.querySelector('.reference-header h4');
            header.textContent = `Character Reference #${index + 1}`;
        });
    }

    updateCounter() {
        const counter = this.container.querySelector('.references-count');
        counter.textContent = this.references.length;
    }

    updateAddButton() {
        const addButton = this.container.querySelector('.add-reference-btn');
        if (this.references.length >= 2) {
            addButton.style.display = 'none';
        } else {
            addButton.style.display = 'flex';
        }
    }
}

class SophisticatedVerificationProcess {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.createVerificationProcess();
    }

    createVerificationProcess() {
        const container = document.createElement('div');
        container.className = 'sophisticated-verification-process';
        
        container.innerHTML = `
            <div class="verification-header">
                <h3>Identity & Safety Verification</h3>
                <p>Your safety and the integrity of our community are our top priorities. We use industry-standard verification processes.</p>
            </div>
            
            <div class="verification-steps">
                <div class="verification-step">
                    <div class="step-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="step-content">
                        <h4>Background Screening</h4>
                        <p>We conduct comprehensive background checks to ensure community safety</p>
                    </div>
                </div>
                
                <div class="verification-step">
                    <div class="step-icon">
                        <i class="fas fa-id-card"></i>
                    </div>
                    <div class="step-content">
                        <h4>Identity Verification</h4>
                        <p>Secure verification of your identity through trusted third-party services</p>
                    </div>
                </div>
                
                <div class="verification-step">
                    <div class="step-icon">
                        <i class="fas fa-user-check"></i>
                    </div>
                    <div class="step-content">
                        <h4>Reference Validation</h4>
                        <p>We reach out to your references to confirm your character and integrity</p>
                    </div>
                </div>
            </div>
            
            <div class="authorization-section">
                <div class="authorization-card">
                    <div class="authorization-header">
                        <i class="fas fa-certificate"></i>
                        <h4>Verification Authorization</h4>
                    </div>
                    
                    <div class="authorization-content">
                        <p>By proceeding, you authorize Tessera Amoris to:</p>
                        <ul class="authorization-list">
                            <li><i class="fas fa-check"></i> Verify your identity through secure third-party services</li>
                            <li><i class="fas fa-check"></i> Conduct background screening for community safety</li>
                            <li><i class="fas fa-check"></i> Contact your provided references for character validation</li>
                            <li><i class="fas fa-check"></i> Maintain confidential records for matching purposes</li>
                        </ul>
                        
                        <div class="privacy-note">
                            <i class="fas fa-lock"></i>
                            <span>All information is handled with the highest level of confidentiality and security.</span>
                        </div>
                    </div>
                    
                    <div class="authorization-checkbox">
                        <label class="checkbox-container">
                            <input type="checkbox" id="verification-consent" required>
                            <span class="checkmark-custom"></span>
                            <span class="checkbox-text">I understand and consent to the verification process described above</span>
                        </label>
                    </div>
                </div>
            </div>
        `;
        
        // Replace original container
        this.container.parentNode.replaceChild(container, this.container);
        this.container = container;
    }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize references manager
    const referencesContainer = document.querySelector('#reference-name-1');
    if (referencesContainer && referencesContainer.closest('.form-group')) {
        // Find the parent container that includes both reference sections
        let parentContainer = referencesContainer.closest('.form-group');
        while (parentContainer.nextElementSibling && 
               parentContainer.nextElementSibling.querySelector('[id*="reference"]')) {
            parentContainer = parentContainer.nextElementSibling;
        }
        new SophisticatedReferencesManager(parentContainer);
    }

    // Initialize verification process
    const verificationContainer = document.querySelector('#background-check');
    if (verificationContainer && verificationContainer.closest('.form-group')) {
        new SophisticatedVerificationProcess(verificationContainer.closest('.form-group'));
    }
});
