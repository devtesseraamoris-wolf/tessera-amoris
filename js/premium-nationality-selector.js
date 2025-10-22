/**
 * Premium Nationality Selector for Tessera Amoris
 * Sophisticated autocomplete with elegant styling and smart filtering
 * Supports both horizontal (pills) and vertical (dropdown) layouts
 */

class PremiumNationalitySelector {
  constructor(inputSelector, options = {}) {
    this.inputElement = document.querySelector(inputSelector);
    this.options = {
      layout: options.layout || 'sophisticated', // 'sophisticated', 'pills', or 'dropdown'
      minChars: options.minChars || 1,
      maxSuggestions: options.maxSuggestions || 12,
      debounceDelay: options.debounceDelay || 200,
      highlightMatches: options.highlightMatches !== false,
      showFlags: options.showFlags !== false,
      ...options
    };

    this.nationalities = this.getNationalities();
    this.selectedNationality = null;
    this.debounceTimer = null;
    this.suggestionsContainer = null;
    this.isOpen = false;

    if (this.inputElement) {
      this.init();
    }
  }

  /**
   * Get comprehensive list of nationalities
   */
  getNationalities() {
    return [
      { name: "Paraguayan", flag: "🇵🇾", code: "PY" },
      { name: "Spanish", flag: "🇪🇸", code: "ES" },
      { name: "French", flag: "🇫🇷", code: "FR" },
      { name: "German", flag: "🇩🇪", code: "DE" },
      { name: "Italian", flag: "🇮🇹", code: "IT" },
      { name: "British", flag: "🇬🇧", code: "GB" },
      { name: "Dutch", flag: "🇳🇱", code: "NL" },
      { name: "Belgian", flag: "🇧🇪", code: "BE" },
      { name: "Austrian", flag: "🇦🇹", code: "AT" },
      { name: "Swiss", flag: "🇨🇭", code: "CH" },
      { name: "Swedish", flag: "🇸🇪", code: "SE" },
      { name: "Norwegian", flag: "🇳🇴", code: "NO" },
      { name: "Danish", flag: "🇩🇰", code: "DK" },
      { name: "Finnish", flag: "🇫🇮", code: "FI" },
      { name: "Polish", flag: "🇵🇱", code: "PL" },
      { name: "Czech", flag: "🇨🇿", code: "CZ" },
      { name: "Slovak", flag: "🇸🇰", code: "SK" },
      { name: "Hungarian", flag: "🇭🇺", code: "HU" },
      { name: "Romanian", flag: "🇷🇴", code: "RO" },
      { name: "Bulgarian", flag: "🇧🇬", code: "BG" },
      { name: "Croatian", flag: "🇭🇷", code: "HR" },
      { name: "Slovenian", flag: "🇸🇮", code: "SI" },
      { name: "Greek", flag: "🇬🇷", code: "GR" },
      { name: "Latvian", flag: "🇱🇻", code: "LV" },
      { name: "Lithuanian", flag: "🇱🇹", code: "LT" },
      { name: "Estonian", flag: "🇪🇪", code: "EE" },
      { name: "Icelandic", flag: "🇮🇸", code: "IS" },
      { name: "Irish", flag: "🇮🇪", code: "IE" },
      { name: "Maltese", flag: "🇲🇹", code: "MT" },
      { name: "Monégasque", flag: "🇲🇨", code: "MC" },
      { name: "San Marinese", flag: "🇸🇲", code: "SM" },
      { name: "Andorran", flag: "🇦🇩", code: "AD" },
      { name: "Liechtensteiner", flag: "🇱🇮", code: "LI" },
      { name: "Cypriot", flag: "🇨🇾", code: "CY" },
      { name: "Russian", flag: "🇷🇺", code: "RU" },
      { name: "Ukrainian", flag: "🇺🇦", code: "UA" },
      { name: "Belarusian", flag: "🇧🇾", code: "BY" },
      { name: "Moldovan", flag: "🇲🇩", code: "MD" },
      { name: "Albanian", flag: "🇦🇱", code: "AL" },
      { name: "Bosnian", flag: "🇧🇦", code: "BA" },
      { name: "Montenegrin", flag: "🇲🇪", code: "ME" },
      { name: "Macedonian", flag: "🇲🇰", code: "MK" },
      { name: "Kosovar", flag: "🇽🇰", code: "XK" },
      { name: "Luxembourgish", flag: "🇱🇺", code: "LU" }
    ];
  }

