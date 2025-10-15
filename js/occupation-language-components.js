// Sophisticated Occupation Filter and Language Selection Components

class SophisticatedOccupationFilter {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        this.occupationCategories = {
            'Business & Finance': [
                'CEO/Executive', 'Investment Banker', 'Financial Advisor', 'Accountant', 'Business Analyst',
                'Management Consultant', 'Entrepreneur', 'Sales Manager', 'Marketing Director', 'Project Manager',
                'Operations Manager', 'Business Development', 'Corporate Lawyer', 'Investment Manager', 'Risk Analyst'
            ],
            'Healthcare & Medicine': [
                'Physician', 'Surgeon', 'Dentist', 'Pharmacist', 'Nurse', 'Physical Therapist',
                'Psychologist', 'Psychiatrist', 'Veterinarian', 'Medical Researcher', 'Healthcare Administrator',
                'Radiologist', 'Anesthesiologist', 'Cardiologist', 'Pediatrician'
            ],
            'Technology & Engineering': [
                'Software Engineer', 'Data Scientist', 'Product Manager', 'UX/UI Designer', 'DevOps Engineer',
                'Cybersecurity Specialist', 'AI/ML Engineer', 'Systems Architect', 'Civil Engineer', 'Mechanical Engineer',
                'Electrical Engineer', 'Aerospace Engineer', 'Chemical Engineer', 'Biomedical Engineer', 'IT Director'
            ],
            'Education & Research': [
                'Professor', 'Teacher', 'Principal', 'Educational Administrator', 'Research Scientist',
                'Academic Researcher', 'Librarian', 'Curriculum Developer', 'Educational Consultant',
                'School Counselor', 'Training Specialist', 'Instructional Designer'
            ],
            'Legal & Government': [
                'Attorney', 'Judge', 'Paralegal', 'Government Official', 'Policy Analyst', 'Diplomat',
                'Public Administrator', 'Legislative Assistant', 'Compliance Officer', 'Legal Counsel',
                'Immigration Lawyer', 'Patent Attorney', 'Public Defender'
            ],
            'Arts & Media': [
                'Artist', 'Designer', 'Writer', 'Journalist', 'Photographer', 'Filmmaker', 'Musician',
                'Actor', 'Producer', 'Editor', 'Creative Director', 'Art Director', 'Curator', 'Publicist'
            ],
            'Real Estate & Construction': [
                'Real Estate Agent', 'Property Developer', 'Architect', 'Construction Manager', 'Urban Planner',
                'Real Estate Investor', 'Property Manager', 'Interior Designer', 'Contractor', 'Surveyor'
            ],
            'Hospitality & Service': [
                'Hotel Manager', 'Restaurant Owner', 'Chef', 'Event Planner', 'Travel Agent', 'Concierge',
                'Customer Service Manager', 'Retail Manager', 'Personal Trainer', 'Spa Manager'
            ],
            'Non-Profit & Social Services': [
                'Social Worker', 'Non-Profit Director', 'Community Organizer', 'Counselor', 'Therapist',
                'Humanitarian Worker', 'Fundraiser', 'Program Coordinator', 'Volunteer Coordinator'
            ],
            'Other Professions': [
                'Pilot', 'Military Officer', 'Police Officer', 'Firefighter', 'Farmer', 'Rancher',
                'Translator', 'Consultant', 'Freelancer', 'Retired', 'Student', 'Homemaker'
            ]
        };
        
        this.createOccupationFilter();
    }

    createOccupationFilter() {
        const container = document.createElement('div');
        container.className = 'sophisticated-occupation-filter';
        
        // Create search input
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'occupation-search';
        searchInput.placeholder = 'Search for your occupation...';
        
        // Create dropdown container
        const dropdownContainer = document.createElement('div');
        dropdownContainer.className = 'occupation-dropdown';
        
        // Create categories
        Object.entries(this.occupationCategories).forEach(([category, occupations]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'occupation-category';
            
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'category-header';
            categoryHeader.textContent = category;
            categoryDiv.appendChild(categoryHeader);
            
            const occupationsList = document.createElement('div');
            occupationsList.className = 'occupations-list';
            
            occupations.forEach(occupation => {
                const occupationItem = document.createElement('div');
                occupationItem.className = 'occupation-item';
                occupationItem.textContent = occupation;
                occupationItem.addEventListener('click', () => {
                    this.selectOccupation(occupation, searchInput, dropdownContainer);
                });
                occupationsList.appendChild(occupationItem);
            });
            
            categoryDiv.appendChild(occupationsList);
            dropdownContainer.appendChild(categoryDiv);
        });
        
        container.appendChild(searchInput);
        container.appendChild(dropdownContainer);
        
        // Replace original input
        this.element.parentNode.replaceChild(container, this.element);
        
        // Create hidden input for form submission
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.id = this.element.id;
        hiddenInput.name = this.element.name;
        container.appendChild(hiddenInput);
        
        // Add search functionality
        this.setupSearch(searchInput, dropdownContainer);
        this.setupDropdownToggle(searchInput, dropdownContainer);
    }

    selectOccupation(occupation, searchInput, dropdownContainer) {
        searchInput.value = occupation;
        const hiddenInput = searchInput.parentNode.querySelector('input[type="hidden"]');
        hiddenInput.value = occupation;
        dropdownContainer.style.display = 'none';
        searchInput.classList.add('selected');
    }

    setupSearch(searchInput, dropdownContainer) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const categories = dropdownContainer.querySelectorAll('.occupation-category');
            
            categories.forEach(category => {
                const occupations = category.querySelectorAll('.occupation-item');
                let hasVisibleOccupations = false;
                
                occupations.forEach(occupation => {
                    if (occupation.textContent.toLowerCase().includes(searchTerm)) {
                        occupation.style.display = 'block';
                        hasVisibleOccupations = true;
                    } else {
                        occupation.style.display = 'none';
                    }
                });
                
                category.style.display = hasVisibleOccupations ? 'block' : 'none';
            });
        });
    }

    setupDropdownToggle(searchInput, dropdownContainer) {
        searchInput.addEventListener('focus', () => {
            dropdownContainer.style.display = 'block';
        });
        
        document.addEventListener('click', (e) => {
            if (!searchInput.parentNode.contains(e.target)) {
                dropdownContainer.style.display = 'none';
            }
        });
    }
}

