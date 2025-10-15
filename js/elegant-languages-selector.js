// Elegant Languages Selector JavaScript

const languagesData = [
    // Popular languages first
    { name: 'English', code: 'en', popular: true },
    { name: 'Spanish', code: 'es', popular: true },
    { name: 'Portuguese', code: 'pt', popular: true },
    { name: 'French', code: 'fr', popular: true },
    { name: 'German', code: 'de', popular: true },
    { name: 'Italian', code: 'it', popular: true },
    { name: 'Russian', code: 'ru', popular: true },
    { name: 'Chinese (Mandarin)', code: 'zh', popular: true },
    
    // All other languages alphabetically
    { name: 'Arabic', code: 'ar' },
    { name: 'Bengali', code: 'bn' },
    { name: 'Bulgarian', code: 'bg' },
    { name: 'Catalan', code: 'ca' },
    { name: 'Croatian', code: 'hr' },
    { name: 'Czech', code: 'cs' },
    { name: 'Danish', code: 'da' },
    { name: 'Dutch', code: 'nl' },
    { name: 'Estonian', code: 'et' },
    { name: 'Finnish', code: 'fi' },
    { name: 'Greek', code: 'el' },
    { name: 'Guaraní', code: 'gn' },
    { name: 'Hebrew', code: 'he' },
    { name: 'Hindi', code: 'hi' },
    { name: 'Hungarian', code: 'hu' },
    { name: 'Icelandic', code: 'is' },
    { name: 'Indonesian', code: 'id' },
    { name: 'Irish', code: 'ga' },
    { name: 'Japanese', code: 'ja' },
    { name: 'Korean', code: 'ko' },
    { name: 'Latvian', code: 'lv' },
    { name: 'Lithuanian', code: 'lt' },
    { name: 'Malay', code: 'ms' },
    { name: 'Norwegian', code: 'no' },
    { name: 'Persian', code: 'fa' },
    { name: 'Polish', code: 'pl' },
    { name: 'Romanian', code: 'ro' },
    { name: 'Serbian', code: 'sr' },
    { name: 'Slovak', code: 'sk' },
    { name: 'Slovenian', code: 'sl' },
    { name: 'Swedish', code: 'sv' },
    { name: 'Thai', code: 'th' },
    { name: 'Turkish', code: 'tr' },
    { name: 'Ukrainian', code: 'uk' },
    { name: 'Urdu', code: 'ur' },
    { name: 'Vietnamese', code: 'vi' },
    { name: 'Welsh', code: 'cy' }
];

class ElegantLanguagesSelector {
    constructor() {
        this.container = document.querySelector('.elegant-languages-selector');
        this.searchInput = document.getElementById('languages-search');
        this.suggestionsContainer = document.getElementById('languages-suggestions');
        this.tagsContainer = document.querySelector('.selected-languages-tags');
        this.hiddenInput = document.getElementById('languages');
        this.selectedLanguagesContainer = document.querySelector('.selected-languages-container');
        
        this.selectedLanguages = [];
        this.currentHighlight = -1;
        
        this.init();
    }
    
    init() {
        if (!this.container || !this.searchInput) return;
        
        this.bindEvents();
        this.createPopularLanguages();
        this.updateContainerState();
    }
    