  /**
   * Initialize the selector
   */
  init() {
    this.createSuggestionsContainer();
    this.attachEventListeners();
    this.applyStyles();
  }

  /**
   * Create the suggestions container with sophisticated styling
   */
  createSuggestionsContainer() {
    this.suggestionsContainer = document.createElement('div');
    this.suggestionsContainer.className = 'premium-nationality-suggestions';
    this.suggestionsContainer.style.display = 'none';
    this.suggestionsContainer.setAttribute('role', 'listbox');

    this.inputElement.parentNode.insertBefore(this.suggestionsContainer, this.inputElement.nextSibling);
  }

  /**
   * Apply premium styling
   */
  applyStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .premium-nationality-input {
        position: relative;
        width: 100%;
      }

      .premium-nationality-input input {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #d4af8a;
        border-radius: 8px;
        font-size: 16px;
        font-family: inherit;
        transition: all 0.3s ease;
        background: linear-gradient(to bottom, #fafafa, #ffffff);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }

      .premium-nationality-input input:focus {
        outline: none;
        border-color: #8b7355;
        box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1);
        background: #ffffff;
      }

      .premium-nationality-input input::placeholder {
        color: #999;
      }

      .premium-nationality-suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #ffffff;
        border: 2px solid #d4af8a;
        border-top: none;
        border-radius: 0 0 8px 8px;
        max-height: 320px;
        overflow-y: auto;
        z-index: 1000;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
      }

      .premium-nationality-suggestions.open {
        display: block;
      }

      .premium-nationality-suggestion {
        padding: 12px 16px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid #f0f0f0;
      }

      .premium-nationality-suggestion:last-child {
        border-bottom: none;
      }

      .premium-nationality-suggestion:hover {
        background: linear-gradient(to right, rgba(212, 175, 138, 0.08), transparent);
        padding-left: 20px;
      }

      .premium-nationality-suggestion.active {
        background: linear-gradient(to right, rgba(212, 175, 138, 0.15), transparent);
        color: #8b7355;
        font-weight: 500;
      }

      .premium-nationality-suggestion .flag {
        font-size: 20px;
        min-width: 24px;
        text-align: center;
      }

      .premium-nationality-suggestion .name {
        flex: 1;
        color: #333;
      }

      .premium-nationality-suggestion .highlight {
        color: #8b7355;
        font-weight: 600;
        background: rgba(212, 175, 138, 0.2);
        padding: 0 2px;
        border-radius: 2px;
      }

      .premium-nationality-suggestion .code {
        font-size: 12px;
        color: #999;
        font-weight: 500;
        letter-spacing: 1px;
      }

      .premium-nationality-empty {
        padding: 20px 16px;
        text-align: center;
        color: #999;
        font-style: italic;
      }

      /* Scrollbar styling */
      .premium-nationality-suggestions::-webkit-scrollbar {
        width: 6px;
      }

      .premium-nationality-suggestions::-webkit-scrollbar-track {
        background: #f5f5f5;
      }

      .premium-nationality-suggestions::-webkit-scrollbar-thumb {
        background: #d4af8a;
        border-radius: 3px;
      }

