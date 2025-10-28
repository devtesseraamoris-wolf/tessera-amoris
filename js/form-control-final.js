/**
 * Final Form Control System for Tessera Amoris
 * Comprehensive validation, smooth transitions, and elegant error messages
 * Version: 1.0 - Final
 */

(function() {
  'use strict';

  // Prevent multiple initializations
  if (window.TesseraFormControl) {
    return;
  }

  class TesseraFormControl {
    constructor() {
      this.currentStep = 1;
      this.totalSteps = 5;
      this.isInitialized = false;
      
      // Required fields for each section
      this.requiredFields = {
        1: ['full-name', 'birth-month', 'birth-day', 'birth-year', 'gender', 'email', 'phone', 'country', 'state', 'city', 'nationality', 'occupation', 'education'],
        2: ['faith-tradition', 'community-involvement', 'values-importance'],
        3: ['relationship-goal', 'previous-marriage', 'have-children', 'want-children', 'relocation'],
        4: ['background-check'],
        5: ['terms-agreement', 'privacy-agreement']
      };

      this.init();
    }

    init() {
      if (this.isInitialized) return;
      
      // Wait for DOM to be fully loaded
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setup());
      } else {
        this.setup();
      }
    }

    setup() {
      // Get DOM elements
      this.formContent = document.querySelector('.form-content');
      this.formSections = document.querySelectorAll('.form-section');
      this.nextBtn = document.querySelector('.btn-next');
      this.prevBtn = document.querySelector('.btn-prev');
      this.submitBtn = document.querySelector('.btn-submit');
      this.progressSteps = document.querySelectorAll('.progress-step');

      if (!this.formContent || !this.formSections.length) {
        console.warn('Form elements not found');
        return;
      }

      // Setup event listeners
      this.setupEventListeners();
      
      // Initialize form state
      this.updateUI();
      
      this.isInitialized = true;
      console.log('Tessera Form Control initialized successfully');
    }

    setupEventListeners() {
      // Remove any existing listeners by cloning buttons
      if (this.nextBtn) {
        const newNextBtn = this.nextBtn.cloneNode(true);
        this.nextBtn.parentNode.replaceChild(newNextBtn, this.nextBtn);
        this.nextBtn = newNextBtn;
        this.nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleNext();
        });
      }

      if (this.prevBtn) {
        const newPrevBtn = this.prevBtn.cloneNode(true);
        this.prevBtn.parentNode.replaceChild(newPrevBtn, this.prevBtn);
        this.prevBtn = newPrevBtn;
        this.prevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.handlePrev();
        });
      }

      if (this.submitBtn) {
        const newSubmitBtn = this.submitBtn.cloneNode(true);
        this.submitBtn.parentNode.replaceChild(newSubmitBtn, this.submitBtn);
        this.submitBtn = newSubmitBtn;
        this.submitBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleSubmit();
        });
      }
    }

    handleNext() {
      console.log('Next button clicked, current step:', this.currentStep);
      
      // Validate current section
      const validation = this.validateSection(this.currentStep);
      
      if (!validation.isValid) {
        console.log('Validation failed:', validation.missingFields);
        this.showValidationError(validation.missingFields);
        return false;
      }

      // Clear any error messages
      this.clearValidationError();

      // Move to next section
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        this.transitionToSection(this.currentStep);
      }

      return true;
    }

    handlePrev() {
      console.log('Previous button clicked, current step:', this.currentStep);
      
      // Clear any error messages
      this.clearValidationError();

      // Move to previous section
      if (this.currentStep > 1) {
        this.currentStep--;
        this.transitionToSection(this.currentStep);
      }
    }

    async handleSubmit() {
      console.log('Submit button clicked');
      
      // Validate current section
      const validation = this.validateSection(this.currentStep);
      
      if (!validation.isValid) {
        console.log('Validation failed:', validation.missingFields);
        this.showValidationError(validation.missingFields);
        return false;
      }

      // Submit form to Supabase
      console.log('Form validation passed, submitting to Supabase...');
      
      if (window.supabaseFormHandler) {
        const result = await window.supabaseFormHandler.handleFormSubmission();
        return result.success;
      } else {
        console.error('Supabase Form Handler not initialized');
        alert('Error: Database connection not available. Please refresh the page and try again.');
        return false;
      }
    }

    transitionToSection(stepNumber) {
      console.log('Transitioning to section:', stepNumber);

      // Prevent any automatic scrolling
      const preventScroll = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };

      // Temporarily disable scroll events
      window.addEventListener('scroll', preventScroll, { passive: false });
      document.addEventListener('scroll', preventScroll, { passive: false });

      // Store current scroll position
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const currentScrollX = window.pageXOffset || document.documentElement.scrollLeft;

      // Find current active section
      const currentSection = document.querySelector('.form-section.active');
      const targetSection = document.querySelector(`.form-section[data-section="${stepNumber}"]`);

      if (!targetSection) {
        console.warn('Target section not found:', stepNumber);
        return;
      }

      // If there's a current section, fade it out first
      if (currentSection && currentSection !== targetSection) {
        // Add fade-out class to current section
        currentSection.classList.add('fade-out');
        
        // Wait for fade-out animation to complete, then show next section
        setTimeout(() => {
          // Remove active and fade-out from current section
          currentSection.classList.remove('active', 'fade-out');
          
          // Add active to target section (triggers fade-in)
          targetSection.classList.add('active');
          
          // Update UI
          this.updateUI();
          
          // Maintain scroll position
          window.scrollTo(currentScrollX, currentScrollY);
        }, 400); // Match the CSS animation duration
      } else {
        // No current section, just show target
        targetSection.classList.add('active');
        this.updateUI();
        window.scrollTo(currentScrollX, currentScrollY);
      }

      // Re-enable scroll events after animations complete
      setTimeout(() => {
        window.scrollTo(currentScrollX, currentScrollY);
        window.removeEventListener('scroll', preventScroll);
        document.removeEventListener('scroll', preventScroll);
      }, 500);

      requestAnimationFrame(() => {
        window.scrollTo(currentScrollX, currentScrollY);
      });
    }

    updateUI() {
      // Update progress bar
      this.progressSteps.forEach((step, index) => {
        const stepNumber = index + 1;
        if (stepNumber <= this.currentStep) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });

      // Update button visibility
      if (this.prevBtn) {
        this.prevBtn.style.display = this.currentStep === 1 ? 'none' : 'flex';
      }

      if (this.nextBtn && this.submitBtn) {
        if (this.currentStep === this.totalSteps) {
          this.nextBtn.style.display = 'none';
          this.submitBtn.style.display = 'flex';
        } else {
          this.nextBtn.style.display = 'flex';
          this.submitBtn.style.display = 'none';
        }
      }
    }

    validateSection(sectionNumber) {
      const requiredFieldIds = this.requiredFields[sectionNumber] || [];
      const missingFields = [];

      requiredFieldIds.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field) {
          console.warn(`Field ${fieldId} not found`);
          return;
        }

        const value = this.getFieldValue(field);
        const label = this.getFieldLabel(field);

        if (!this.isFieldValid(fieldId, value, field)) {
          missingFields.push({
            id: fieldId,
            label: label,
            field: field
          });
        }
      });

      // Special validation for section 1 (age check)
      if (sectionNumber === 1) {
        const ageValidation = this.validateAge();
        if (!ageValidation.isValid) {
          missingFields.push({
            id: 'age-check',
            label: ageValidation.message,
            field: null
          });
        }
      }

      return {
        isValid: missingFields.length === 0,
        missingFields: missingFields
      };
    }

    getFieldValue(field) {
      if (!field) return '';

      const type = field.type;
      
      if (type === 'checkbox') {
        return field.checked ? field.value : '';
      } else if (type === 'radio') {
        const name = field.name;
        const checked = document.querySelector(`input[name="${name}"]:checked`);
        return checked ? checked.value : '';
      } else if (field.tagName === 'SELECT') {
        return field.value || '';
      } else {
        return (field.value || '').trim();
      }
    }

    getFieldLabel(field) {
      if (!field) return 'Unknown field';

      const label = document.querySelector(`label[for="${field.id}"]`);
      if (label) {
        return label.textContent.replace('*', '').replace('Required', '').trim();
      }
      
      // Fallback to field name
      return field.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    isFieldValid(fieldId, value, field) {
      // Checkbox validation - must be checked
      if (field && field.type === 'checkbox') {
        return field.checked === true;
      }

      // Empty check for other fields
      if (!value || value.length === 0) {
        return false;
      }

      // Email validation
      if (fieldId === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      }

      // Phone validation
      if (fieldId === 'phone') {
        const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
        return phoneRegex.test(value);
      }

      return true;
    }

    validateAge() {
      const birthMonth = document.getElementById('birth-month');
      const birthDay = document.getElementById('birth-day');
      const birthYear = document.getElementById('birth-year');

      if (!birthMonth || !birthDay || !birthYear) {
        return { isValid: true };
      }

      const month = birthMonth.value;
      const day = birthDay.value;
      const year = birthYear.value;

      if (!month || !day || !year) {
        return { isValid: true }; // Already caught by required field validation
      }

      const today = new Date();
      const birthDate = new Date(year, month - 1, day);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
        return {
          isValid: false,
          message: 'You must be at least 18 years old to apply'
        };
      }

      return { isValid: true };
    }

    showValidationError(missingFields) {
      // Clear existing errors
      this.clearValidationError();

      // Create error notification
      const notification = document.createElement('div');
      notification.className = 'tessera-validation-error';
      notification.setAttribute('role', 'alert');
      notification.setAttribute('aria-live', 'assertive');

      notification.innerHTML = `
        <div class="validation-error-container">
          <div class="validation-error-header">
            <div class="validation-error-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div class="validation-error-title">Please Complete Required Information</div>
          </div>
          <div class="validation-error-body">
            <p class="validation-error-message">To continue your journey with Tessera Amoris, we need the following information:</p>
            <ul class="validation-error-list">
              ${missingFields.map(field => `<li class="validation-error-item">${field.label}</li>`).join('')}
            </ul>
          </div>
          <div class="validation-error-footer">
            <p class="validation-error-note">Every detail helps us find your perfect match</p>
          </div>
        </div>
      `;

      // Insert at the top of form content
      if (this.formContent) {
        this.formContent.insertBefore(notification, this.formContent.firstChild);
        
        // Scroll to error message smoothly
        notification.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Auto-remove after 10 seconds
        setTimeout(() => {
          if (notification.parentNode) {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
          }
        }, 10000);
      }
    }

    clearValidationError() {
      const existingError = document.querySelector('.tessera-validation-error');
      if (existingError) {
        existingError.classList.add('fade-out');
        setTimeout(() => existingError.remove(), 300);
      }
    }
  }

  // Initialize and expose globally
  window.TesseraFormControl = new TesseraFormControl();
})();

