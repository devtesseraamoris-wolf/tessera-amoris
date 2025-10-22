/**
 * Advanced Nationality Autocomplete for Tessera Amoris
 * Sophisticated, elegant autocomplete with smart suggestions and premium UX
 */

class AdvancedNationalityAutocomplete {
  constructor(inputSelector, options = {}) {
    this.inputElement = document.querySelector(inputSelector);
    this.options = {
      minChars: options.minChars || 1,
      maxSuggestions: options.maxSuggestions || 10,
      debounceDelay: options.debounceDelay || 150,
      highlightMatches: options.highlightMatches !== false,
      showFlags: options.showFlags !== false,
      ...options
    };

    this.nationalities = this.getNationalities();
    this.selectedNationality = null;
    this.debounceTimer = null;
    this.suggestionsContainer = null;
    this.isOpen = false;
    this.highlightedIndex = -1;

    if (this.inputElement) {
      this.init();
    }
  }

  /**
   * Get comprehensive list of nationalities with metadata
   */
  getNationalities() {
    return [
      { name: "Paraguayan", flag: "🇵🇾", code: "PY", region: "South America" },
      { name: "Spanish", flag: "🇪🇸", code: "ES", region: "Europe" },
      { name: "French", flag: "🇫🇷", code: "FR", region: "Europe" },
      { name: "German", flag: "🇩🇪", code: "DE", region: "Europe" },
      { name: "Italian", flag: "🇮🇹", code: "IT", region: "Europe" },
      { name: "British", flag: "🇬🇧", code: "GB", region: "Europe" },
      { name: "Dutch", flag: "🇳🇱", code: "NL", region: "Europe" },
      { name: "Belgian", flag: "🇧🇪", code: "BE", region: "Europe" },
      { name: "Austrian", flag: "🇦🇹", code: "AT", region: "Europe" },
      { name: "Swiss", flag: "🇨🇭", code: "CH", region: "Europe" },
      { name: "Swedish", flag: "🇸🇪", code: "SE", region: "Europe" },
      { name: "Norwegian", flag: "🇳🇴", code: "NO", region: "Europe" },
      { name: "Danish", flag: "🇩🇰", code: "DK", region: "Europe" },
      { name: "Finnish", flag: "🇫🇮", code: "FI", region: "Europe" },
      { name: "Polish", flag: "🇵🇱", code: "PL", region: "Europe" },
      { name: "Czech", flag: "🇨🇿", code: "CZ", region: "Europe" },
      { name: "Slovak", flag: "🇸🇰", code: "SK", region: "Europe" },
      { name: "Hungarian", flag: "🇭🇺", code: "HU", region: "Europe" },
      { name: "Romanian", flag: "🇷🇴", code: "RO", region: "Europe" },
      { name: "Bulgarian", flag: "🇧🇬", code: "BG", region: "Europe" },
      { name: "Croatian", flag: "🇭🇷", code: "HR", region: "Europe" },
      { name: "Slovenian", flag: "🇸🇮", code: "SI", region: "Europe" },
      { name: "Greek", flag: "🇬🇷", code: "GR", region: "Europe" },
      { name: "Latvian", flag: "🇱🇻", code: "LV", region: "Europe" },
      { name: "Lithuanian", flag: "🇱🇹", code: "LT", region: "Europe" },
      { name: "Estonian", flag: "🇪🇪", code: "EE", region: "Europe" },
      { name: "Icelandic", flag: "🇮🇸", code: "IS", region: "Europe" },
      { name: "Irish", flag: "🇮🇪", code: "IE", region: "Europe" },
      { name: "Maltese", flag: "🇲🇹", code: "MT", region: "Europe" },
      { name: "Monégasque", flag: "🇲🇨", code: "MC", region: "Europe" },
      { name: "San Marinese", flag: "🇸🇲", code: "SM", region: "Europe" },
      { name: "Andorran", flag: "🇦🇩", code: "AD", region: "Europe" },
      { name: "Liechtensteiner", flag: "🇱🇮", code: "LI", region: "Europe" },
      { name: "Cypriot", flag: "🇨🇾", code: "CY", region: "Europe" },
      { name: "Russian", flag: "🇷🇺", code: "RU", region: "Europe" },
      { name: "Ukrainian", flag: "🇺🇦", code: "UA", region: "Europe" },
      { name: "Belarusian", flag: "🇧🇾", code: "BY", region: "Europe" },
      { name: "Moldovan", flag: "🇲🇩", code: "MD", region: "Europe" },
      { name: "Albanian", flag: "🇦🇱", code: "AL", region: "Europe" },
      { name: "Bosnian", flag: "🇧🇦", code: "BA", region: "Europe" },
      { name: "Montenegrin", flag: "🇲🇪", code: "ME", region: "Europe" },
      { name: "Macedonian", flag: "🇲🇰", code: "MK", region: "Europe" },
      { name: "Kosovar", flag: "🇽🇰", code: "XK", region: "Europe" },
      { name: "Luxembourgish", flag: "🇱🇺", code: "LU", region: "Europe" }
    ];
  }