      .premium-nationality-suggestions::-webkit-scrollbar-thumb:hover {
        background: #8b7355;
      }
    `;

    if (!document.querySelector('style[data-premium-nationality]')) {
      style.setAttribute('data-premium-nationality', 'true');
      document.head.appendChild(style);
    }
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    this.inputElement.addEventListener('input', (e) => this.handleInput(e));
    this.inputElement.addEventListener('focus', () => this.handleFocus());
    this.inputElement.addEventListener('keydown', (e) => this.handleKeydown(e));
    document.addEventListener('click', (e) => this.handleDocumentClick(e));
  }

  /**
   * Handle input event with debouncing
   */
  handleInput(e) {
    const value = e.target.value;

    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.filterAndDisplay(value);
    }, this.options.debounceDelay);
  }

  /**
   * Handle focus event
   */
  handleFocus() {
    if (this.inputElement.value.length >= this.options.minChars) {
      this.filterAndDisplay(this.inputElement.value);
    } else {
      this.displayAll();
    }
  }

  /**
   * Handle keyboard navigation
   */
  handleKeydown(e) {
    const suggestions = this.suggestionsContainer.querySelectorAll('.premium-nationality-suggestion');
    const activeElement = this.suggestionsContainer.querySelector('.premium-nationality-suggestion.active');
    let activeIndex = Array.from(suggestions).indexOf(activeElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        activeIndex = (activeIndex + 1) % suggestions.length;
        this.setActive(suggestions[activeIndex]);
        break;

      case 'ArrowUp':
        e.preventDefault();
        activeIndex = activeIndex === 0 ? suggestions.length - 1 : activeIndex - 1;
        this.setActive(suggestions[activeIndex]);
        break;

      case 'Enter':
        e.preventDefault();
        if (activeElement) {
          activeElement.click();
        }
        break;

      case 'Escape':
        e.preventDefault();
        this.close();
        break;
    }
  }

  /**
   * Handle document click to close suggestions
   */
  handleDocumentClick(e) {
    if (!this.inputElement.contains(e.target) && !this.suggestionsContainer.contains(e.target)) {
      this.close();
    }
  }

  /**
   * Filter and display suggestions
   */
  filterAndDisplay(query) {
    const filtered = this.nationalities.filter((nat) =>
      nat.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
      this.displayEmpty();
      return;
    }

    this.displaySuggestions(filtered.slice(0, this.options.maxSuggestions), query);
  }

  /**
   * Display all nationalities
   */
  displayAll() {
    this.displaySuggestions(this.nationalities.slice(0, this.options.maxSuggestions), '');
  }

  /**
   * Display suggestions
   */
  displaySuggestions(suggestions, query) {
    this.suggestionsContainer.innerHTML = '';

    suggestions.forEach((nat, index) => {
      const item = document.createElement('div');
      item.className = 'premium-nationality-suggestion';
      item.setAttribute('role', 'option');
      item.setAttribute('data-value', nat.name);

      const flag = document.createElement('span');
      flag.className = 'flag';
      flag.textContent = nat.flag;

      const name = document.createElement('span');
      name.className = 'name';

      if (query && this.options.highlightMatches) {
        const regex = new RegExp(`(${query})`, 'gi');
        name.innerHTML = nat.name.replace(regex, '<span class="highlight">$1</span>');
      } else {
        name.textContent = nat.name;
      }

      const code = document.createElement('span');
      code.className = 'code';
      code.textContent = nat.code;

      item.appendChild(flag);
      item.appendChild(name);
      item.appendChild(code);

      item.addEventListener('click', () => this.selectNationality(nat));
      item.addEventListener('mouseenter', () => this.setActive(item));

      this.suggestionsContainer.appendChild(item);
    });

    this.open();

    // Set first item as active
    const firstItem = this.suggestionsContainer.querySelector('.premium-nationality-suggestion');
    if (firstItem) {
      this.setActive(firstItem);
    }
  }

  /**
   * Display empty state
   */
  displayEmpty() {
    this.suggestionsContainer.innerHTML = '<div class="premium-nationality-empty">No nationalities found</div>';
    this.open();
  }

  /**
   * Set active suggestion
   */
  setActive(element) {
    this.suggestionsContainer.querySelectorAll('.premium-nationality-suggestion').forEach((item) => {
      item.classList.remove('active');
    });

    if (element) {
      element.classList.add('active');
      element.scrollIntoView({ block: 'nearest' });
    }
  }

  /**
   * Select a nationality
   */
  selectNationality(nationality) {
    this.selectedNationality = nationality;
    this.inputElement.value = nationality.name;
    this.close();
    this.inputElement.dispatchEvent(new Event('change', { bubbles: true }));
  }

  /**
   * Open suggestions container
   */
  open() {
    this.suggestionsContainer.classList.add('open');
    this.isOpen = true;
  }

  /**
   * Close suggestions container
   */
  close() {
    this.suggestionsContainer.classList.remove('open');
    this.isOpen = false;
  }

  /**
   * Get selected nationality
   */
  getSelected() {
    return this.selectedNationality;
  }

  /**
   * Get selected nationality name
   */
  getSelectedName() {
    return this.selectedNationality?.name || this.inputElement.value;
  }

  /**
   * Set value programmatically
   */
  setValue(value) {
    const nationality = this.nationalities.find((nat) => nat.name.toLowerCase() === value.toLowerCase());
    if (nationality) {
      this.selectNationality(nationality);
    } else {
      this.inputElement.value = value;
      this.selectedNationality = null;
    }
  }

  /**
   * Clear selection
   */
  clear() {
    this.inputElement.value = '';
    this.selectedNationality = null;
    this.close();
  }
}

