
// ============================================
// PET DETAILS PAGE FUNCTIONS
// ============================================

/**
 * Initialize pet details page
 */
function initializePetDetails() {
    const petId = parseInt(getSessionData('selectedPetId'));
    const pet = findPetById(petId);

    if (!pet) {
        goToPage('index.html');
        return;
    }

    displayPetDetails(pet);
}

/**
 * Display pet details
 * @param {object} pet - Pet object
 */
function displayPetDetails(pet) {
    const detailsContent = document.getElementById("petDetailsContent");
    
    detailsContent.innerHTML = `
        <div class="pet-details-header">
            <div class="pet-details-image">
                <img src="${pet.image}" alt="${pet.name}" loading="lazy">
            </div>
            <div class="pet-details-info">
                <h1>${pet.name}</h1>
                <p class="pet-details-breed">${pet.breed}</p>
                
                <div class="button-actions">
                    <button class="detail-btn" onclick="applyToAdopt(${pet.id}, '${pet.name}')">Apply to Adopt</button>
                </div>
                
                <div class="detail-item">
                    <div class="detail-label">Age</div>
                    <div class="detail-value">${pet.age} ${pet.age === 1 ? 'Year' : 'Years'} Old</div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-label">Size</div>
                    <div class="detail-value">${pet.size}</div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-label">Species</div>
                    <div class="detail-value">${pet.species.charAt(0).toUpperCase() + pet.species.slice(1)}</div>
                </div>
                
                <div class="pet-details-traits">
                    ${pet.traits.map(trait => `<span class="trait-badge">${trait}</span>`).join('')}
                </div>
            </div>
        </div>

        <div class="pet-details-body">
            <div class="detail-section">
                <h3>About ${pet.name}</h3>
                <p>${pet.description}</p>
            </div>

            <div class="detail-section">
                <h3>Personality</h3>
                <p>${pet.personality}</p>
            </div>

            <div class="detail-section">
                <h3>Adoption Information</h3>
                <p><strong>Adoption Fee:</strong> ${pet.adoptionFee}</p>
                <p><strong>Health Status:</strong> ${pet.healthStatus}</p>
            </div>
        </div>
    `;
}

/**
 * Apply to adopt
 */
function applyToAdopt(petId, petName) {
    setSessionData('adoptingPetId', petId);
    setSessionData('adoptingPetName', petName);
    goToPage('adoption-application.html');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (getCurrentPage() === 'pet-details.html') {
        initializePetDetails();
    }
});