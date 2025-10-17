/**
 * PRE-SCREENING QUIZ - Tessera Amoris
 * High-quality filtering for marriage-ready, faith-centered individuals
 * Strategic questions designed to identify alignment with core values
 */

// Quiz Questions (Research-based, strategically designed)
const quizQuestions = [
    {
        id: 1,
        question: "How does faith shape your daily life and major decisions?",
        options: [
            {
                letter: "A",
                text: "Faith is the foundation of my life. I pray daily, attend services regularly, and seek divine guidance in all major decisions including relationships and career.",
                points: 3
            },
            {
                letter: "B",
                text: "Faith is important to me. I attend services occasionally and pray when facing challenges, but I also rely heavily on my own judgment.",
                points: 1
            },
            {
                letter: "C",
                text: "I respect faith and traditions, but I make decisions based primarily on logic, personal goals, and practical considerations.",
                points: 0
            }
        ]
    },
    {
        id: 2,
        question: "What does your ideal timeline look like from meeting someone to marriage?",
        options: [
            {
                letter: "A",
                text: "6-18 months of intentional courtship focused on compatibility, family integration, and spiritual alignment. I'm ready to commit when I find the right person.",
                points: 3
            },
            {
                letter: "B",
                text: "2-3 years to really get to know someone through different life seasons. I believe in taking time to be absolutely certain before such a major commitment.",
                points: 1
            },
            {
                letter: "C",
                text: "I'm in no rush. I want to enjoy dating, travel together, and see how things naturally evolve over 3-5+ years before considering marriage.",
                points: 0
            }
        ]
    },
    {
        id: 3,
        question: "A successful Paraguay-Europe relationship requires significant cultural adaptation. How do you view this?",
        options: [
            {
                letter: "A",
                text: "I'm genuinely excited about learning a new culture, potentially relocating, learning a new language, and integrating two families. Cultural differences enrich relationships when both partners are committed.",
                points: 3
            },
            {
                letter: "B",
                text: "I'm open to it, but I'd need my partner to adapt significantly to my culture and lifestyle. I'm willing to make some adjustments, but I have clear boundaries.",
                points: 1
            },
            {
                letter: "C",
                text: "I prefer someone from my own cultural background. While I respect other cultures, I believe relationships are easier when both partners share the same cultural context.",
                points: 0
            }
        ]
    },
    {
        id: 4,
        question: "How do you envision your future family?",
        options: [
            {
                letter: "A",
                text: "I want 2-4 children raised in a faith-centered home where both parents are actively involved. Family dinners, regular worship, and strong extended family connections are essential to me.",
                points: 3
            },
            {
                letter: "B",
                text: "I'm open to 1-2 children if the relationship is right, but I also value maintaining our couple identity, careers, and personal freedom. Family is one important part of a fulfilling life.",
                points: 1
            },
            {
                letter: "C",
                text: "I'm undecided about children. I want to focus on my career and personal growth first. If children happen, great, but they're not a priority or requirement for my happiness.",
                points: 0
            }
        ]
    },
    {
        id: 5,
        question: "Which statement best describes your current life stage?",
        options: [
            {
                letter: "A",
                text: "I'm financially stable with a clear career path, emotionally mature from past experiences, and have a strong support system. I'm ready to build a life with the right partner.",
                points: 3
            },
            {
                letter: "B",
                text: "I'm working toward financial stability and still figuring out some aspects of my career and life direction. I'm open to growing together with a partner.",
                points: 1
            },
            {
                letter: "C",
                text: "I'm in a transition phase - changing careers, dealing with past relationship baggage, or working through personal challenges. I'm hoping a relationship will help me find direction.",
                points: 0
            }
        ]
    }
];

// Quiz State
let currentQuestionIndex = 0;
let answers = [];
let quizStartTime = null;

// DOM Elements
let quizOverlay, quizContainer, quizContent, progressFill, progressText;
let prevBtn, nextBtn;

/**
 * Initialize Quiz
 */
function initializeQuiz() {
    quizStartTime = new Date();
    
    // Get DOM elements
    quizOverlay = document.getElementById('quiz-modal-overlay');
    quizContainer = document.getElementById('quiz-container');
    quizContent = document.getElementById('quiz-content');
    progressFill = document.getElementById('quiz-progress-fill');
    progressText = document.getElementById('quiz-progress-text');
    prevBtn = document.getElementById('quiz-prev-btn');
    nextBtn = document.getElementById('quiz-next-btn');
    
    // Event listeners
    prevBtn.addEventListener('click', handlePrevious);
    nextBtn.addEventListener('click', handleNext);
    
    // Render first question
    renderQuestion();
    updateProgress();
    
    // Show quiz modal
    quizOverlay.classList.remove('hidden');
}

