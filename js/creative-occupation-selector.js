// Creative Occupation Selector JavaScript

const occupationData = {
    business: [
        "CEO/Executive", "Manager", "Business Analyst", "Consultant", "Entrepreneur", 
        "Sales Representative", "Marketing Manager", "Financial Advisor", "Accountant", 
        "Investment Banker", "Real Estate Agent", "Project Manager", "Operations Manager",
        "Business Development", "Strategic Planner", "Corporate Trainer"
    ],
    healthcare: [
        "Doctor/Physician", "Nurse", "Dentist", "Pharmacist", "Physical Therapist", 
        "Psychologist", "Psychiatrist", "Surgeon", "Veterinarian", "Medical Technician",
        "Healthcare Administrator", "Nutritionist", "Occupational Therapist", "Radiologist",
        "Paramedic", "Medical Researcher"
    ],
    technology: [
        "Software Engineer", "Data Scientist", "Web Developer", "IT Manager", "Cybersecurity Specialist",
        "Product Manager", "UX/UI Designer", "DevOps Engineer", "Database Administrator", 
        "Systems Analyst", "Network Administrator", "Mobile App Developer", "AI/ML Engineer",
        "Cloud Architect", "Technical Writer", "QA Engineer"
    ],
    education: [
        "Teacher", "Professor", "Principal", "Education Administrator", "School Counselor",
        "Librarian", "Tutor", "Curriculum Developer", "Educational Consultant", "Researcher",
        "Training Coordinator", "Academic Advisor", "Special Education Teacher", "Coach",
        "Educational Technology Specialist"
    ],
    legal: [
        "Lawyer/Attorney", "Judge", "Legal Assistant", "Paralegal", "Legal Consultant",
        "Corporate Counsel", "Public Defender", "Prosecutor", "Legal Researcher", 
        "Compliance Officer", "Contract Specialist", "Patent Attorney", "Immigration Lawyer",
        "Family Law Attorney", "Criminal Defense Attorney"
    ],
    creative: [
        "Artist", "Designer", "Writer", "Photographer", "Musician", "Actor", "Director",
        "Architect", "Interior Designer", "Fashion Designer", "Graphic Designer", 
        "Video Editor", "Content Creator", "Journalist", "Marketing Creative", "Art Director",
        "Animator", "Film Producer"
    ],
    engineering: [
        "Civil Engineer", "Mechanical Engineer", "Electrical Engineer", "Chemical Engineer",
        "Aerospace Engineer", "Environmental Engineer", "Biomedical Engineer", "Industrial Engineer",
        "Structural Engineer", "Software Engineer", "Petroleum Engineer", "Nuclear Engineer",
        "Materials Engineer", "Agricultural Engineer", "Mining Engineer"
    ],
    others: []
};

class CreativeOccupationSelector {
    constructor() {
        this.searchInput = document.getElementById('occupation-search');
        this.categoriesContainer = document.getElementById('occupation-categories');
        this.suggestionsContainer = document.getElementById('occupation-suggestions');
        this.hiddenInput = document.getElementById('occupation');
        this.selectedCategory = null;
        this.selectedOccupation = null;
        
        this.init();
    }
    
    init() {
        if (!this.searchInput || !this.categoriesContainer) return;
        
        this.bindEvents();
        this.createSelectedOccupationDisplay();
    }
    