  /**
   * Initialize the autocomplete
   */
  init() {
    this.createSuggestionsContainer();
    this.attachEventListeners();
    this.injectStyles();
  }

  /**
   * Create the suggestions container
   */
  createSuggestionsContainer() {
    this.suggestionsContainer = document.createElement('div');
    this.suggestionsContainer.className = 'advanced-nationality-suggestions';
    this.suggestionsContainer.setAttribute('role', 'listbox');
    this.suggestionsContainer.setAttribute('aria-label', 'Nationality suggestions');

    this.inputElement.parentNode.insertBefore(this.suggestionsContainer, this.inputElement.nextSibling);
  }

  /**
   * Inject premium styles
   */
  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .advanced-nationality-input-wrapper {
        position: relative;
        width: 100%;
      }

      .advanced-nationality-input-wrapper input {
        width: 100%;
        padding: 14px 18px;
        border: 2px solid #d4af8a;
        border-radius: 10px;
        font-size: 16px;
        font-family: 'Montserrat', sans-serif;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        letter-spacing: 0.3px;
      }

      .advanced-nationality-input-wrapper input:focus {
        outline: none;
        border-color: #8b7355;
        box-shadow: 0 0 0 4px rgba(139, 115, 85, 0.08), 0 6px 16px rgba(0, 0, 0, 0.08);
        background: #ffffff;
        transform: translateY(-1px);
      }

      .advanced-nationality-input-wrapper input::placeholder {
        color: #a0a0a0;
        font-weight: 300;
      }

      .advanced-nationality-suggestions {
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        right: 0;
        background: #ffffff;
        border: 1px solid #e8e8e8;
        border-radius: 12px;
        max-height: 380px;
        overflow-y: auto;
        overflow-x: hidden;
        z-index: 1000;
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
        backdrop-filter: blur(10px);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-8px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: none;
      }

      .advanced-nationality-suggestions.open {
        display: block;
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .advanced-nationality-suggestion {
        padding: 14px 18px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 14px;
        border-bottom: 1px solid #f5f5f5;
        position: relative;
        overflow: hidden;
      }

      .advanced-nationality-suggestion::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: linear-gradient(to bottom, #d4af8a, #8b7355);
        transform: scaleY(0);
        transition: transform 0.3s ease;
      }

      .advanced-nationality-suggestion:last-child {
        border-bottom: none;
      }

      .advanced-nationality-suggestion:hover {
        background: linear-gradient(to right, rgba(212, 175, 138, 0.06), transparent);
        padding-left: 24px;
      }

      .advanced-nationality-suggestion:hover::before {
        transform: scaleY(1);
      }

      .advanced-nationality-suggestion.active {
        background: linear-gradient(to right, rgba(212, 175, 138, 0.12), transparent);
        color: #8b7355;
      }

      .advanced-nationality-suggestion .flag {
        font-size: 24px;
        min-width: 28px;
        text-align: center;
        flex-shrink: 0;
      }

      .advanced-nationality-suggestion .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .advanced-nationality-suggestion .name {
        color: #333;
        font-weight: 500;
        font-size: 15px;
        letter-spacing: 0.2px;
      }

      .advanced-nationality-suggestion .region {
        color: #999;
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0.3px;
        text-transform: uppercase;
      }

      .advanced-nationality-suggestion .highlight {
        color: #8b7355;
        font-weight: 700;
        background: rgba(212, 175, 138, 0.25);
        padding: 0 3px;
        border-radius: 3px;
      }

      .advanced-nationality-suggestion .code {
        font-size: 11px;
        color: #bbb;
        font-weight: 600;
        letter-spacing: 1.2px;
        flex-shrink: 0;
        margin-left: 8px;
      }

      .advanced-nationality-empty {
        padding: 32px 18px;
        text-align: center;
        color: #999;
        font-style: italic;
        font-size: 14px;
      }

      /* Scrollbar styling */
      .advanced-nationality-suggestions::-webkit-scrollbar {
        width: 6px;
      }

      .advanced-nationality-suggestions::-webkit-scrollbar-track {
        background: transparent;
      }

      .advanced-nationality-suggestions::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #d4af8a, #8b7355);
        border-radius: 3px;
      }