/**
 * Render current question
 */
function renderQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    
    const html = `
        <div class="quiz-question-container">
            <div class="quiz-question-number">Question ${currentQuestionIndex + 1} of ${quizQuestions.length}</div>
            <h2 class="quiz-question-text">${question.question}</h2>
            <div class="quiz-options-container">
                ${question.options.map((option, index) => `
                    <label class="quiz-option ${answers[currentQuestionIndex] === index ? 'selected' : ''}">
                        <input 
                            type="radio" 
                            name="question-${question.id}" 
                            value="${index}"
                            class="quiz-option-radio"
                            ${answers[currentQuestionIndex] === index ? 'checked' : ''}
                        >
                        <div class="quiz-option-content">
                            <div class="quiz-option-letter">${option.letter}</div>
                            <div class="quiz-option-text">${option.text}</div>
                            <div class="quiz-option-checkmark">✓</div>
                        </div>
                    </label>
                `).join('')}
            </div>
        </div>
    `;
    
    quizContent.innerHTML = html;
    
    // Add event listeners to options
    const options = quizContent.querySelectorAll('.quiz-option');
    options.forEach((option, index) => {
        option.addEventListener('click', () => selectOption(index));
    });
}

/**
 * Select an option
 */
function selectOption(optionIndex) {
    answers[currentQuestionIndex] = optionIndex;
    
    // Update UI
    const options = quizContent.querySelectorAll('.quiz-option');
    options.forEach((option, index) => {
        if (index === optionIndex) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

/**
 * Handle Previous button
 */
function handlePrevious() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
        updateProgress();
        updateButtons();
    }
}

/**
 * Handle Next button
 */
function handleNext() {
    // Validate answer selected
    if (answers[currentQuestionIndex] === undefined) {
        alert('Please select an answer before continuing.');
        return;
    }
    
    // Move to next question or show results
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
        updateProgress();
        updateButtons();
    } else {
        showResults();
    }
}

/**
 * Update progress bar and text
 */
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
}

/**
 * Update button states
 */
function updateButtons() {
    // Show/hide Previous button
    if (currentQuestionIndex === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
    }
    
    // Update Next button text
    if (currentQuestionIndex === quizQuestions.length - 1) {
        nextBtn.innerHTML = 'View Results →';
    } else {
        nextBtn.innerHTML = 'Next →';
    }
}

/**
 * Calculate quiz score
 */
function calculateScore() {
    let totalScore = 0;
    const responses = {};
    
    answers.forEach((answerIndex, questionIndex) => {
        const question = quizQuestions[questionIndex];
        const selectedOption = question.options[answerIndex];
        
        totalScore += selectedOption.points;
        
        responses[`q${questionIndex + 1}`] = {
            question: question.question,
            answer: selectedOption.text,
            points: selectedOption.points
        };
    });
    
    return {
        totalScore,
        maxScore: quizQuestions.length * 3,
        percentage: (totalScore / (quizQuestions.length * 3)) * 100,
        responses
    };
}

/**
 * Show quiz results
 */
