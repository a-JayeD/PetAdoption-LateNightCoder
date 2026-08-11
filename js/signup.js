// ============================================
// ENHANCED QUIZ FUNCTIONS
// ============================================

// Quiz questions data
const quizQuestionsNew = [
    {
        id: 1,
        title: "What type of home do you live in?",
        type: "single-select",
        options: [
            { icon: "🏠", label: "House with Yard", value: "house-yard" },
            { icon: "🏢", label: "Apartment / Condo", value: "apartment" },
            { icon: "🏘️", label: "Townhouse", value: "townhouse" },
            { icon: "🌳", label: "Rural Property", value: "rural" }
        ]
    },
    {
        id: 2,
        title: "How much time can you spend with a pet daily?",
        type: "single-select",
        options: [
            { icon: "⏰", label: "Less than 1 hour", value: "less-1hr" },
            { icon: "📦", label: "1–3 hours", value: "1-3hrs" },
            { icon: "🏠", label: "3–6 hours", value: "3-6hrs" },
            { icon: "👨‍👩‍👧‍👦", label: "Most of the day", value: "most-day" }
        ]
    },
    {
        id: 3,
        title: "What type of pet are you interested in?",
        type: "single-select",
        options: [
            { icon: "🐕", label: "Dog", value: "dog" },
            { icon: "🐈", label: "Cat", value: "cat" },
            { icon: "🐰", label: "Small Animal", value: "small-animal" },
            { icon: "❤️", label: "Any / Open", value: "any" }
        ]
    },
    {
        id: 4,
        title: "Do you currently own other pets?",
        type: "single-select",
        options: [
            { icon: "✓", label: "No pets currently", value: "no" },
            { icon: "🐕", label: "Yes — 1 pet", value: "yes-1" },
            { icon: "🐕🐕", label: "Yes — 2+ pets", value: "yes-2plus" },
            { icon: "🤝", label: "I foster pets regularly", value: "foster" }
        ]
    },
    {
        id: 5,
        title: "Do you have previous pet-care experience?",
        type: "single-select",
        options: [
            { icon: "👤", label: "First-time Owner", value: "first-time" },
            { icon: "❓", label: "Some Experience", value: "some" },
            { icon: "📚", label: "Experienced Owner", value: "experienced" },
            { icon: "🎓", label: "Professional / Trainer", value: "professional" }
        ]
    }
];

let currentQuizQuestion = 0;
let quizResponses = {};

/**
 * Initialize quiz
 */
function initializeQuiz() {
    currentQuizQuestion = 0;
    quizResponses = {};
    renderQuizQuestion();
}

/**
 * Render quiz question
 */
function renderQuizQuestion() {
    const question = quizQuestionsNew[currentQuizQuestion];
    
    // Update title
    document.querySelector('.quiz-question-container h2').textContent = question.title;
    
    // Update progress
    const progress = ((currentQuizQuestion + 1) / quizQuestionsNew.length) * 100;
    document.getElementById('quizProgressBar').style.width = progress + '%';
    document.getElementById('quizProgressText').textContent = 
        `Question ${currentQuizQuestion + 1} of ${quizQuestionsNew.length} (${Math.round(progress)}% complete)`;
    
    // Render options
    let optionsHtml = '';
    question.options.forEach(option => {
        const isSelected = quizResponses[question.id] === option.value;
        optionsHtml += `
            <button type="button" class="quiz-option-btn ${isSelected ? 'selected' : ''}" 
                onclick="selectQuizOption(${question.id}, '${option.value}', this)">
                <span class="quiz-option-icon">${option.icon}</span>
                <span class="quiz-option-label">${option.label}</span>
            </button>
        `;
    });
    
    document.getElementById('quizQuestionContent').innerHTML = optionsHtml;
    
    // Update button states
    const prevBtn = document.getElementById('quizBackBtn');
    const nextBtn = document.getElementById('quizNextBtn');
    
    if (currentQuizQuestion === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }
    
    if (currentQuizQuestion === quizQuestionsNew.length - 1) {
        nextBtn.textContent = 'Submit Quiz';
    } else {
        nextBtn.textContent = 'Next';
    }
}

/**
 * Select quiz option
 */
function selectQuizOption(questionId, value, btn) {
    const siblings = btn.parentElement.querySelectorAll('.quiz-option-btn');
    siblings.forEach(s => s.classList.remove('selected'));
    btn.classList.add('selected');
    quizResponses[questionId] = value;
}

/**
 * Next quiz question
 */
function nextQuizQuestion() {
    const question = quizQuestionsNew[currentQuizQuestion];
    
    if (!quizResponses[question.id]) {
        alert('Please select an answer to continue');
        return;
    }
    
    if (currentQuizQuestion < quizQuestionsNew.length - 1) {
        currentQuizQuestion++;
        renderQuizQuestion();
    } else {
        submitQuiz();
    }
}

/**
 * Previous quiz question
 */
function previousQuizQuestion() {
    if (currentQuizQuestion > 0) {
        currentQuizQuestion--;
        renderQuizQuestion();
    }
}

/**
 * Submit quiz and get matches
 */
function submitQuiz() {
    setSessionData('quizResponses', quizResponses);
    goToPage('quiz-results.html');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (getCurrentPage() === 'quiz.html') {
        initializeQuiz();
    }
});