class SophisticatedLanguageSelector {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        this.languages = [
            'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese (Mandarin)',
            'Japanese', 'Korean', 'Arabic', 'Hindi', 'Bengali', 'Urdu', 'Turkish', 'Persian', 'Hebrew',
            'Dutch', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Polish', 'Czech', 'Hungarian',
            'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Slovak', 'Slovenian', 'Lithuanian',
            'Latvian', 'Estonian', 'Greek', 'Albanian', 'Macedonian', 'Bosnian', 'Montenegrin',
            'Ukrainian', 'Belarusian', 'Georgian', 'Armenian', 'Azerbaijani', 'Kazakh', 'Uzbek',
            'Kyrgyz', 'Tajik', 'Turkmen', 'Mongolian', 'Thai', 'Vietnamese', 'Cambodian', 'Lao',
            'Burmese', 'Malay', 'Indonesian', 'Filipino', 'Tagalog', 'Swahili', 'Amharic', 'Yoruba',
            'Igbo', 'Hausa', 'Zulu', 'Xhosa', 'Afrikaans', 'Guaraní'
        ];
        
        this.selectedLanguages = [];
        this.createLanguageSelector();
    }

    createLanguageSelector() {
        const container = document.createElement('div');
        container.className = 'sophisticated-language-selector';
        
        // Create selected languages display
        const selectedContainer = document.createElement('div');
        selectedContainer.className = 'selected-languages';
        
        // Create search input
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'language-search';
        searchInput.placeholder = 'Type to search languages...';
        
        // Create dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'language-dropdown';
        
        this.languages.forEach(language => {
            const languageItem = document.createElement('div');
            languageItem.className = 'language-item';
            languageItem.textContent = language;
            languageItem.addEventListener('click', () => {
                this.toggleLanguage(language, selectedContainer, searchInput);
            });
            dropdown.appendChild(languageItem);
        });
        
        container.appendChild(selectedContainer);
        container.appendChild(searchInput);
        container.appendChild(dropdown);
        
        // Replace original input
        this.element.parentNode.replaceChild(container, this.element);
        
        // Create hidden input for form submission
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.id = this.element.id;
        hiddenInput.name = this.element.name;
        container.appendChild(hiddenInput);
        
        this.setupSearch(searchInput, dropdown);
        this.setupDropdownToggle(searchInput, dropdown);
    }

    toggleLanguage(language, selectedContainer, searchInput) {
        const index = this.selectedLanguages.indexOf(language);
        
        if (index > -1) {
            // Remove language
            this.selectedLanguages.splice(index, 1);
        } else {
            // Add language
            this.selectedLanguages.push(language);
        }
        
        this.updateSelectedDisplay(selectedContainer);
        this.updateHiddenInput();
        searchInput.value = '';
        this.filterLanguages('');
    }

    updateSelectedDisplay(selectedContainer) {
        selectedContainer.innerHTML = '';
        
        this.selectedLanguages.forEach(language => {
            const tag = document.createElement('div');
            tag.className = 'language-tag';
            tag.innerHTML = `
                <span>${language}</span>
                <button type="button" class="remove-language" data-language="${language}">×</button>
            `;
            
            tag.querySelector('.remove-language').addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleLanguage(language, selectedContainer, 
                    selectedContainer.parentNode.querySelector('.language-search'));
            });
            
            selectedContainer.appendChild(tag);
        });
        
        if (this.selectedLanguages.length === 0) {
            const placeholder = document.createElement('div');
            placeholder.className = 'languages-placeholder';
            placeholder.textContent = 'Select languages you speak...';
            selectedContainer.appendChild(placeholder);
        }
    }

    updateHiddenInput() {
        const hiddenInput = this.element.parentNode.querySelector('input[type="hidden"]');
        hiddenInput.value = this.selectedLanguages.join(', ');
    }

    setupSearch(searchInput, dropdown) {
        searchInput.addEventListener('input', (e) => {
            this.filterLanguages(e.target.value.toLowerCase());
        });
    }

    filterLanguages(searchTerm) {
        const languageItems = document.querySelectorAll('.language-item');
        
        languageItems.forEach(item => {
            const language = item.textContent.toLowerCase();
            const isSelected = this.selectedLanguages.includes(item.textContent);
            
            if (language.includes(searchTerm) && !isSelected) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    setupDropdownToggle(searchInput, dropdown) {
        searchInput.addEventListener('focus', () => {
            dropdown.style.display = 'block';
            this.filterLanguages(searchInput.value.toLowerCase());
        });
        
        document.addEventListener('click', (e) => {
            if (!searchInput.parentNode.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
    }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize occupation filter if element exists
    const occupationInput = document.getElementById('occupation');
    if (occupationInput) {
        new SophisticatedOccupationFilter('occupation');
    }

    // Initialize language selector if element exists
    const languagesInput = document.getElementById('languages');
    if (languagesInput) {
        new SophisticatedLanguageSelector('languages');
    }
});
