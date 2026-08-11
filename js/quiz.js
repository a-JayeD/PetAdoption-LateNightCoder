// ============================================
// QUIZ PAGE FUNCTIONS
// ============================================

let currentQuestionIndex = 0;
const quizAnswers = [];

/**
 * Initialize quiz
 */
function initializeQuiz() {
    currentQuestionIndex = 0;
    quizAnswers.length = 0;
    displayQuizQuestion();
}

/**
 * Display quiz question
 */
function displayQuizQuestion() {
    const quizTitle = document.getElementById("quizQuestionTitle");
    const quizContent = document.getElementById("quizQuestionContent");
    const question = quizQuestions[currentQuestionIndex];

    if (quizTitle) {
        quizTitle.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    }

    if (quizContent) {
        quizContent.innerHTML = `
            <div class="quiz-question">
                <h3>${question.question}</h3>
                <div class="quiz-options">
                    ${question.options.map((option) => `
                        <label class="quiz-option">
                            <input type="radio" name="answer" value="${option}" ${quizAnswers[currentQuestionIndex] === option ? 'checked' : ''}>
                            <span>${option}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    }

    updateProgressBar();
    updateQuizButtons();
    attachQuizOptionListeners();
}

/**
 * Update progress bar
 */
function updateProgressBar() {
    const progressBar = document.getElementById("quizProgressBar");
    const progressText = document.getElementById("quizProgressText");
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

    if (progressBar) {
        progressBar.style.width = progress + "%";
    }

    if (progressText) {
        progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length} (${Math.round(progress)}% complete)`;
    }
}

/**
 * Update quiz buttons
 */
function updateQuizButtons() {
    const prevBtn = document.getElementById("quizBackBtn");
    const nextBtn = document.getElementById("quizNextBtn");

    if (prevBtn) {
        prevBtn.style.display = currentQuestionIndex === 0 ? "none" : "block";
    }

    if (nextBtn) {
        nextBtn.textContent = currentQuestionIndex === quizQuestions.length - 1 ? "See Results" : "Next";
    }
}

/**
 * Attach option listeners
 */
function attachQuizOptionListeners() {
    document.querySelectorAll('input[name="answer"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            quizAnswers[currentQuestionIndex] = e.target.value;
        });
    });
}

/**
 * Next question
 */
function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedAnswer) {
        alert("Please select an answer before proceeding.");
        return;
    }

    quizAnswers[currentQuestionIndex] = selectedAnswer.value;

    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuizQuestion();
    } else {
        showQuizResults();
    }
}

function nextQuizQuestion() {
    nextQuestion();
}

/**
 * Previous question
 */
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuizQuestion();
    }
}

function previousQuizQuestion() {
    previousQuestion();
}

/**
 * Show results
 */
function showQuizResults() {
    const quizContent = document.getElementById("quizQuestionContent");
    const recommendedPet = getRandomItem(petsData);

    if (quizContent) {
        quizContent.innerHTML = `
        <div style="text-align: center;">
            <h2 style="color: #16a085; margin-bottom: 1rem; font-size: 2rem;">Your Perfect Match! 🐾</h2>
            <p style="font-size: 1.1rem; margin-bottom: 2rem; color: #666;">Based on your answers, we think <strong>${recommendedPet.name}</strong> might be your perfect companion!</p>
            
            <div style="background-color: #f9f9f9; padding: 2rem; border-radius: 8px; margin-bottom: 2rem;">
                <div style="margin-bottom: 1rem; display: flex; justify-content: center;">
                    <img src="${recommendedPet.image}" alt="${recommendedPet.name}" style="width: 220px; height: 220px; object-fit: cover; border-radius: 12px;">
                </div>
                <h3 style="color: #333; margin-bottom: 0.5rem; font-weight: 700;">${recommendedPet.name}</h3>
                <p style="color: #666; margin-bottom: 1rem;">${recommendedPet.breed}</p>
                <p style="color: #333;">${recommendedPet.description}</p>
            </div>

            <button class="btn-primary" style="width: 100%; padding: 1rem; margin-bottom: 1rem; cursor: pointer; border: none; font-weight: 600; border-radius: 6px;" onclick="viewPetDetails(${recommendedPet.id})">View ${recommendedPet.name}'s Profile</button>
            <button class="btn-secondary" style="width: 100%; padding: 1rem; cursor: pointer; border: 1px solid #e0e0e0; font-weight: 600; border-radius: 6px; background-color: #f9f9f9;" onclick="goToPage('index.html')">Back to Dashboard</button>
        </div>
    `;

    const prevBtn = document.getElementById("quizBackBtn");
    const nextBtn = document.getElementById("quizNextBtn");

    if (prevBtn) {
        prevBtn.style.display = "none";
    }

    if (nextBtn) {
        nextBtn.style.display = "none";
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (getCurrentPage() === 'quiz.html') {
        initializeQuiz();
    }
});