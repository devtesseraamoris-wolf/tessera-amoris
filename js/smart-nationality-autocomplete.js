/**
 * Smart Nationality Autocomplete for Tessera Amoris
 * Provides intelligent, horizontally-styled autocomplete suggestions
 * with support for both horizontal and vertical layouts
 */

class SmartNationalityAutocomplete {
  constructor(inputSelector, options = {}) {
    this.input = document.querySelector(inputSelector);
    this.options = {
      layout: 'horizontal', // 'horizontal' or 'vertical'
      minChars: 1,
      maxSuggestions: 10,
      debounceDelay: 200,
      nationalities: null,
      ...options
    };

    this.defaultNationalities = this.getDefaultNationalities();
    this.nationalities = this.prepareNationalities(this.options.nationalities);

    this.selectedNationality = null;
    this.debounceTimer = null;
    this.suggestionsContainer = null;
    this.currentHighlightIndex = -1;

    if (this.input) {
      this.init();
    }
  }

  /**
   * Default curated list of nationalities
   */
  getDefaultNationalities() {
    return [
      'Paraguayan',
      'Spanish',
      'French',
      'German',
      'Italian',
      'Portuguese',
      'Polish',
      'Romanian',
      'Dutch',
      'Belgian',
      'Austrian',
      'Swiss',
      'Swedish',
      'Norwegian',
      'Danish',
      'Finnish',
      'Czech',
      'Slovak',
      'Hungarian',
      'Croatian',
      'Serbian',
      'Bulgarian',
      'Greek',
      'Slovenian',
      'Lithuanian',
      'Latvian',
      'Estonian',
      'Icelandic',
      'Irish',
      'British',
      'Russian',
      'Ukrainian',
      'Belarusian',
      'Moldovan',
      'Albanian',
      'Bosnian',
      'Montenegrin',
      'Macedonian',
      'Luxembourgish',
      'Maltese',
      'Cypriot',
      'Monégasque',
      'San Marinese',
      'Andorran',
      'Liechtensteiner'
    ];
  }

  /**
   * Prepare a sanitized, unique nationality list
   */
  prepareNationalities(nationalities) {
    const source = Array.isArray(nationalities) && nationalities.length
      ? nationalities
      : this.defaultNationalities;

    const cleaned = source
      .map((value) => typeof value === 'string' ? value.trim() : '')
      .filter(Boolean);

    return Array.from(new Set(cleaned));
  }

  /**
   * Initialize the autocomplete functionality
   */
  init() {
    this.input.setAttribute('autocomplete', 'off');
    this.createSuggestionsContainer();
    this.attachEventListeners();
  }

