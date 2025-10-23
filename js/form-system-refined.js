/**
 * Refined Form System for Tessera Amoris
 * Handles smooth section transitions and comprehensive validation
 */

class FormSystemRefined {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 5;
    this.formContent = document.querySelector('.form-content');
    this.formSections = document.querySelectorAll('.form-section');
    this.nextBtn = document.querySelector('.btn-next');
    this.prevBtn = document.querySelector('.btn-prev');
    this.submitBtn = document.querySelector('.btn-submit');
    
    this.requiredFields = {
      1: ['full-name', 'birth-month', 'birth-day', 'birth-year', 'gender', 'email', 'phone', 'country', 'state', 'city', 'nationality'],
      2: ['faith-tradition', 'church-involvement', 'faith-importance'],
      3: ['relationship-goals', 'family-vision'],
      4: ['references-name', 'references-email', 'background-check'],
      5: []
    };

    this.init();
  }

  /**
   * Initialize the form system
   */
  init() {
    this.setupEventListeners();
    this.ensureFormContentPosition();
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.handleNextStep());
    }
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.handlePrevStep());
    }
    if (this.submitBtn) {
      this.submitBtn.addEventListener('click', (e) => this.handleSubmit(e));
    }
  }

  /**
   * Ensure form content is positioned correctly
   */
  ensureFormContentPosition() {
    if (this.formContent) {
      this.formContent.style.position = 'relative';
      this.formContent.style.overflow = 'hidden';
    }
  }

  /**
   * Handle next step
   */
  handleNextStep() {
    const validationResult = this.validateCurrentSection();
    
    if (!validationResult.isValid) {
      this.showValidationError(validationResult.errors);
      return;
    }

    if (this.currentStep < this.totalSteps) {
      this.transitionToSection(this.currentStep + 1);
    }
  }

  /**
   * Handle previous step
   */
  handlePrevStep() {
    if (this.currentStep > 1) {
      this.transitionToSection(this.currentStep - 1);
    }
  }

  /**
   * Handle form submission
   */
  handleSubmit(e) {
    e.preventDefault();
    
    const validationResult = this.validateCurrentSection();
    
    if (!validationResult.isValid) {
      this.showValidationError(validationResult.errors);
      return;
    }

    // Submit form logic here
    console.log('Form submitted successfully');
  }

  /**
   * Transition to a specific section
   */
  transitionToSection(stepNumber) {
    if (stepNumber < 1 || stepNumber > this.totalSteps) {
      return;
    }

    // Remove active class from current section
    const currentSection = document.querySelector(`.form-section[data-section="${this.currentStep}"]`);
    if (currentSection) {
      currentSection.classList.remove('active');
    }

    // Add active class to new section
    const newSection = document.querySelector(`.form-section[data-section="${stepNumber}"]`);
    if (newSection) {
      newSection.classList.add('active');
    }

    // Update current step
    this.currentStep = stepNumber;

    // Update progress bar
    this.updateProgressBar();

    // Update button visibility
    this.updateButtonVisibility();

    // Clear any validation errors
    this.clearValidationErrors();

    // Scroll form content to top (without page scroll)
    if (this.formContent) {
      this.formContent.scrollTop = 0;
    }
  }

  /**
   * Update progress bar
   */
  updateProgressBar() {
    const progressSteps = document.querySelectorAll('.progress-step');
    progressSteps.forEach((step, index) => {
      const stepNumber = index + 1;
      if (stepNumber <= this.currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
  }

  /**
   * Update button visibility
   */
  updateButtonVisibility() {
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

  /**
   * Validate current section
   */
  validateCurrentSection() {
    const requiredFieldIds = this.requiredFields[this.currentStep] || [];
    const errors = [];

    requiredFieldIds.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (!field) return;

      const value = this.getFieldValue(field);
      const fieldLabel = this.getFieldLabel(field);

      if (!this.isFieldValid(fieldId, value, field)) {
        errors.push(fieldLabel);
      }
    });

    // Special validations for specific sections
    if (this.currentStep === 1) {
      const ageValidation = this.validateAge();
      if (!ageValidation.isValid) {
        errors.push(ageValidation.error);
      }
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  /**
   * Get field value
   */
  getFieldValue(field) {
    const type = field.type;
    
    if (type === 'checkbox' || type === 'radio') {
      const name = field.name;
      const checked = document.querySelector(`input[name="${name}"]:checked`);
      return checked ? checked.value : '';
    } else if (field.tagName === 'SELECT') {
      return field.value;
    } else {
      return field.value ? field.value.trim() : '';
    }
  }

  /**
   * Get field label
   */
  getFieldLabel(field) {
    const label = document.querySelector(`label[for="${field.id}"]`);
    if (label) {
      return label.textContent.replace('*', '').replace('Required', '').trim();
    }
    return field.id;
  }

  /**
   * Check if field is valid
   */
  isFieldValid(fieldId, value, field) {
    if (!value) {
      return false;
    }

    if (fieldId === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }

    if (fieldId === 'phone') {
      const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
      return phoneRegex.test(value);
    }

    return true;
  }

  /**
   * Validate age
   */
  validateAge() {
    const birthMonth = document.getElementById('birth-month');
    const birthDay = document.getElementById('birth-day');
    const birthYear = document.getElementById('birth-year');

    if (!birthMonth || !birthDay || !birthYear) {
      return { isValid: true };
    }

    if (!birthMonth.value || !birthDay.value || !birthYear.value) {
      return { isValid: false, error: 'Date of Birth' };
    }

    const today = new Date();
    const birthDate = new Date(birthYear.value, birthMonth.value - 1, birthDay.value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      return { isValid: false, error: 'Age requirement (18+)' };
    }

    return { isValid: true };
  }

  /**
   * Show validation error with elegant message
   */
  showValidationError(errors) {
    this.clearValidationErrors();

    const notification = document.createElement('div');
    notification.className = 'validation-error-elegant';
    notification.setAttribute('role', 'alert');

    const header = document.createElement('div');
    header.className = 'error-header';

    const icon = document.createElement('div');
    icon.className = 'error-icon';
    icon.innerHTML = '⚠';

    const title = document.createElement('div');
    title.className = 'error-title';
    title.textContent = 'Please Complete All Required Fields';

    header.appendChild(icon);
    header.appendChild(title);

    const content = document.createElement('div');
    content.className = 'error-content';

    const message = document.createElement('p');
    message.className = 'error-message';
    message.textContent = 'To continue your journey with us, please provide the following information:';

    const list = document.createElement('ul');
    list.className = 'error-list';

    errors.forEach(error => {
      const item = document.createElement('li');
      item.className = 'error-item';
      item.textContent = error;
      list.appendChild(item);
    });

    content.appendChild(message);
    content.appendChild(list);

    const footer = document.createElement('div');
    footer.className = 'error-footer';
    footer.innerHTML = '<p class="error-footer-text">We\'re here to help you find your perfect match. Every detail matters.</p>';

    notification.appendChild(header);
    notification.appendChild(content);
    notification.appendChild(footer);

    if (this.formContent) {
      this.formContent.insertBefore(notification, this.formContent.firstChild);
      
      // Auto-remove after 8 seconds
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 8000);
    }
  }

  /**
   * Clear validation errors
   */
  clearValidationErrors() {
    const existingNotification = document.querySelector('.validation-error-elegant');
    if (existingNotification) {
      existingNotification.remove();
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  window.formSystemRefined = new FormSystemRefined();
});

