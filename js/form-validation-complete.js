/**
 * Complete Form Validation for Tessera Amoris Application
 * Comprehensive validation with user-friendly messages
 */

class FormValidationComplete {
  constructor() {
    this.errors = {};
    this.requiredFields = {
      1: ['full-name', 'gender', 'email', 'phone', 'country', 'state', 'city', 'nationality', 'occupation', 'education', 'languages'],
      2: ['faith-tradition', 'community-involvement', 'values-importance'],
      3: ['relationship-goal', 'previous-marriage', 'have-children', 'want-children', 'partner-age-range', 'partner-location', 'relocation'],
      4: ['reference-name-1', 'reference-relationship-1', 'reference-email-1', 'reference-phone-1', 'reference-name-2', 'reference-relationship-2', 'reference-email-2', 'reference-phone-2'],
      5: ['terms-agreement', 'privacy-agreement']
    };
  }

  normalizeSectionIndex(sectionIndex) {
    if (typeof sectionIndex === 'number') {
      return sectionIndex + 1;
    }

    const parsed = parseInt(sectionIndex, 10);
    if (!Number.isNaN(parsed) && parsed > 0) {
      return parsed;
    }

    return 1;
  }

  /**
   * Validate a specific form section
   */
  validateSection(sectionIndex) {
    this.errors = {};
    const sectionNumber = this.normalizeSectionIndex(sectionIndex);
    const section = document.querySelector(`.form-section[data-section="${sectionNumber}"]`);

    if (!section) {
      console.error(`Section ${sectionIndex} not found`);
      return { isValid: true, errors: [] };
    }

    const requiredFieldIds = this.requiredFields[sectionNumber] || [];
    let isValid = true;
    let errorMessages = [];

    // Validate each required field
    requiredFieldIds.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      
      if (!field) {
        console.warn(`Field ${fieldId} not found in section ${sectionIndex}`);
        return;
      }

      const fieldValue = this.getFieldValue(field);
      const fieldLabel = this.getFieldLabel(field);
      
      if (!this.isFieldValid(fieldId, fieldValue, field)) {
        isValid = false;
        errorMessages.push(fieldLabel);
        this.showFieldError(field, this.getErrorMessage(fieldId));
      } else {
        this.clearFieldError(field);
      }
    });

    // Special validations
    if (sectionNumber === 1) {
      const personalValidation = this.validatePersonalSection(section);
      if (!personalValidation.isValid) {
        isValid = false;
        errorMessages = errorMessages.concat(personalValidation.errors);
      }
    } else if (sectionNumber === 2) {
      const faithValidation = this.validateFaithSection(section);
      if (!faithValidation.isValid) {
        isValid = false;
        errorMessages = errorMessages.concat(faithValidation.errors);
      }
    } else if (sectionNumber === 3) {
      const relationshipValidation = this.validateRelationshipSection(section);
      if (!relationshipValidation.isValid) {
        isValid = false;
        errorMessages = errorMessages.concat(relationshipValidation.errors);
      }
    } else if (sectionNumber === 4) {
      const verificationValidation = this.validateVerificationSection(section);
      if (!verificationValidation.isValid) {
        isValid = false;
        errorMessages = errorMessages.concat(verificationValidation.errors);
      }
    }

    const cleanedErrors = Array.from(new Set(errorMessages.filter(error => error && error.trim())));

    return { isValid, errors: cleanedErrors };
  }

  /**
   * Get field value based on field type
   */
  getFieldValue(field) {
    if (!field) {
      return '';
    }

    const type = field.type;

    if (type === 'checkbox') {
      if (field.name) {
        const checked = document.querySelector(`input[name="${field.name}"]:checked`);
        return checked ? checked.value : '';
      }
      return field.checked ? (field.value || 'on') : '';
    }

    if (type === 'radio') {
      if (field.name) {
        const checked = document.querySelector(`input[name="${field.name}"]:checked`);
        return checked ? checked.value : '';
      }
      return field.checked ? (field.value || 'on') : '';
    }

    if (type === 'file') {
      return field.files && field.files.length > 0 ? 'selected' : '';
    }

    if (field.tagName === 'SELECT') {
      return field.value.trim();
    }

    return field.value ? field.value.trim() : '';
  }

  /**
   * Get field label
   */
  getFieldLabel(field) {
    if (!field) {
      return '';
    }

    const customLabels = {
      'background-check': 'Background Check Authorization',
      'terms-agreement': 'Application Accuracy Confirmation',
      'privacy-agreement': 'Privacy Policy Agreement',
      'verification-photos': 'Recent Photos Upload'
    };

    if (customLabels[field.id]) {
      return customLabels[field.id];
    }

    const label = document.querySelector(`label[for="${field.id}"]`);
    return label ? label.textContent.replace('*', '').trim() : field.id;
  }

  /**
   * Check if a field is valid
   */
  isFieldValid(fieldId, value, field) {
    // Empty field check
    if (!value) {
      if (fieldId === 'languages') {
        const selectedLanguages = document.querySelectorAll('.elegant-languages-selector .language-tag');
        return selectedLanguages.length > 0;
      }

      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;

    if (fieldId === 'email' || fieldId.includes('email')) {
      return emailRegex.test(value);
    }

    if (fieldId === 'phone' || fieldId.includes('phone')) {
      return phoneRegex.test(value);
    }

    if (fieldId === 'languages') {
      return value.split(',').filter(Boolean).length > 0;
    }

    if (fieldId === 'occupation') {
      return value.length > 0;
    }

    return true;
  }

  /**
   * Validate personal information section
   */
  validatePersonalSection(section) {
    let isValid = true;
    let errors = [];

    // Check if all date fields are filled
    const birthMonth = document.getElementById('birth-month');
    const birthDay = document.getElementById('birth-day');
    const birthYear = document.getElementById('birth-year');

    if (!birthMonth.value || !birthDay.value || !birthYear.value) {
      this.showFieldError(birthMonth, 'Please select a complete date of birth');
      isValid = false;
      errors.push('Date of Birth');
    } else {
      this.clearFieldError(birthMonth);

      // Validate age (must be at least 18)
      const age = this.calculateAge(birthYear.value, birthMonth.value, birthDay.value);
      if (age < 18) {
        this.showFieldError(birthYear, 'You must be at least 18 years old');
        isValid = false;
        errors.push('Age requirement (18+)');
      } else {
        this.clearFieldError(birthYear);
      }
    }

    return { isValid, errors };
  }

  /**
   * Validate faith and values section
   */
  validateFaithSection(section) {
    let isValid = true;
    let errors = [];

    // Check if at least one value is selected
    const selectedValues = document.querySelectorAll('.value-tag.selected');
    if (selectedValues.length === 0) {
      const valuesContainer = document.querySelector('.value-tags');
      if (valuesContainer) {
        this.showFieldError(valuesContainer, 'Please select at least one value');
        isValid = false;
        errors.push('Core Values Selection');
      }
    } else {
      const valuesContainer = document.querySelector('.value-tags');
      if (valuesContainer) {
        this.clearFieldError(valuesContainer);
      }
    }

    return { isValid, errors };
  }

  /**
   * Validate relationship section
   */
  validateRelationshipSection(section) {
    let isValid = true;
    let errors = [];

    const relationshipGoal = document.getElementById('relationship-goal');
    if (relationshipGoal && !relationshipGoal.value.trim()) {
      this.showFieldError(relationshipGoal, 'Please select your primary relationship goal');
      isValid = false;
      errors.push('Relationship Goal');
    } else if (relationshipGoal) {
      this.clearFieldError(relationshipGoal);
    }

    return { isValid, errors };
  }

  /**
   * Validate verification section
   */
  validateVerificationSection(section) {
    let isValid = true;
    let errors = [];

    const photoInput = document.getElementById('verification-photos');
    if (photoInput && (!photoInput.files || photoInput.files.length === 0)) {
      this.showFieldError(photoInput, 'Please share at least one recent photo');
      isValid = false;
      errors.push('Recent Photos Upload');
    } else if (photoInput) {
      this.clearFieldError(photoInput);
    }

    const backgroundCheck = document.getElementById('background-check');
    if (backgroundCheck && !backgroundCheck.checked) {
      this.showFieldError(backgroundCheck, 'You must authorize the background check');
      isValid = false;
      errors.push('Background Check Authorization');
    } else if (backgroundCheck) {
      this.clearFieldError(backgroundCheck);
    }

    return { isValid, errors };
  }

  /**
   * Calculate age from birth date
   */
  calculateAge(year, month, day) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  /**
   * Show field error
   */
  showFieldError(field, message) {
    const container = this.getErrorContainer(field);

    if (!container) {
      return;
    }

    this.clearFieldError(field);

    if (field && field !== container && field.classList) {
      field.classList.add('error');
      field.setAttribute('aria-invalid', 'true');
    }

    if (field && (field.type === 'checkbox' || field.type === 'radio')) {
      container.classList.add('error');
      field.setAttribute('aria-invalid', 'true');
    }

    const errorElement = document.createElement('div');
    errorElement.className = 'form-error-message';
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('aria-live', 'polite');

    const icon = document.createElement('span');
    icon.className = 'form-error-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = `
      <svg viewBox="0 0 20 20" focusable="false" aria-hidden="true">
        <path d="M10 1.667a8.333 8.333 0 1 0 0 16.666 8.333 8.333 0 0 0 0-16.666Zm0 12.5a.833.833 0 1 1 0 1.666.833.833 0 0 1 0-1.666Zm0-8.334a.833.833 0 0 1 .833.834v4.166a.833.833 0 0 1-1.666 0V6.667A.833.833 0 0 1 10 5.833Z" fill="currentColor"/>
      </svg>
    `;

    container.classList.add('error');
    container.appendChild(errorElement);
  }

  /**
   * Clear field error
   */
  clearFieldError(field) {
    const container = this.getErrorContainer(field);

    if (!container) {
      return;
    }

    if (field && field !== container && field.classList) {
      field.classList.remove('error');
      field.removeAttribute('aria-invalid');
    }

    if (container.classList) {
      container.classList.remove('error');
    }

    const errorElement = container.querySelector('.form-error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  getErrorContainer(field) {
    if (!field) {
      return null;
    }

    if (field.matches && field.matches('.form-group, .form-check, .value-tags, .elegant-languages-selector, .occupation-selector-container, .file-upload')) {
      return field;
    }

    const selectors = [
      '.sophisticated-field',
      '.form-group',
      '.form-check',
      '.occupation-selector-container',
      '.advanced-nationality-input-wrapper',
      '.phone-input-harmonized',
      '.elegant-languages-selector',
      '.value-tags',
      '.location-field',
      '.file-upload'
    ];

    for (const selector of selectors) {
      if (typeof field.closest === 'function') {
        const container = field.closest(selector);
        if (container) {
          return container;
        }
      }
    }

    return field.parentNode || null;
  }

  /**
   * Get error message for a field
   */
  getErrorMessage(fieldId) {
    const messages = {
      'full-name': 'Please enter your full name',
      'gender': 'Please select your gender',
      'email': 'Please enter a valid email address',
      'phone': 'Please enter a valid phone number',
      'country': 'Please select your country',
      'state': 'Please select your state/province',
      'city': 'Please select your city',
      'nationality': 'Please select your nationality',
      'occupation': 'Please choose your occupation',
      'education': 'Please select your highest level of education',
      'languages': 'Please add at least one language',
      'faith-tradition': 'Please select your faith tradition',
      'community-involvement': 'Please share your community involvement',
      'values-importance': 'Please tell us how important shared values are to you',
      'relationship-goal': 'Please select your primary relationship goal',
      'previous-marriage': 'Please share your previous marriage history',
      'have-children': 'Please let us know if you have children',
      'want-children': 'Please share your desire for children',
      'partner-age-range': 'Please select a preferred partner age range',
      'partner-location': 'Please select a preferred partner location',
      'relocation': 'Please tell us your relocation preference',
      'reference-name-1': 'Please add the first reference name',
      'reference-relationship-1': 'Please describe your relationship with the first reference',
      'reference-email-1': 'Please add a valid email for the first reference',
      'reference-phone-1': 'Please add a phone number for the first reference',
      'reference-name-2': 'Please add the second reference name',
      'reference-relationship-2': 'Please describe your relationship with the second reference',
      'reference-email-2': 'Please add a valid email for the second reference',
      'reference-phone-2': 'Please add a phone number for the second reference',
      'terms-agreement': 'Please confirm that your information is accurate',
      'privacy-agreement': 'Please agree to our privacy policy',
      'verification-photos': 'Please share at least one recent photo',
      'background-check': 'You must authorize the background check'
    };

    return messages[fieldId] || 'This field is required';
  }

  /**
   * Show validation error notification
   */
  showValidationNotification(errors) {
    // Remove existing notification
    const existingNotification = document.querySelector('.validation-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'validation-notification info';
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');

    const title = document.createElement('div');
    title.className = 'notification-title';
    title.textContent = "Let's gently complete a few details 💛";

    const message = document.createElement('div');
    message.className = 'notification-message';
    message.innerHTML = `
      <p>Thank you for sharing your story with us. To continue, could you kindly revisit the items below?</p>
      <ul>
        ${errors.map(error => `<li>${error}</li>`).join('')}
      </ul>
      <p>Once these are polished, press <strong>Continue</strong> again and we'll guide you forward. We're cheering you on!</p>
    `;

    const closeButton = document.createElement('button');
    closeButton.className = 'notification-close';
    closeButton.innerHTML = '×';
    closeButton.setAttribute('aria-label', 'Close notification');
    closeButton.addEventListener('click', () => {
      notification.remove();
      if (typeof window.syncApplicationFormHeight === 'function') {
        window.syncApplicationFormHeight();
      }
    });

    content.appendChild(title);
    content.appendChild(message);

    notification.appendChild(closeButton);
    notification.appendChild(icon);
    notification.appendChild(content);

    // Insert at the top of the form content
    const formContent = document.querySelector('.form-content');
    if (formContent) {
      formContent.insertBefore(notification, formContent.firstChild);

      if (typeof window.syncApplicationFormHeight === 'function') {
        requestAnimationFrame(() => window.syncApplicationFormHeight());
      }

      // Auto-remove after 6 seconds
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
          if (typeof window.syncApplicationFormHeight === 'function') {
            window.syncApplicationFormHeight();
          }
        }
      }, 6000);
    }
  }

  /**
   * Clear all errors
   */
  clearAllErrors() {
    const errorElements = document.querySelectorAll('.form-error-message');
    errorElements.forEach(el => el.remove());

    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => {
      field.classList.remove('error');
      if (field.hasAttribute && field.hasAttribute('aria-invalid')) {
        field.removeAttribute('aria-invalid');
      }
    });

    this.errors = {};
  }
}

// Initialize validation when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  window.formValidation = new FormValidationComplete();
});

