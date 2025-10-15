/**
 * Fix References Layout
 * Refactors the reference section to be clean and well-aligned
 */

(function() {
    'use strict';
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        fixReferencesLayout();
    }
    
    function fixReferencesLayout() {
        // Find all reference form groups
        const section4 = document.querySelector('[data-section="4"]');
        if (!section4) return;
        
        // Find reference #1 and #2
        const ref1Label = Array.from(section4.querySelectorAll('.form-label')).find(
            label => label.textContent.includes('Character Reference #1')
        );
        const ref2Label = Array.from(section4.querySelectorAll('.form-label')).find(
            label => label.textContent.includes('Character Reference #2')
        );
        
        if (ref1Label) {
            const ref1Group = ref1Label.closest('.form-group');
            if (ref1Group) {
                refactorReferenceCard(ref1Group, 1);
            }
        }
        
        if (ref2Label) {
            const ref2Group = ref2Label.closest('.form-group');
            if (ref2Group) {
                refactorReferenceCard(ref2Group, 2);
            }
        }
    }
    
    function refactorReferenceCard(formGroup, number) {
        // Get all the input fields
        const nameInput = formGroup.querySelector(`#reference-name-${number}`);
        const relationshipInput = formGroup.querySelector(`#reference-relationship-${number}`);
        const emailInput = formGroup.querySelector(`#reference-email-${number}`);
        const phoneInput = formGroup.querySelector(`#reference-phone-${number}`);
        
        if (!nameInput || !relationshipInput || !emailInput || !phoneInput) return;
        
        // Create new card structure
        const card = document.createElement('div');
        card.className = 'reference-card';
        card.innerHTML = `
            <div class="reference-header">
                <div class="reference-number">${number}</div>
                <h4>Character Reference #${number}</h4>
            </div>
            <div class="reference-form">
                <div class="reference-form-group">
                    <label for="reference-name-${number}">Name</label>
                    <input type="text" id="reference-name-${number}" placeholder="Full name" required>
                </div>
                <div class="reference-form-group">
                    <label for="reference-relationship-${number}">Relationship</label>
                    <input type="text" id="reference-relationship-${number}" placeholder="e.g., Pastor, Friend" required>
                </div>
                <div class="reference-form-group">
                    <label for="reference-email-${number}">Email</label>
                    <input type="email" id="reference-email-${number}" placeholder="email@example.com" required>
                </div>
                <div class="reference-form-group">
                    <label for="reference-phone-${number}">Phone</label>
                    <input type="tel" id="reference-phone-${number}" placeholder="+1 123-456-7890" required>
                </div>
                <div class="relationship-suggestions">
                    <p>Suggested relationships:</p>
                    <div class="suggestion-tags">
                        <span class="suggestion-tag" data-value="Pastor">Pastor</span>
                        <span class="suggestion-tag" data-value="Friend">Friend</span>
                        <span class="suggestion-tag" data-value="Colleague">Colleague</span>
                        <span class="suggestion-tag" data-value="Mentor">Mentor</span>
                        <span class="suggestion-tag" data-value="Family Member">Family Member</span>
                        <span class="suggestion-tag" data-value="Community Leader">Community Leader</span>
                    </div>
                </div>
            </div>
        `;
        
        // Preserve existing values
        const newNameInput = card.querySelector(`#reference-name-${number}`);
        const newRelationshipInput = card.querySelector(`#reference-relationship-${number}`);
        const newEmailInput = card.querySelector(`#reference-email-${number}`);
        const newPhoneInput = card.querySelector(`#reference-phone-${number}`);
        
        if (nameInput.value) newNameInput.value = nameInput.value;
        if (relationshipInput.value) newRelationshipInput.value = relationshipInput.value;
        if (emailInput.value) newEmailInput.value = emailInput.value;
        if (phoneInput.value) newPhoneInput.value = phoneInput.value;
        
        // Add suggestion tag click handlers
        const suggestionTags = card.querySelectorAll('.suggestion-tag');
        suggestionTags.forEach(tag => {
            tag.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                const relationshipField = card.querySelector(`#reference-relationship-${number}`);
                if (relationshipField) {
                    relationshipField.value = value;
                    relationshipField.focus();
                }
            });
        });
        
        // Replace the old form group with the new card
        formGroup.replaceWith(card);
    }
    
})();