      .advanced-nationality-suggestions::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #8b7355, #6b5345);
      }

      /* Mobile responsiveness */
      @media (max-width: 768px) {
        .advanced-nationality-input-wrapper input {
          padding: 12px 14px;
          font-size: 16px;
        }

        .advanced-nationality-suggestion {
          padding: 12px 14px;
          gap: 10px;
        }

        .advanced-nationality-suggestion .flag {
          font-size: 20px;
          min-width: 24px;
        }

        .advanced-nationality-suggestion .name {
          font-size: 14px;
        }
      }
    `;

    if (!document.querySelector('style[data-advanced-nationality]')) {
      style.setAttribute('data-advanced-nationality', 'true');
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
   * Handle input with debouncing
   */
  handleInput(e) {
    const value = e.target.value;

    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      if (value.length >= this.options.minChars) {
        this.filterAndDisplay(value);
      } else if (value.length === 0) {
        this.displayAll();
      } else {
        this.close();
      }
    }, this.options.debounceDelay);
  }

  /**
   * Handle focus
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
    const suggestions = this.suggestionsContainer.querySelectorAll('.advanced-nationality-suggestion');

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.highlightedIndex = (this.highlightedIndex + 1) % suggestions.length;
        this.setHighlighted(suggestions[this.highlightedIndex]);
        break;

      case 'ArrowUp':
        e.preventDefault();
        this.highlightedIndex = this.highlightedIndex === 0 ? suggestions.length - 1 : this.highlightedIndex - 1;
        this.setHighlighted(suggestions[this.highlightedIndex]);
        break;

      case 'Enter':
        e.preventDefault();
        if (this.highlightedIndex >= 0 && suggestions[this.highlightedIndex]) {
          suggestions[this.highlightedIndex].click();
        }
        break;

      case 'Escape':
        e.preventDefault();
        this.close();
        break;
    }
  }

  /**
   * Handle document click
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
    const lowerQuery = query.toLowerCase();
    const filtered = this.nationalities.filter((nat) => {
      const nameMatch = nat.name.toLowerCase().includes(lowerQuery);
      const codeMatch = nat.code.toLowerCase().startsWith(lowerQuery);
      return nameMatch || codeMatch;
    });

    // Sort by relevance
    filtered.sort((a, b) => {
      const aStartsWith = a.name.toLowerCase().startsWith(lowerQuery);
      const bStartsWith = b.name.toLowerCase().startsWith(lowerQuery);
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      return a.name.localeCompare(b.name);
    });

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
    this.highlightedIndex = -1;

    suggestions.forEach((nat) => {
      const item = document.createElement('div');
      item.className = 'advanced-nationality-suggestion';
      item.setAttribute('role', 'option');
      item.setAttribute('data-value', nat.name);

      const flag = document.createElement('span');
      flag.className = 'flag';
      flag.textContent = nat.flag;

      const content = document.createElement('div');
      content.className = 'content';

      const name = document.createElement('span');
      name.className = 'name';

      if (query && this.options.highlightMatches) {
        const regex = new RegExp(`(${query})`, 'gi');
        name.innerHTML = nat.name.replace(regex, '<span class="highlight">$1</span>');
      } else {
        name.textContent = nat.name;
      }

      const region = document.createElement('span');
      region.className = 'region';
      region.textContent = nat.region;

      content.appendChild(name);
      content.appendChild(region);

      const code = document.createElement('span');
      code.className = 'code';
      code.textContent = nat.code;

      item.appendChild(flag);
      item.appendChild(content);
      item.appendChild(code);

      item.addEventListener('click', () => this.selectNationality(nat));
      item.addEventListener('mouseenter', () => {
        this.highlightedIndex = Array.from(suggestions).indexOf(nat);
        this.setHighlighted(item);
      });

      this.suggestionsContainer.appendChild(item);
    });

    this.open();
  }

  /**
   * Display empty state
   */
  displayEmpty() {
    this.suggestionsContainer.innerHTML = '<div class="advanced-nationality-empty">No nationalities found. Please try another search.</div>';
    this.open();
  }

  /**
   * Set highlighted suggestion
   */
  setHighlighted(element) {
    this.suggestionsContainer.querySelectorAll('.advanced-nationality-suggestion').forEach((item) => {
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
   * Open suggestions
   */
  open() {
    this.suggestionsContainer.classList.add('open');
    this.isOpen = true;
  }

  /**
   * Close suggestions
   */
  close() {
    this.suggestionsContainer.classList.remove('open');
    this.isOpen = false;
    this.highlightedIndex = -1;
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
   * Clear selection
   */
  clear() {
    this.inputElement.value = '';
    this.selectedNationality = null;
    this.close();
  }
}

