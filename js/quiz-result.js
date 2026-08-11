// ============================================
// QUIZ RESULTS FUNCTIONS
// ============================================

/**
 * Calculate match score
 */
function calculateMatchScore(pet, responses) {
    let score = 0;
    const maxScore = 100;
    
    // Home type matching
    if (responses[1] === 'house-yard' && (pet.id === 1 || pet.id === 4)) score += 20;
    if (responses[1] === 'apartment' && (pet.id === 2 || pet.id === 3 || pet.id === 5)) score += 20;
    
    // Time available
    if (responses[2] === 'most-day' && pet.id === 4) score += 15;
    if (responses[2] === '1-3hrs' && (pet.id === 2 || pet.id === 5)) score += 15;
    
    // Pet type
    if (responses[3] === 'dog' && (pet.id === 1 || pet.id === 3 || pet.id === 4 || pet.id === 6)) score += 20;
    if (responses[3] === 'cat' && (pet.id === 2 || pet.id === 5)) score += 20;
    if (responses[3] === 'any') score += 10;
    
    // Experience level
    if (responses[5] === 'experienced' && pet.id === 4) score += 15;
    if (responses[5] === 'first-time' && (pet.id === 1 || pet.id === 2)) score += 15;
    
    // Other pets
    if (responses[4] === 'no' && pet.id !== 4) score += 10;
    if (responses[4] === 'yes-1') score += 8;
    
    return Math.min(score, maxScore);
}

/**
 * Get top matches
 */
function getTopMatches(responses) {
    const matches = petsData.map(pet => ({
        ...pet,
        matchScore: calculateMatchScore(pet, responses)
    }));
    
    return matches.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
}

/**
 * Initialize quiz results
 */
function initializeQuizResults() {
    const responses = getSessionData('quizResponses');
    
    if (!responses) {
        goToPage('quiz.html');
        return;
    }
    
    const topMatches = getTopMatches(responses);
    displayMatches(topMatches);
}

/**
 * Display matches
 */
function displayMatches(matches) {
    const matchesGrid = document.getElementById('matchesGrid');
    
    let html = '';
    matches.forEach(match => {
        html += `
            <div class="match-card">
                <div class="match-image">
                    ${match.image}
                    <div class="match-badge">${match.matchScore}% Match</div>
                </div>
                <div class="match-card-info">
                    <div class="match-card-header">
                        <div>
                            <div class="match-name">${match.name}</div>
                            <div class="match-breed">${match.breed}</div>
                        </div>
                        <div class="match-age">${match.age} ${match.age === 1 ? 'Year' : 'Years'}</div>
                    </div>
                    <div class="match-traits">
                        ${match.traits.slice(0, 3).map(trait => 
                            `<span class="match-trait">${trait}</span>`
                        ).join('')}
                    </div>
                    <button class="match-cta" onclick="viewPetDetailsFromMatch(${match.id})">View Profile</button>
                </div>
            </div>
        `;
    });
    
    matchesGrid.innerHTML = html;
}

/**
 * View pet details from match
 */
function viewPetDetailsFromMatch(petId) {
    setSessionData('selectedPetId', petId);
    goToPage('pet-details.html');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (getCurrentPage() === 'quiz-results.html') {
        initializeQuizResults();
    }
});