function showResults() {
    const score = calculateScore();
    const quizEndTime = new Date();
    const timeSpent = Math.round((quizEndTime - quizStartTime) / 1000); // seconds
    
    let resultCategory, resultIcon, resultTitle, resultMessage, canProceed;
    
    // Determine result category
    if (score.percentage >= 87) {
        // 13-15 points - Highly Aligned
        resultCategory = 'highly-aligned';
        resultIcon = '✓';
        resultTitle = 'Welcome to Tessera Amoris';
        resultMessage = `
            <p>Your responses reveal a deep alignment with our community's values of <strong>faith, family, and purposeful partnership</strong>.</p>
            <p>You demonstrate the maturity, readiness, and cultural openness we seek in our members.</p>
            <p><strong>Please proceed with your full application.</strong> We look forward to learning more about you.</p>
        `;
        canProceed = true;
    } else if (score.percentage >= 60) {
        // 9-12 points - Aligned with Reflection
        resultCategory = 'aligned';
        resultIcon = '⚡';
        resultTitle = 'A Moment for Reflection';
        resultMessage = `
            <p>Your values show promise and alignment with our core principles.</p>
            <p>We encourage you to reflect on your readiness for the unique journey of <strong>cross-cultural, faith-centered partnership</strong>.</p>
            <p>If you feel truly prepared for this commitment, you may proceed. We recommend reviewing our <a href="index.html#our-vision">Vision</a> and <a href="index.html#our-process">Process</a> to ensure alignment.</p>
        `;
        canProceed = true;
    } else if (score.percentage >= 33) {
        // 5-8 points - Needs Reflection
        resultCategory = 'reflection';
        resultIcon = 'ℹ';
        resultTitle = 'Time for Deeper Reflection';
        resultMessage = `
            <p>We appreciate your interest in Tessera Amoris.</p>
            <p>Based on your responses, we sense you may be in an <strong>exploratory phase</strong> rather than ready for the deep commitment our community requires.</p>
            <p>We encourage you to take time to clarify your values, goals, and readiness. You're welcome to reapply when you feel more aligned with our mission of building <strong>lasting, faith-centered legacies</strong>.</p>
        `;
        canProceed = false;
    } else {
        // 0-4 points - Not Aligned
        resultCategory = 'not-aligned';
        resultIcon = '→';
        resultTitle = 'Thank You for Your Interest';
        resultMessage = `
            <p>We appreciate your honesty in completing this assessment.</p>
            <p>Based on your responses, we believe other platforms may be better suited to your current relationship goals and timeline.</p>
            <p>Tessera Amoris specializes in <strong>faith-centered, marriage-focused connections</strong> for individuals ready to build lasting cross-cultural legacies.</p>
            <p>We wish you the very best in your search for meaningful connection.</p>
        `;
        canProceed = false;
    }
    
    // Render results
    const html = `
        <div class="quiz-result-container">
            <div class="quiz-result-icon ${resultCategory}">${resultIcon}</div>
            <h2 class="quiz-result-title">${resultTitle}</h2>
            <div class="quiz-result-score">Score: ${score.totalScore} / ${score.maxScore} (${Math.round(score.percentage)}%)</div>
            <div class="quiz-result-message">${resultMessage}</div>
            <div class="quiz-result-actions">
                ${canProceed ? `
                    <button id="proceed-to-application" class="quiz-btn quiz-btn-primary quiz-btn-large">
                        Proceed to Application →
                    </button>
                ` : `
                    <a href="index.html" class="quiz-btn quiz-btn-primary quiz-btn-large">
                        Return to Homepage
                    </a>
                `}
            </div>
        </div>
    `;
    
    quizContent.innerHTML = html;
    
    // Hide footer buttons
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    
    // Hide progress bar
    document.querySelector('.quiz-progress-container').style.display = 'none';
    
    // Save quiz data
    saveQuizData({
        score: score.totalScore,
        maxScore: score.maxScore,
        percentage: score.percentage,
        category: resultCategory,
        responses: score.responses,
        timeSpent: timeSpent,
        completedAt: quizEndTime.toISOString()
    });
    
    // Add event listener to proceed button
    if (canProceed) {
        document.getElementById('proceed-to-application').addEventListener('click', () => {
            proceedToApplication();
        });
    }
}

/**
 * Save quiz data to localStorage (will be sent with application)
 */
function saveQuizData(quizData) {
    localStorage.setItem('tesseraQuizData', JSON.stringify(quizData));
}

/**
 * Proceed to application form
 */
function proceedToApplication() {
    // Hide quiz modal
    quizOverlay.classList.add('hidden');
    
    // Show application form
    const applicationForm = document.getElementById('application-form-container');
    if (applicationForm) {
        applicationForm.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * Get saved quiz data
 */
function getQuizData() {
    const data = localStorage.getItem('tesseraQuizData');
    return data ? JSON.parse(data) : null;
}

/**
 * Clear quiz data
 */
function clearQuizData() {
    localStorage.removeItem('tesseraQuizData');
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if quiz was already completed
    const existingQuizData = getQuizData();
    
    if (existingQuizData && existingQuizData.completedAt) {
        // Check if quiz was completed recently (within 24 hours)
        const completedTime = new Date(existingQuizData.completedAt);
        const now = new Date();
        const hoursSinceCompletion = (now - completedTime) / (1000 * 60 * 60);
        
        if (hoursSinceCompletion < 24 && existingQuizData.percentage >= 60) {
            // Quiz passed recently, skip directly to application
            const quizOverlay = document.getElementById('quiz-modal-overlay');
            if (quizOverlay) {
                quizOverlay.classList.add('hidden');
            }
            const applicationForm = document.getElementById('application-form-container');
            if (applicationForm) {
                applicationForm.style.display = 'block';
            }
            return;
        }
    }
    
    // Initialize quiz
    initializeQuiz();
});

// Export functions for use in application submission
window.TesseraQuiz = {
    getQuizData,
    clearQuizData
};