    bindEvents() {
        // Search input events
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        this.searchInput.addEventListener('focus', () => this.showSuggestions());
        
        // Category click events
        this.categoriesContainer.addEventListener('click', (e) => {
            const category = e.target.closest('.occupation-category');
            if (category) {
                this.handleCategoryClick(category);
            }
        });
        
        // Click outside to hide suggestions
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.occupation-selector-container')) {
                this.hideSuggestions();
            }
        });
    }
    
    createSelectedOccupationDisplay() {
        const container = document.querySelector('.occupation-selector-container');
        const selectedDiv = document.createElement('div');
        selectedDiv.className = 'selected-occupation';
        selectedDiv.innerHTML = `
            <span class="selected-occupation-text"></span>
            <button type="button" class="selected-occupation-remove" title="Remove selection">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        selectedDiv.querySelector('.selected-occupation-remove').addEventListener('click', () => {
            this.clearSelection();
        });
        
        container.appendChild(selectedDiv);
        this.selectedDisplay = selectedDiv;
    }
    
    handleSearch(query) {
        if (query.length < 2) {
            this.hideSuggestions();
            return;
        }
        
        const suggestions = this.searchOccupations(query);
        this.displaySuggestions(suggestions);
    }
    
    searchOccupations(query) {
        const results = [];
        const queryLower = query.toLowerCase();
        
        Object.keys(occupationData).forEach(category => {
            if (category !== 'others') {
                occupationData[category].forEach(occupation => {
                    if (occupation.toLowerCase().includes(queryLower)) {
                        results.push({
                            occupation,
                            category,
                            categoryName: this.getCategoryName(category)
                        });
                    }
                });
            }
        });
        
        return results.slice(0, 8); // Limit to 8 suggestions
    }
    
    displaySuggestions(suggestions) {
        if (suggestions.length === 0) {
            this.hideSuggestions();
            return;
        }
        
        this.suggestionsContainer.innerHTML = '';
        
        suggestions.forEach(item => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.className = 'occupation-suggestion';
            suggestionDiv.innerHTML = `
                <strong>${item.occupation}</strong>
                <small style="color: #7f8c8d; margin-left: 8px;">${item.categoryName}</small>
            `;
            
            suggestionDiv.addEventListener('click', () => {
                this.selectOccupation(item.occupation, item.category);
            });
            
            this.suggestionsContainer.appendChild(suggestionDiv);
        });
        
        this.showSuggestions();
    }
    
    showSuggestions() {
        this.suggestionsContainer.style.display = 'block';
    }
    
    hideSuggestions() {
        this.suggestionsContainer.style.display = 'none';
    }
    
    handleCategoryClick(categoryElement) {
        const category = categoryElement.dataset.category;
        
        // Add selection animation
        categoryElement.classList.add('selecting');
        setTimeout(() => categoryElement.classList.remove('selecting'), 200);
        
        if (category === 'others') {
            this.handleOthersCategory();
        } else {
            this.showCategoryOccupations(category);
        }
    }
    
    handleOthersCategory() {
        // Create custom input for Others
        let customInput = document.querySelector('.custom-occupation-input');
        if (!customInput) {
            customInput = document.createElement('div');
            customInput.className = 'custom-occupation-input';
            customInput.innerHTML = `
                <input type="text" placeholder="Please specify your occupation..." maxlength="100">
                <button type="button" class="custom-occupation-confirm">Confirm</button>
            `;
            
            const input = customInput.querySelector('input');
            const confirmBtn = customInput.querySelector('.custom-occupation-confirm');
            
            // Prevent input from closing when typing
            input.addEventListener('click', (e) => e.stopPropagation());
            input.addEventListener('keydown', (e) => e.stopPropagation());
            input.addEventListener('input', (e) => {
                e.stopPropagation();
                // Enable confirm button when there's text
                confirmBtn.disabled = !e.target.value.trim();
            });
            
            // Handle Enter key
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                    this.selectOccupation(e.target.value.trim(), 'others');
                }
            });
            
            // Handle confirm button
            confirmBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const value = input.value.trim();
                if (value) {
                    this.selectOccupation(value, 'others');
                }
            });
            
            // Prevent the container from closing when clicking inside
            customInput.addEventListener('click', (e) => e.stopPropagation());
            
            document.querySelector('.occupation-selector-container').appendChild(customInput);
        }
        
        customInput.classList.add('show');
        const input = customInput.querySelector('input');
        input.focus();
        input.value = ''; // Clear any previous value
        customInput.querySelector('.custom-occupation-confirm').disabled = true;
    }
    
    showCategoryOccupations(category) {
        const occupations = occupationData[category];
        this.displaySuggestions(occupations.map(occ => ({
            occupation: occ,
            category,
            categoryName: this.getCategoryName(category)
        })));
    }
    
    selectOccupation(occupation, category) {
        this.selectedOccupation = occupation;
        this.selectedCategory = category;
        
        // Update hidden input
        this.hiddenInput.value = occupation;
        
        // Update search input
        this.searchInput.value = occupation;
        
        // Show selected occupation
        this.selectedDisplay.querySelector('.selected-occupation-text').textContent = occupation;
        this.selectedDisplay.classList.add('show');
        
        // Hide suggestions and custom input
        this.hideSuggestions();
        const customInput = document.querySelector('.custom-occupation-input');
        if (customInput) {
            customInput.classList.remove('show');
        }
        
        // Update category visual state
        this.updateCategoryStates(category);
    }
    
    updateCategoryStates(selectedCategory) {
        const categories = document.querySelectorAll('.occupation-category');
        categories.forEach(cat => {
            cat.classList.remove('selected');
            if (cat.dataset.category === selectedCategory) {
                cat.classList.add('selected');
            }
        });
    }
    
    clearSelection() {
        this.selectedOccupation = null;
        this.selectedCategory = null;
        this.hiddenInput.value = '';
        this.searchInput.value = '';
        this.selectedDisplay.classList.remove('show');
        
        // Clear category states
        document.querySelectorAll('.occupation-category').forEach(cat => {
            cat.classList.remove('selected');
        });
        
        // Hide custom input
        const customInput = document.querySelector('.custom-occupation-input');
        if (customInput) {
            customInput.classList.remove('show');
        }
        
        this.hideSuggestions();
    }
    
    getCategoryName(category) {
        const names = {
            business: 'Business & Finance',
            healthcare: 'Healthcare',
            technology: 'Technology',
            education: 'Education',
            legal: 'Legal',
            creative: 'Creative Arts',
            engineering: 'Engineering',
            others: 'Others'
        };
        return names[category] || category;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CreativeOccupationSelector();
});
