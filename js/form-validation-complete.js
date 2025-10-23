/**
 * Complete Form Validation for Tessera Amoris Application
 * Comprehensive validation with user-friendly messages
 */

class FormValidationComplete {
  constructor() {
    this.errors = {};
    this.requiredFields = {
      1: ['full-name', 'birth-month', 'birth-day', 'birth-year', 'gender', 'email', 'phone', 'country', 'state', 'city', 'nationality'],
      2: ['faith-tradition', 'church-involvement', 'faith-importance'],
      3: ['relationship-goals', 'family-vision'],
      4: ['references-name', 'references-email', 'background-check'],
      5: []
    };
  }

  /**
   * Validate a specific form section
   */
  validateSection(sectionIndex) {
    this.errors = {};
    const section = document.querySelector(`.form-section[data-section="${sectionIndex}"]`);
    
    if (!section) {
      console.error(`Section ${sectionIndex} not found`);
      return { isValid: true, errors: [] };
    }

    const requiredFieldIds = this.requiredFields[sectionIndex] || [];
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
    if (sectionIndex === 1) {
      const personalValidation = this.validatePersonalSection(section);
      if (!personalValidation.isValid) {
        isValid = false;
        errorMessages = errorMessages.concat(personalValidation.errors);
      }
    } else if (sectionIndex === 2) {
      const faithValidation = this.validateFaithSection(section);
      if (!faithValidation.isValid) {
        isValid = false;
        errorMessages = errorMessages.concat(faithValidation.errors);
      }
    } else if (sectionIndex === 3) {
      const relationshipValidation = this.validateRelationshipSection(section);
      if (!relationshipValidation.isValid) {
        isValid = false;
        errorMessages = errorMessages.concat(relationshipValidation.errors);
      }
    } else if (sectionIndex === 4) {
      const verificationValidation = this.validateVerificationSection(section);
      if (!verificationValidation.isValid) {
        isValid = false;
        errorMessages = errorMessages.concat(verificationValidation.errors);
      }
    }

    return { isValid, errors: errorMessages };
  }

  /**
   * Get field value based on field type
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
    return label ? label.textContent.replace('*', '').trim() : field.id;
  }

  /**
   * Check if a field is valid
   */
  isFieldValid(fieldId, value, field) {
    // Empty field check
    if (!value) {
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

    // Date validation
    if (fieldId === 'birth-month' || fieldId === 'birth-day' || fieldId === 'birth-year') {
      return value !== '';
    }

    // Values selection validation (at least one selected)
    if (fieldId === 'values-selection') {
      const selectedValues = document.querySelectorAll('.value-tag.selected');
      return selectedValues.length > 0;
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
    }

    return { isValid, errors };
  }

  /**
   * Validate relationship section
   */
  validateRelationshipSection(section) {
    let isValid = true;
    let errors = [];

    const relationshipGoals = document.getElementById('relationship-goals');
    if (relationshipGoals && !relationshipGoals.value.trim()) {
      this.showFieldError(relationshipGoals, 'Please describe your relationship goals');
      isValid = false;
      errors.push('Relationship Goals');
    }

    return { isValid, errors };
  }

  /**
   * Validate verification section
   */
  validateVerificationSection(section) {
    let isValid = true;
    let errors = [];

    const backgroundCheck = document.getElementById('background-check');
    if (backgroundCheck && !backgroundCheck.checked) {
      this.showFieldError(backgroundCheck, 'You must authorize the background check');
      isValid = false;
      errors.push('Background Check Authorization');
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
    // Remove existing error if present
    this.clearFieldError(field);

    // Add error class to field
    field.classList.add('error');

    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error-message';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');

    // Insert error message after field
    if (field.nextElementSibling && field.nextElementSibling.classList.contains('form-error-message')) {
      field.nextElementSibling.replaceWith(errorElement);
    } else {
      field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
  }

  /**
   * Clear field error
   */
  clearFieldError(field) {
    field.classList.remove('error');
    
    // Remove error message if present
    const errorElement = field.parentNode.querySelector('.form-error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  /**
   * Get error message for a field
   */
  getErrorMessage(fieldId) {
    const messages = {
      'full-name': 'Please enter your full name',
      'birth-month': 'Please select your birth month',
      'birth-day': 'Please select your birth day',
      'birth-year': 'Please select your birth year',
      'gender': 'Please select your gender',
      'email': 'Please enter a valid email address',
      'phone': 'Please enter a valid phone number',
      'country': 'Please select your country',
      'state': 'Please select your state/province',
      'city': 'Please select your city',
      'nationality': 'Please select your nationality',
      'faith-tradition': 'Please select your faith tradition',
      'church-involvement': 'Please select your level of church involvement',
      'faith-importance': 'Please select the importance of faith in your life',
      'values-selection': 'Please select at least one value',
      'relationship-goals': 'Please describe your relationship goals',
      'family-vision': 'Please describe your family vision',
      'references-name': 'Please enter reference name',
      'references-email': 'Please enter reference email',
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
    notification.className = 'validation-notification';
    notification.setAttribute('role', 'alert');
    
    const title = document.createElement('div');
    title.className = 'notification-title';
    title.textContent = 'Please complete all required fields';
    
    const message = document.createElement('div');
    message.className = 'notification-message';
    message.innerHTML = `
      <p>The following information is required to continue:</p>
      <ul>
        ${errors.map(error => `<li>${error}</li>`).join('')}
      </ul>
    `;
    
    const closeButton = document.createElement('button');
    closeButton.className = 'notification-close';
    closeButton.innerHTML = '×';
    closeButton.setAttribute('aria-label', 'Close notification');
    closeButton.addEventListener('click', () => notification.remove());
    
    notification.appendChild(closeButton);
    notification.appendChild(title);
    notification.appendChild(message);
    
    // Insert at the top of the form content
    const formContent = document.querySelector('.form-content');
    if (formContent) {
      formContent.insertBefore(notification, formContent.firstChild);
      
      // Auto-remove after 6 seconds
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
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
    errorFields.forEach(field => field.classList.remove('error'));

    this.errors = {};
  }
}

// Initialize validation when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  window.formValidation = new FormValidationComplete();
});