    bindEvents() {
        // Search input events
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        this.searchInput.addEventListener('focus', () => this.showSuggestions());
        this.searchInput.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Container click to focus input
        this.selectedLanguagesContainer.addEventListener('click', () => {
            this.searchInput.focus();
        });
        
        // Click outside to hide suggestions
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.elegant-languages-selector')) {
                this.hideSuggestions();
            }
        });
    }
    
    createPopularLanguages() {
        const popularLanguages = languagesData.filter(lang => lang.popular);
        
        const popularSection = document.createElement('div');
        popularSection.className = 'popular-languages';
        popularSection.innerHTML = `
            <div class="popular-languages-title">Popular Languages</div>
            <div class="popular-languages-list"></div>
        `;
        
        const popularList = popularSection.querySelector('.popular-languages-list');
        
        popularLanguages.forEach(language => {
            if (!this.isLanguageSelected(language.name)) {
                const chip = document.createElement('div');
                chip.className = 'popular-language-chip';
                chip.textContent = language.name;
                chip.addEventListener('click', () => this.selectLanguage(language.name));
                popularList.appendChild(chip);
            }
        });
        
        this.suggestionsContainer.appendChild(popularSection);
    }
    
    handleSearch(query) {
        if (query.length === 0) {
            this.showPopularLanguages();
            return;
        }
        
        const suggestions = this.searchLanguages(query);
        this.displaySuggestions(suggestions);
        this.currentHighlight = -1;
    }
    
    searchLanguages(query) {
        const queryLower = query.toLowerCase();
        return languagesData
            .filter(lang => 
                lang.name.toLowerCase().includes(queryLower) && 
                !this.isLanguageSelected(lang.name)
            )
            .slice(0, 8);
    }
    
    displaySuggestions(suggestions) {
        // Clear existing suggestions except popular languages
        const popularSection = this.suggestionsContainer.querySelector('.popular-languages');
        this.suggestionsContainer.innerHTML = '';
        
        if (suggestions.length === 0) {
            this.hideSuggestions();
            return;
        }
        
        suggestions.forEach((language, index) => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.className = 'language-suggestion';
            suggestionDiv.dataset.index = index;
            suggestionDiv.innerHTML = `
                <div class="language-flag">${this.getLanguageFlag(language.code)}</div>
                <span>${language.name}</span>
            `;
            
            suggestionDiv.addEventListener('click', () => this.selectLanguage(language.name));
            this.suggestionsContainer.appendChild(suggestionDiv);
        });
        
        this.showSuggestions();
    }
    
    showPopularLanguages() {
        this.suggestionsContainer.innerHTML = '';
        this.createPopularLanguages();
        this.showSuggestions();
    }
    
    showSuggestions() {
        this.suggestionsContainer.classList.add('show');
    }
    
    hideSuggestions() {
        this.suggestionsContainer.classList.remove('show');
        this.currentHighlight = -1;
    }
    
    handleKeydown(e) {
        const suggestions = this.suggestionsContainer.querySelectorAll('.language-suggestion');
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.currentHighlight = Math.min(this.currentHighlight + 1, suggestions.length - 1);
                this.updateHighlight();
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                this.currentHighlight = Math.max(this.currentHighlight - 1, -1);
                this.updateHighlight();
                break;
                
            case 'Enter':
                e.preventDefault();
                if (this.currentHighlight >= 0 && suggestions[this.currentHighlight]) {
                    const languageName = suggestions[this.currentHighlight].textContent.trim();
                    this.selectLanguage(languageName);
                } else if (this.searchInput.value.trim()) {
                    // Allow custom language entry
                    this.selectLanguage(this.searchInput.value.trim());
                }
                break;
                
            case 'Escape':
                this.hideSuggestions();
                this.searchInput.blur();
                break;
                
            case 'Backspace':
                if (this.searchInput.value === '' && this.selectedLanguages.length > 0) {
                    // Remove last selected language
                    this.removeLanguage(this.selectedLanguages[this.selectedLanguages.length - 1]);
                }
                break;
        }
    }
    
    updateHighlight() {
        const suggestions = this.suggestionsContainer.querySelectorAll('.language-suggestion');
        suggestions.forEach((suggestion, index) => {
            suggestion.classList.toggle('highlighted', index === this.currentHighlight);
        });
    }
    
    selectLanguage(languageName) {
        if (this.isLanguageSelected(languageName)) return;
        
        this.selectedLanguages.push(languageName);
        this.createLanguageTag(languageName);
        this.updateHiddenInput();
        this.updateContainerState();
        
        // Clear search and hide suggestions
        this.searchInput.value = '';
        this.hideSuggestions();
        this.searchInput.focus();
        
        // Update popular languages
        this.showPopularLanguages();
    }
    
    createLanguageTag(languageName) {
        const tag = document.createElement('div');
        tag.className = 'language-tag';
        tag.innerHTML = `
            <span>${languageName}</span>
            <button type="button" class="language-tag-remove" title="Remove ${languageName}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        tag.querySelector('.language-tag-remove').addEventListener('click', () => {
            this.removeLanguage(languageName);
        });
        
        this.tagsContainer.appendChild(tag);
    }
    
    removeLanguage(languageName) {
        this.selectedLanguages = this.selectedLanguages.filter(lang => lang !== languageName);
        
        // Remove tag from DOM
        const tags = this.tagsContainer.querySelectorAll('.language-tag');
        tags.forEach(tag => {
            if (tag.textContent.includes(languageName)) {
                tag.remove();
            }
        });
        
        this.updateHiddenInput();
        this.updateContainerState();
        this.showPopularLanguages();
    }
    
    updateHiddenInput() {
        this.hiddenInput.value = this.selectedLanguages.join(', ');
        
        // Trigger validation
        const event = new Event('change', { bubbles: true });
        this.hiddenInput.dispatchEvent(event);
    }
    
    updateContainerState() {
        this.selectedLanguagesContainer.classList.toggle('empty', this.selectedLanguages.length === 0);
        
        // Update validation state
        if (this.selectedLanguages.length > 0) {
            this.container.classList.remove('error');
            this.container.classList.add('valid');
        } else {
            this.container.classList.remove('valid');
        }
    }
    
    isLanguageSelected(languageName) {
        return this.selectedLanguages.includes(languageName);
    }
    
    getLanguageFlag(code) {
        // Simple flag representation using emoji or letters
        const flags = {
            'en': '🇺🇸', 'es': '🇪🇸', 'pt': '🇧🇷', 'fr': '🇫🇷', 'de': '🇩🇪',
            'it': '🇮🇹', 'ru': '🇷🇺', 'zh': '🇨🇳', 'ar': '🇸🇦', 'ja': '🇯🇵',
            'ko': '🇰🇷', 'gn': '🇵🇾'
        };
        return flags[code] || '🌐';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ElegantLanguagesSelector();
});
