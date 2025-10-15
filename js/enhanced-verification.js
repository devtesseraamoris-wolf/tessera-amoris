/**
 * Enhanced Verification Section
 * Professional, efficient, and trust-building verification interface
 */

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        enhanceVerificationSection();
        setupPhotoUpload();
        setupReferenceCards();
        setupBackgroundCheck();
    }
    
    function enhanceVerificationSection() {
        const section = document.querySelector('[data-section="4"]');
        if (!section) return;
        
        // Add trust-building header
        const existingH2 = section.querySelector('h2');
        if (existingH2 && existingH2.textContent.includes('Photos & Verification')) {
            const trustHeader = document.createElement('div');
            trustHeader.className = 'verification-trust-header';
            trustHeader.innerHTML = `
                <h2 class="verification-trust-title">Building Trust Together</h2>
                <p class="verification-trust-subtitle">Your safety and privacy are our highest priorities. This verification process ensures every member of our community is genuine, serious, and committed to finding meaningful connection.</p>
            `;
            
            // Replace the existing h2 and description
            const description = existingH2.nextElementSibling;
            if (description && description.tagName === 'P') {
                description.remove();
            }
            existingH2.replaceWith(trustHeader);
        }
        
        // Add privacy assurance banner
        const trustHeader = section.querySelector('.verification-trust-header');
        if (trustHeader) {
            const privacyBanner = document.createElement('div');
            privacyBanner.className = 'privacy-assurance';
            privacyBanner.innerHTML = `
                <i class="fas fa-shield-alt privacy-icon"></i>
                <div class="privacy-content">
                    <h4>Your Privacy is Protected</h4>
                    <p>All information is kept strictly confidential. Your references will only be contacted after mutual interest is established, and background checks are conducted through secure, professional channels.</p>
                </div>
            `;
            trustHeader.after(privacyBanner);
        }
        
        // Add "Why We Verify" section
        const backgroundCheckSection = section.querySelector('.background-check-section');
        if (backgroundCheckSection) {
            const whyVerify = document.createElement('div');
            whyVerify.className = 'why-verify-section';
            whyVerify.innerHTML = `
                <h4><i class="fas fa-question-circle"></i> Why We Verify</h4>
                <div class="why-verify-grid">
                    <div class="verify-reason">
                        <div class="verify-reason-icon">
                            <i class="fas fa-user-shield"></i>
                        </div>
                        <div class="verify-reason-content">
                            <h5>Safety First</h5>
                            <p>Protecting our community from fraud and misrepresentation</p>
                        </div>
                    </div>
                    <div class="verify-reason">
                        <div class="verify-reason-icon">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="verify-reason-content">
                            <h5>Serious Intent</h5>
                            <p>Ensuring all members are genuinely seeking meaningful relationships</p>
                        </div>
                    </div>
                    <div class="verify-reason">
                        <div class="verify-reason-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="verify-reason-content">
                            <h5>Quality Matches</h5>
                            <p>Verified profiles lead to more authentic connections</p>
                        </div>
                    </div>
                    <div class="verify-reason">
                        <div class="verify-reason-icon">
                            <i class="fas fa-lock"></i>
                        </div>
                        <div class="verify-reason-content">
                            <h5>Confidentiality</h5>
                            <p>Your information is never shared publicly or sold</p>
                        </div>
                    </div>
                </div>
            `;
            backgroundCheckSection.before(whyVerify);
        }
    }
    
    function setupPhotoUpload() {
        const fileUploadDiv = document.querySelector('.file-upload');
        if (!fileUploadDiv) return;
        
        // Enhance the upload area
        fileUploadDiv.classList.add('enhanced-photo-upload');
        
        const icon = fileUploadDiv.querySelector('.file-upload-icon');
        if (icon) {
            icon.className = 'fas fa-camera photo-upload-icon-large';
        }
        
        const text = fileUploadDiv.querySelector('.file-upload-text');
        if (text) {
            text.className = 'photo-upload-description';
        }
        
        const btn = fileUploadDiv.querySelector('.file-upload-btn');
        if (btn) {
            btn.className = 'photo-upload-button';
        }
        
        // Add title
        if (icon) {
            const title = document.createElement('div');
            title.className = 'photo-upload-title';
            title.textContent = 'Upload Your Photos';
            icon.after(title);
        }
        
        // Add requirements list
        const requirements = document.createElement('div');
        requirements.className = 'photo-requirements-list';
        requirements.innerHTML = `
            <h5>Photo Guidelines:</h5>
            <ul>
                <li>Recent photos (taken within the last 6 months)</li>
                <li>Clear view of your face</li>
                <li>Good lighting and quality</li>
                <li>Appropriate attire</li>
                <li>No group photos (you should be the only person)</li>
                <li>No filters or heavy editing</li>
            </ul>
        `;
        fileUploadDiv.after(requirements);
        
        // Drag and drop functionality
        const fileInput = fileUploadDiv.querySelector('.file-upload-input');
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            fileUploadDiv.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            fileUploadDiv.addEventListener(eventName, () => {
                fileUploadDiv.classList.add('drag-over');
            }, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            fileUploadDiv.addEventListener(eventName, () => {
                fileUploadDiv.classList.remove('drag-over');
            }, false);
        });
        
        fileUploadDiv.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                handleFiles(files);
            }
        }, false);
        
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                handleFiles(e.target.files);
            });
        }
        
        if (btn) {
            btn.addEventListener('click', () => {
                fileInput.click();
            });
        }
        
        function handleFiles(files) {
            const previewContainer = document.querySelector('.file-preview');
            if (!previewContainer) return;
            
            previewContainer.innerHTML = '';
            previewContainer.className = 'photo-preview-grid';
            
            Array.from(files).forEach((file, index) => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const previewItem = document.createElement('div');
                        previewItem.className = 'photo-preview-item';
                        previewItem.innerHTML = `
                            <img src="${e.target.result}" alt="Preview ${index + 1}" class="photo-preview-image">
                            <button type="button" class="photo-preview-remove" data-index="${index}">
                                <i class="fas fa-times"></i>
                            </button>
                        `;
                        previewContainer.appendChild(previewItem);
                        
                        // Setup remove button
                        const removeBtn = previewItem.querySelector('.photo-preview-remove');
                        removeBtn.addEventListener('click', () => {
                            previewItem.remove();
                            // Note: Actual file removal would require more complex handling
                        });
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }
    
    function setupReferenceCards() {
        // Enhance reference sections
        const referenceGroups = document.querySelectorAll('[id^="reference-name-"]');
        const processedGroups = new Set();
        
        referenceGroups.forEach(field => {
            const groupId = field.id.split('-').pop();
            if (processedGroups.has(groupId)) return;
            processedGroups.add(groupId);
            
            const formGroup = field.closest('.form-group');
            if (!formGroup) return;
            
            // Create reference card
            const card = document.createElement('div');
            card.className = 'reference-card';
            
            const header = document.createElement('div');
            header.className = 'reference-card-header';
            header.innerHTML = `
                <div class="reference-number">${groupId}</div>
                <div>
                    <h3 class="reference-card-title">Character Reference #${groupId}</h3>
                    <p class="reference-card-description">Someone who can speak to your character, values, and integrity</p>
                </div>
            `;
            
            const fieldGroup = document.createElement('div');
            fieldGroup.className = 'reference-field-group';
            
            // Move all fields into the card
            const allFields = formGroup.querySelectorAll('.form-group');
            allFields.forEach(field => {
                const refField = document.createElement('div');
                refField.className = 'reference-field';
                
                const label = field.querySelector('label');
                const input = field.querySelector('input');
                
                if (label && input) {
                    refField.appendChild(label.cloneNode(true));
                    refField.appendChild(input.cloneNode(true));
                    
                    // Add icon based on field type
                    let iconClass = 'fa-user';
                    if (input.type === 'email') iconClass = 'fa-envelope';
                    if (input.type === 'tel') iconClass = 'fa-phone';
                    if (input.placeholder && input.placeholder.includes('Relationship')) iconClass = 'fa-users';
                    
                    const icon = document.createElement('i');
                    icon.className = `fas ${iconClass} reference-field-icon`;
                    refField.appendChild(icon);
                    
                    fieldGroup.appendChild(refField);
                }
            });
            
            // Add relationship type suggestions
            const relationshipField = fieldGroup.querySelector(`[id="reference-relationship-${groupId}"]`);
            if (relationshipField) {
                const suggestions = document.createElement('div');
                suggestions.className = 'reference-type-suggestions';
                suggestions.innerHTML = `
                    <span class="reference-type-tag">Pastor</span>
                    <span class="reference-type-tag">Friend</span>
                    <span class="reference-type-tag">Colleague</span>
                    <span class="reference-type-tag">Mentor</span>
                    <span class="reference-type-tag">Family Member</span>
                `;
                
                const relationshipFieldDiv = relationshipField.closest('.reference-field');
                if (relationshipFieldDiv) {
                    relationshipFieldDiv.appendChild(suggestions);
                    
                    // Add click handlers for suggestions
                    suggestions.querySelectorAll('.reference-type-tag').forEach(tag => {
                        tag.addEventListener('click', () => {
                            relationshipField.value = tag.textContent;
                            relationshipField.dispatchEvent(new Event('input', { bubbles: true }));
                        });
                    });
                }
            }
            
            card.appendChild(header);
            card.appendChild(fieldGroup);
            
            // Replace original form group
            formGroup.replaceWith(card);
        });
    }
    
    function setupBackgroundCheck() {
        const bgCheckGroup = document.querySelector('[id="background-check"]');
        if (!bgCheckGroup) return;
        
        const formGroup = bgCheckGroup.closest('.form-group');
        if (!formGroup) return;
        
        const section = document.createElement('div');
        section.className = 'background-check-section';
        
        section.innerHTML = `
            <div class="background-check-header">
                <div class="background-check-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <div class="background-check-content">
                    <h3>Background Verification</h3>
                    <p>To maintain the highest standards of safety and trust within our community, we conduct professional background checks on all members.</p>
                </div>
            </div>
            
            <div class="background-check-benefits">
                <h4>What This Includes:</h4>
                <ul class="benefit-list">
                    <li class="benefit-item">
                        <i class="fas fa-check-circle benefit-icon"></i>
                        <span>Identity verification to confirm you are who you say you are</span>
                    </li>
                    <li class="benefit-item">
                        <i class="fas fa-check-circle benefit-icon"></i>
                        <span>Criminal background screening for community safety</span>
                    </li>
                    <li class="benefit-item">
                        <i class="fas fa-check-circle benefit-icon"></i>
                        <span>Marital status confirmation to ensure honesty</span>
                    </li>
                    <li class="benefit-item">
                        <i class="fas fa-check-circle benefit-icon"></i>
                        <span>Professional verification (optional, for enhanced profiles)</span>
                    </li>
                </ul>
            </div>
            
            <div class="background-check-authorization">
                <div class="authorization-checkbox">
                    <input type="checkbox" id="background-check-enhanced" required>
                    <label for="background-check-enhanced">
                        I authorize Tessera Amoris to conduct a comprehensive background check to verify my identity and ensure the safety and integrity of the community. I understand that this information will be kept strictly confidential and used solely for verification purposes.
                    </label>
                </div>
            </div>
        `;
        
        formGroup.replaceWith(section);
    }
    
})();

