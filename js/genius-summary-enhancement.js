/**
 * GENIUS SUMMARY ENHANCEMENT
 * Adds value and insights to the review section
 * Makes the summary truly exceptional and out-of-the-box
 */

(function() {
    'use strict';

    // Listen for section transitions
    document.addEventListener('sectionTransitioned', function(event) {
        if (event.detail && event.detail.section === 5) {
            setTimeout(() => {
                addGeniusEnhancements();
            }, 500);
        }
    });

    function addGeniusEnhancements() {
        const store = window.formDataStore;
        if (!store) return;

        // 1. Add Compatibility Score
        addCompatibilityScore(store);

        // 2. Add Profile Strength Indicator
        addProfileStrength(store);

        // 3. Add Personalized Insights
        addPersonalizedInsights(store);

        // 4. Add Timeline Visualization
        addTimelineVisualization(store);

        console.log('✨ Genius enhancements added to summary');
    }

    /**
     * Calculate and display compatibility score based on profile completeness
     */
    function addCompatibilityScore(store) {
        const score = calculateProfileScore(store);
        
        const scoreHTML = `
            <div class="genius-compatibility-score">
                <div class="score-circle">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="54" fill="none" stroke="#E5E7EB" stroke-width="8"/>
                        <circle cx="60" cy="60" r="54" fill="none" stroke="#D4AF37" stroke-width="8"
                                stroke-dasharray="${score.percentage * 3.39} 339"
                                stroke-linecap="round"
                                transform="rotate(-90 60 60)"
                                class="score-progress"/>
                    </svg>
                    <div class="score-text">
                        <div class="score-number">${score.percentage}%</div>
                        <div class="score-label">Match Ready</div>
                    </div>
                </div>
                <div class="score-description">
                    <h4>🎯 Your Profile Strength</h4>
                    <p>${score.message}</p>
                    ${score.tips.length > 0 ? `
                        <div class="score-tips">
                            <strong>💡 Quick Wins:</strong>
                            <ul>
                                ${score.tips.map(tip => `<li>${tip}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        const container = document.querySelector('.review-container');
        if (container) {
            const scoreDiv = document.createElement('div');
            scoreDiv.innerHTML = scoreHTML;
            container.insertBefore(scoreDiv.firstElementChild, container.firstChild);
        }
    }

    /**
     * Calculate profile completeness score
     */
    function calculateProfileScore(store) {
        const fields = {
            // Essential fields (10 points each)
            essential: [
                'full_name', 'email', 'gender', 'birth_month', 'birth_day', 'birth_year',
                'country', 'occupation', 'faith_tradition', 'relationship_goal'
            ],
            // Important fields (5 points each)
            important: [
                'phone', 'nationality', 'education', 'languages',
                'community_involvement', 'values_importance', 'values_journey',
                'previous_marriage', 'have_children', 'want_children',
                'partner_age_range', 'relocation_willingness'
            ],
            // Nice to have (2 points each)
            optional: [
                'city', 'state', 'family_vision', 'background_check_consent'
            ]
        };

        let totalPoints = 0;
        let earnedPoints = 0;
        const tips = [];

        // Calculate essential fields
        fields.essential.forEach(field => {
            totalPoints += 10;
            if (store[field] && store[field] !== '') {
                earnedPoints += 10;
            } else {
                tips.push(`Complete your ${field.replace(/_/g, ' ')}`);
            }
        });

        // Calculate important fields
        fields.important.forEach(field => {
            totalPoints += 5;
            if (store[field] && store[field] !== '') {
                earnedPoints += 5;
            }
        });

        // Calculate optional fields
        fields.optional.forEach(field => {
            totalPoints += 2;
            if (store[field] && store[field] !== '') {
                earnedPoints += 2;
            }
        });

        const percentage = Math.round((earnedPoints / totalPoints) * 100);

        let message = '';
        if (percentage >= 90) {
            message = 'Outstanding! Your profile is comprehensive and ready for matching.';
        } else if (percentage >= 75) {
            message = 'Great work! Your profile is strong and shows genuine commitment.';
        } else if (percentage >= 60) {
            message = 'Good start! A few more details will significantly improve your matches.';
        } else {
            message = 'Let\'s strengthen your profile to attract the right connections.';
        }

        return {
            percentage,
            message,
            tips: tips.slice(0, 3) // Show top 3 tips
        };
    }

    /**
     * Add profile strength indicators
     */
    function addProfileStrength(store) {
        const strengths = analyzeProfileStrengths(store);
        
        const strengthHTML = `
            <div class="genius-profile-strengths">
                <h4>✨ Your Profile Highlights</h4>
                <div class="strength-badges">
                    ${strengths.map(s => `
                        <div class="strength-badge ${s.level}">
                            <span class="badge-icon">${s.icon}</span>
                            <span class="badge-text">${s.text}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        const personalCard = document.querySelector('[data-section-card="personal"]');
        if (personalCard) {
            const strengthDiv = document.createElement('div');
            strengthDiv.innerHTML = strengthHTML;
            personalCard.appendChild(strengthDiv.firstElementChild);
        }
    }

    /**
     * Analyze profile to identify strengths
     */
    function analyzeProfileStrengths(store) {
        const strengths = [];

        // Check for multilingual
        if (Array.isArray(store.languages) && store.languages.length >= 3) {
            strengths.push({
                icon: '🌍',
                text: 'Multilingual Communicator',
                level: 'gold'
            });
        }

        // Check for education
        if (store.education === 'masters' || store.education === 'doctorate') {
            strengths.push({
                icon: '🎓',
                text: 'Highly Educated',
                level: 'gold'
            });
        }

        // Check for faith commitment
        if (store.values_importance === 'essential' || store.values_importance === 'very-important') {
            strengths.push({
                icon: '✟',
                text: 'Faith-Centered',
                level: 'gold'
            });
        }

        // Check for relocation flexibility
        if (store.relocation_willingness === 'yes') {
            strengths.push({
                icon: '🌎',
                text: 'Geographically Flexible',
                level: 'silver'
            });
        }

        // Check for family readiness
        if (store.want_children === 'yes') {
            strengths.push({
                icon: '👨\u200d👩\u200d👧\u200d👦',
                text: 'Family-Oriented',
                level: 'gold'
            });
        }

        // Check for clear intentions
        if (store.relationship_goal === 'marriage') {
            strengths.push({
                icon: '💍',
                text: 'Marriage-Minded',
                level: 'gold'
            });
        }

        return strengths.slice(0, 4); // Show top 4 strengths
    }

    /**
     * Add personalized insights based on profile data
     */
    function addPersonalizedInsights(store) {
        const insights = generateInsights(store);
        
        if (insights.length === 0) return;

        const insightsHTML = `
            <div class="genius-insights">
                <h4>💎 Personalized Insights</h4>
                <div class="insights-list">
                    ${insights.map(insight => `
                        <div class="insight-item">
                            <span class="insight-icon">${insight.icon}</span>
                            <p>${insight.text}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        const reviewContainer = document.querySelector('.review-container');
        if (reviewContainer) {
            const insightsDiv = document.createElement('div');
            insightsDiv.innerHTML = insightsHTML;
            reviewContainer.appendChild(insightsDiv.firstElementChild);
        }
    }

    /**
     * Generate personalized insights
     */
    function generateInsights(store) {
        const insights = [];

        // Age-based insight
        if (store.birth_year) {
            const age = new Date().getFullYear() - parseInt(store.birth_year);
            if (age >= 30 && age <= 40) {
                insights.push({
                    icon: '⏰',
                    text: 'You\'re in the prime age range for meaningful connections. Members in their 30s often find the most compatible matches.'
                });
            }
        }

        // Faith + Family insight
        if ((store.values_importance === 'essential' || store.values_importance === 'very-important') && 
            store.want_children === 'yes') {
            insights.push({
                icon: '🏡',
                text: 'Your combination of strong faith values and desire for family makes you highly compatible with our community\'s core mission.'
            });
        }

        // International profile insight
        if (store.relocation_willingness === 'yes' && Array.isArray(store.languages) && store.languages.length >= 2) {
            insights.push({
                icon: '✈️',
                text: 'Your international mindset and language skills open doors to connections across Paraguay and Europe.'
            });
        }

        // Professional insight
        if (store.occupation && store.education) {
            insights.push({
                icon: '💼',
                text: 'Your professional background and education level align well with our community of purpose-driven individuals.'
            });
        }

        return insights.slice(0, 3); // Show top 3 insights
    }

    /**
     * Add visual timeline of application journey
     */
    function addTimelineVisualization(store) {
        const milestones = [
            { icon: '📝', label: 'Application Started', status: 'complete' },
            { icon: '✅', label: 'Profile Complete', status: store.full_name ? 'complete' : 'pending' },
            { icon: '🔍', label: 'Under Review', status: 'pending' },
            { icon: '🤝', label: 'Matching Begins', status: 'future' },
            { icon: '💕', label: 'Connection Made', status: 'future' }
        ];

        const timelineHTML = `
            <div class="genius-timeline">
                <h4>🗺️ Your Journey</h4>
                <div class="timeline-steps">
                    ${milestones.map((m, i) => `
                        <div class="timeline-step ${m.status}">
                            <div class="step-icon">${m.icon}</div>
                            <div class="step-label">${m.label}</div>
                            ${i < milestones.length - 1 ? '<div class="step-connector"></div>' : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        const reviewContainer = document.querySelector('.review-container');
        if (reviewContainer) {
            const timelineDiv = document.createElement('div');
            timelineDiv.innerHTML = timelineHTML;
            reviewContainer.appendChild(timelineDiv.firstElementChild);
        }
    }

    // Make function globally available
    window.addGeniusEnhancements = addGeniusEnhancements;

})();

