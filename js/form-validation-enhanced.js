/**
 * Enhanced Form Validation for Tessera Amoris Application
 * Comprehensive validation for all form sections
 */

class FormValidationEnhanced {
  constructor() {
    this.errors = {};
    this.requiredFields = {
      1: ['full-name', 'birth-month', 'birth-day', 'birth-year', 'gender', 'email', 'phone', 'country', 'state', 'city', 'nationality'],
      2: ['faith-tradition', 'church-involvement', 'faith-importance', 'values-selection'],
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
      return true;
    }

    const requiredFieldIds = this.requiredFields[sectionIndex] || [];
    let isValid = true;

    // Validate each required field
    requiredFieldIds.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      
      if (!field) {
        console.warn(`Field ${fieldId} not found in section ${sectionIndex}`);
        return;
      }

      const fieldValue = this.getFieldValue(field);
      
      if (!this.isFieldValid(fieldId, fieldValue, field)) {
        isValid = false;
        this.showFieldError(field, this.getErrorMessage(fieldId));
      } else {
        this.clearFieldError(field);
      }
    });

    // Special validations
    if (sectionIndex === 1) {
      isValid = this.validatePersonalSection(section) && isValid;
    } else if (sectionIndex === 2) {
      isValid = this.validateFaithSection(section) && isValid;
    } else if (sectionIndex === 3) {
      isValid = this.validateRelationshipSection(section) && isValid;
    } else if (sectionIndex === 4) {
      isValid = this.validateVerificationSection(section) && isValid;
    }

    return isValid;
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

    // Check if all date fields are filled
    const birthMonth = document.getElementById('birth-month');
    const birthDay = document.getElementById('birth-day');
    const birthYear = document.getElementById('birth-year');

    if (!birthMonth.value || !birthDay.value || !birthYear.value) {
      this.showFieldError(birthMonth, 'Please select a complete date of birth');
      isValid = false;
    } else {
      this.clearFieldError(birthMonth);
    }

    // Validate age (must be at least 18)
    const age = this.calculateAge(birthYear.value, birthMonth.value, birthDay.value);
    if (age < 18) {
      this.showFieldError(birthYear, 'You must be at least 18 years old');
      isValid = false;
    }

    return isValid;
  }

  /**
   * Validate faith and values section
   */
  validateFaithSection(section) {
    let isValid = true;

    // Check if at least one value is selected
    const selectedValues = document.querySelectorAll('.value-tag.selected');
    if (selectedValues.length === 0) {
      const valuesContainer = document.querySelector('.value-tags');
      if (valuesContainer) {
        this.showFieldError(valuesContainer, 'Please select at least one value');
        isValid = false;
      }
    }

    return isValid;
  }

  /**
   * Validate relationship section
   */
  validateRelationshipSection(section) {
    let isValid = true;

    const relationshipGoals = document.getElementById('relationship-goals');
    if (relationshipGoals && !relationshipGoals.value.trim()) {
      this.showFieldError(relationshipGoals, 'Please describe your relationship goals');
      isValid = false;
    }

    return isValid;
  }

  /**
   * Validate verification section
   */
  validateVerificationSection(section) {
    let isValid = true;

    const backgroundCheck = document.getElementById('background-check');
    if (backgroundCheck && !backgroundCheck.checked) {
      this.showFieldError(backgroundCheck, 'You must authorize the background check');
      isValid = false;
    }

    return isValid;
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
  window.formValidation = new FormValidationEnhanced();
});