  /**
   * Create the suggestions container
   */
  createSuggestionsContainer() {
    const wrapper = this.input.parentElement;
    this.suggestionsContainer = document.createElement('div');
    this.suggestionsContainer.className = `nationality-suggestions nationality-suggestions-${this.options.layout}`;
    this.suggestionsContainer.setAttribute('role', 'listbox');
    this.suggestionsContainer.setAttribute('aria-label', 'Nationality suggestions');

    wrapper.appendChild(this.suggestionsContainer);
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    this.input.addEventListener('input', (e) => this.handleInput(e));
    this.input.addEventListener('focus', (e) => this.handleFocus(e));
    this.input.addEventListener('blur', (e) => this.handleBlur(e));
    this.input.addEventListener('keydown', (e) => this.handleKeydown(e));

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.input.parentElement.contains(e.target)) {
        this.closeSuggestions();
      }
    });
  }

  /**
   * Handle input event with debouncing
   */
  handleInput(event) {
    clearTimeout(this.debounceTimer);
    const value = event.target.value.trim();

    this.debounceTimer = setTimeout(() => {
      if (value.length >= this.options.minChars) {
        this.showSuggestions(value);
      } else {
        this.closeSuggestions();
      }
    }, this.options.debounceDelay);
  }

  /**
   * Handle focus event
   */
  handleFocus(event) {
    const value = event.target.value.trim();
    if (value.length >= this.options.minChars) {
      this.showSuggestions(value);
    }
  }

  /**
   * Handle blur event with delay to allow click on suggestions
   */
  handleBlur(event) {
    setTimeout(() => {
      this.closeSuggestions();
    }, 200);
  }

  /**
   * Handle keyboard navigation
   */
  handleKeydown(event) {
    if (!this.suggestionsContainer.classList.contains('active')) {
      return;
    }

    const items = this.suggestionsContainer.querySelectorAll('[role="option"]');

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.currentHighlightIndex = Math.min(this.currentHighlightIndex + 1, items.length - 1);
        this.highlightItem(items[this.currentHighlightIndex]);
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.currentHighlightIndex = Math.max(this.currentHighlightIndex - 1, -1);
        if (this.currentHighlightIndex >= 0) {
          this.highlightItem(items[this.currentHighlightIndex]);
        }
        break;

      case 'Enter':
        event.preventDefault();
        if (this.currentHighlightIndex >= 0 && items[this.currentHighlightIndex]) {
          this.selectItem(items[this.currentHighlightIndex]);
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.closeSuggestions();
        break;
    }
  }

  /**
   * Filter nationalities based on input
   */
  filterNationalities(query) {
    const lowerQuery = query.toLowerCase();
    return this.nationalities.filter(nationality =>
      nationality.toLowerCase().startsWith(lowerQuery)
    ).slice(0, this.options.maxSuggestions);
  }

  /**
   * Show suggestions
   */
  showSuggestions(query) {
    const filtered = this.filterNationalities(query);

    if (filtered.length === 0) {
      this.showNoResults();
      return;
    }

    this.suggestionsContainer.innerHTML = '';
    this.currentHighlightIndex = -1;

    if (this.options.layout === 'horizontal') {
      this.renderHorizontalSuggestions(filtered);
    } else {
      this.renderVerticalSuggestions(filtered);
    }

    this.suggestionsContainer.classList.add('active');
  }

  /**
   * Render horizontal suggestions layout
   */
  renderHorizontalSuggestions(items) {
    const container = document.createElement('div');
    container.className = 'nationality-suggestions-horizontal';

    items.forEach((nationality, index) => {
      const item = document.createElement('div');
      item.className = 'nationality-suggestion-item';
      item.setAttribute('role', 'option');
      item.setAttribute('data-index', index);
      item.textContent = nationality;

      item.addEventListener('click', () => this.selectItem(item));
      item.addEventListener('mouseenter', () => {
        this.currentHighlightIndex = index;
        this.highlightItem(item);
      });

      container.appendChild(item);
    });

    this.suggestionsContainer.appendChild(container);
  }

  /**
   * Render vertical suggestions layout
   */
  renderVerticalSuggestions(items) {
    items.forEach((nationality, index) => {
      const item = document.createElement('div');
      item.className = 'nationality-suggestion-item-vertical';
      item.setAttribute('role', 'option');
      item.setAttribute('data-index', index);
      item.textContent = nationality;

      item.addEventListener('click', () => this.selectItem(item));
      item.addEventListener('mouseenter', () => {
        this.currentHighlightIndex = index;
        this.highlightItem(item);
      });

      this.suggestionsContainer.appendChild(item);
    });
  }

  /**
   * Highlight an item
   */
  highlightItem(item) {
    const allItems = this.suggestionsContainer.querySelectorAll('[role="option"]');
    allItems.forEach(el => {
      el.classList.remove('selected');
      if (this.options.layout === 'horizontal') {
        el.classList.remove('selected');
      } else {
        el.classList.remove('selected');
      }
    });

    if (item) {
      item.classList.add('selected');
      // Scroll into view if needed
      item.scrollIntoView({ block: 'nearest' });
    }
  }

  /**
   * Select an item
   */
  selectItem(item) {
    const nationality = item.textContent.trim();
    this.setNationality(nationality, { silent: true });
    this.closeSuggestions();

    // Dispatch custom event
    this.input.dispatchEvent(new CustomEvent('nationalitySelected', {
      detail: { nationality }
    }));
  }

  /**
   * Show no results message
   */
  showNoResults() {
    this.suggestionsContainer.innerHTML = `
      <div class="nationality-no-results">
        No nationalities found matching your search
      </div>
    `;
    this.suggestionsContainer.classList.add('active');
  }

  /**
   * Close suggestions
   */
  closeSuggestions() {
    this.suggestionsContainer.classList.remove('active');
    this.suggestionsContainer.innerHTML = '';
    this.currentHighlightIndex = -1;
  }

  /**
   * Get selected nationality
   */
  getSelected() {
    return this.selectedNationality || this.input.value;
  }

  /**
   * Set nationality programmatically
   */
  setNationality(nationality, options = {}) {
    const normalized = typeof nationality === 'string' ? nationality.trim() : '';
    if (!normalized) {
      return;
    }

    if (!this.nationalities.includes(normalized) && options.allowCustom) {
      this.addCustomNationality(normalized);
    }

    if (this.nationalities.includes(normalized)) {
      this.input.value = normalized;
      this.selectedNationality = normalized;

      if (!options.silent) {
        this.input.dispatchEvent(new CustomEvent('nationalitySelected', {
          detail: { nationality: normalized }
        }));
      }
    }
  }

  /**
   * Clear selection
   */
  clear() {
    this.input.value = '';
    this.selectedNationality = null;
    this.closeSuggestions();
  }

  /**
   * Add custom nationality to the list
   */
  addCustomNationality(nationality) {
    const normalized = typeof nationality === 'string' ? nationality.trim() : '';
    if (!normalized) {
      return;
    }

    if (!this.nationalities.includes(normalized)) {
      this.nationalities = this.prepareNationalities([...this.nationalities, normalized]);
    }
  }

  /**
   * Public helper to open suggestions programmatically
   */
  open(query = '') {
    const value = typeof query === 'string' ? query : this.input.value;
    if (value.length >= this.options.minChars) {
      this.showSuggestions(value);
    }
  }
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SmartNationalityAutocomplete;
}

