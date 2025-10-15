/**
 * Enhanced Review Section
 * Beautiful, visible, and easy-to-confirm application review
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
        enhanceReviewSection();
    }
    
    function enhanceReviewSection() {
        const section = document.querySelector('[data-section="5"]');
        if (!section) return;
        
        // Add enhanced header
        const existingH2 = section.querySelector('h2');
        if (existingH2 && existingH2.textContent.includes('Review')) {
            const header = document.createElement('div');
            header.className = 'review-header';
            header.innerHTML = `
                <h2 class="review-header-title">Review Your Application</h2>
                <p class="review-header-subtitle">Please review your information before submitting your application. You can edit any section by clicking the "Edit" button.</p>
            `;
            
            const description = existingH2.nextElementSibling;
            if (description && description.tagName === 'P') {
                description.remove();
            }
            existingH2.replaceWith(header);
        }
        
        // Add completion indicator
        const header = section.querySelector('.review-header');
        if (header) {
            const completionIndicator = document.createElement('div');
            completionIndicator.className = 'review-completion-indicator';
            completionIndicator.innerHTML = `
                <div class="completion-stat">
                    <div class="completion-number">5</div>
                    <div class="completion-label">Sections Completed</div>
                </div>
                <div class="completion-divider"></div>
                <div class="completion-stat">
                    <div class="completion-number">100%</div>
                    <div class="completion-label">Profile Complete</div>
                </div>
                <div class="completion-divider"></div>
                <div class="completion-stat">
                    <div class="completion-number">1</div>
                    <div class="completion-label">Step to Submit</div>
                </div>
            `;
            header.after(completionIndicator);
        }
        
        // Add highlights section
        const completionIndicator = section.querySelector('.review-completion-indicator');
        if (completionIndicator) {
            const highlights = document.createElement('div');
            highlights.className = 'review-highlights';
            highlights.innerHTML = `
                <h3 class="review-highlights-title">
                    <i class="fas fa-star"></i>
                    Your Profile Highlights
                </h3>
                <div class="highlights-grid">
                    <div class="highlight-item">
                        <div class="highlight-icon">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="highlight-content">
                            <h4 id="highlight-name">John Doe</h4>
                            <p id="highlight-location">New York, United States</p>
                        </div>
                    </div>
                    <div class="highlight-item">
                        <div class="highlight-icon">
                            <i class="fas fa-briefcase"></i>
                        </div>
                        <div class="highlight-content">
                            <h4 id="highlight-occupation">Software Engineer</h4>
                            <p id="highlight-education">Bachelor's Degree</p>
                        </div>
                    </div>
                    <div class="highlight-item">
                        <div class="highlight-icon">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="highlight-content">
                            <h4 id="highlight-values">Top Values</h4>
                            <p id="highlight-values-list">Faith, Family, Integrity</p>
                        </div>
                    </div>
                    <div class="highlight-item">
                        <div class="highlight-icon">
                            <i class="fas fa-globe"></i>
                        </div>
                        <div class="highlight-content">
                            <h4 id="highlight-preference">Relationship Goal</h4>
                            <p id="highlight-goal">Marriage and family</p>
                        </div>
                    </div>
                </div>
            `;
            completionIndicator.after(highlights);
        }
        
        // Enhance review groups
        const reviewGroups = section.querySelectorAll('.review-group');
        reviewGroups.forEach((group, index) => {
            const title = group.querySelector('.review-title');
            if (!title) return;
            
            // Icon mapping for each section
            const iconMap = {
                'Personal Information': 'fa-user',
                'Faith & Values': 'fa-praying-hands',
                'Relationship Preferences': 'fa-heart',
                'Photos & Verification': 'fa-shield-alt'
            };
            
            const titleText = title.textContent.trim();
            const icon = iconMap[titleText] || 'fa-info-circle';
            
            // Create card structure
            const card = document.createElement('div');
            card.className = 'review-card-group';
            
            const cardHeader = document.createElement('div');
            cardHeader.className = 'review-card-header';
            cardHeader.innerHTML = `
                <div class="review-card-header-content">
                    <div class="review-card-icon">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div class="review-card-title-group">
                        <h3>${titleText}</h3>
                        <p class="review-card-subtitle">Section ${index + 1} of ${reviewGroups.length}</p>
                    </div>
                </div>
                <button type="button" class="review-card-edit-btn" data-section="${index + 1}">
                    <i class="fas fa-edit"></i>
                    <span>Edit</span>
                </button>
            `;
            
            const cardBody = document.createElement('div');
            cardBody.className = 'review-card-body';
            
            // Create items grid
            const itemsGrid = document.createElement('div');
            itemsGrid.className = 'review-items-grid';
            
            // Move all review items into grid
            const items = group.querySelectorAll('.review-item');
            items.forEach(item => {
                const label = item.querySelector('.review-label');
                const value = item.querySelector('.review-value');
                
                if (label && value) {
                    const itemCard = document.createElement('div');
                    itemCard.className = 'review-item-card';
                    
                    // Add icon to label based on content
                    let labelIcon = '';
                    const labelText = label.textContent.trim();
                    if (labelText.includes('Name')) labelIcon = '<i class="fas fa-user"></i>';
                    else if (labelText.includes('Email')) labelIcon = '<i class="fas fa-envelope"></i>';
                    else if (labelText.includes('Phone')) labelIcon = '<i class="fas fa-phone"></i>';
                    else if (labelText.includes('Date')) labelIcon = '<i class="fas fa-calendar"></i>';
                    else if (labelText.includes('Location') || labelText.includes('City') || labelText.includes('Country')) labelIcon = '<i class="fas fa-map-marker-alt"></i>';
                    else if (labelText.includes('Occupation')) labelIcon = '<i class="fas fa-briefcase"></i>';
                    else if (labelText.includes('Education')) labelIcon = '<i class="fas fa-graduation-cap"></i>';
                    else if (labelText.includes('Language')) labelIcon = '<i class="fas fa-language"></i>';
                    else if (labelText.includes('Faith')) labelIcon = '<i class="fas fa-praying-hands"></i>';
                    else if (labelText.includes('Value')) labelIcon = '<i class="fas fa-heart"></i>';
                    else if (labelText.includes('Age')) labelIcon = '<i class="fas fa-birthday-cake"></i>';
                    
                    const valueText = value.textContent.trim();
                    const isLongText = valueText.length > 100;
                    
                    itemCard.innerHTML = `
                        <div class="review-item-label">${labelIcon}${labelText}</div>
                        <div class="${isLongText ? 'review-item-value-long' : 'review-item-value'}">${valueText}</div>
                    `;
                    
                    itemsGrid.appendChild(itemCard);
                }
            });
            
            cardBody.appendChild(itemsGrid);
            card.appendChild(cardHeader);
            card.appendChild(cardBody);
            
            group.replaceWith(card);
            
            // Setup edit button
            const editBtn = card.querySelector('.review-card-edit-btn');
            if (editBtn) {
                editBtn.addEventListener('click', () => {
                    const sectionNum = parseInt(editBtn.dataset.section);
                    // Navigate to that section
                    const sections = document.querySelectorAll('.form-section');
                    sections.forEach(s => s.classList.remove('active'));
                    const targetSection = document.querySelector(`[data-section="${sectionNum}"]`);
                    if (targetSection) {
                        targetSection.classList.add('active');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                });
            }
        });
        
        // Enhance confirmation checkboxes
        const confirmationArea = document.createElement('div');
        confirmationArea.className = 'review-confirmations';
        confirmationArea.innerHTML = `
            <h3 class="review-confirmations-title">Final Confirmations</h3>
            <div class="confirmation-item">
                <input type="checkbox" id="confirm-accuracy" class="confirmation-checkbox" required>
                <label for="confirm-accuracy" class="confirmation-label">
                    I confirm that all information provided is accurate and complete. I understand that any misrepresentation may result in the termination of my membership.
                </label>
            </div>
            <div class="confirmation-item">
                <input type="checkbox" id="confirm-privacy" class="confirmation-checkbox" required>
                <label for="confirm-privacy" class="confirmation-label">
                    I have read and agree to the <a href="privacy-policy.html" target="_blank">Privacy Policy</a> and <a href="terms-of-service.html" target="_blank">Terms of Service</a>.
                </label>
            </div>
        `;
        
        // Replace existing checkboxes
        const existingCheckboxes = section.querySelectorAll('.form-check');
        if (existingCheckboxes.length > 0) {
            existingCheckboxes[0].closest('.form-group').replaceWith(confirmationArea);
            if (existingCheckboxes.length > 1) {
                existingCheckboxes[1].closest('.form-group').remove();
            }
        }
        
        // Add checkbox interaction
        const confirmationItems = confirmationArea.querySelectorAll('.confirmation-item');
        confirmationItems.forEach(item => {
            const checkbox = item.querySelector('.confirmation-checkbox');
            const label = item.querySelector('.confirmation-label');
            
            item.addEventListener('click', (e) => {
                if (e.target.tagName !== 'A' && e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change'));
                }
            });
            
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    item.classList.add('checked');
                } else {
                    item.classList.remove('checked');
                }
            });
        });
        
        // Add "What Happens Next" section
        const nextSteps = document.createElement('div');
        nextSteps.className = 'review-next-steps';
        nextSteps.innerHTML = `
            <h3 class="review-next-steps-title">What Happens Next?</h3>
            <div class="next-steps-timeline">
                <div class="timeline-step">
                    <div class="timeline-number">1</div>
                    <div class="timeline-content">
                        <h4>Application Review</h4>
                        <p>Our team will carefully review your application within 3-5 business days.</p>
                    </div>
                </div>
                <div class="timeline-step">
                    <div class="timeline-number">2</div>
                    <div class="timeline-content">
                        <h4>Initial Interview</h4>
                        <p>If approved, we'll schedule a personal interview to get to know you better.</p>
                    </div>
                </div>
                <div class="timeline-step">
                    <div class="timeline-number">3</div>
                    <div class="timeline-content">
                        <h4>Verification Process</h4>
                        <p>We'll complete background checks and contact your references.</p>
                    </div>
                </div>
                <div class="timeline-step">
                    <div class="timeline-number">4</div>
                    <div class="timeline-content">
                        <h4>Begin Your Journey</h4>
                        <p>Once verified, you'll be welcomed into our exclusive community and begin receiving curated introductions.</p>
                    </div>
                </div>
            </div>
        `;
        
        confirmationArea.after(nextSteps);
        
        // Populate highlights from form data
        populateHighlights();
    }
    
    function populateHighlights() {
        // Get data from review values
        const fullName = document.getElementById('review-full-name');
        const city = document.getElementById('review-city');
        const country = document.getElementById('review-country');
        const occupation = document.getElementById('review-occupation');
        const education = document.getElementById('review-education');
        const values = document.getElementById('review-values');
        const goal = document.getElementById('review-relationship-goal');
        
        // Update highlights
        if (fullName) {
            const highlightName = document.getElementById('highlight-name');
            if (highlightName) highlightName.textContent = fullName.textContent;
        }
        
        if (city && country) {
            const highlightLocation = document.getElementById('highlight-location');
            if (highlightLocation) {
                highlightLocation.textContent = `${city.textContent}, ${country.textContent}`;
            }
        }
        
        if (occupation) {
            const highlightOccupation = document.getElementById('highlight-occupation');
            if (highlightOccupation) highlightOccupation.textContent = occupation.textContent;
        }
        
        if (education) {
            const highlightEducation = document.getElementById('highlight-education');
            if (highlightEducation) highlightEducation.textContent = education.textContent;
        }
        
        if (values) {
            const highlightValuesList = document.getElementById('highlight-values-list');
            if (highlightValuesList) {
                const valuesList = values.textContent.split(',').slice(0, 3).join(', ');
                highlightValuesList.textContent = valuesList;
            }
        }
        
        if (goal) {
            const highlightGoal = document.getElementById('highlight-goal');
            if (highlightGoal) highlightGoal.textContent = goal.textContent;
        }
    }
    
})();

