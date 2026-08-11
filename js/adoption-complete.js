// ============================================
// ADOPTION COMPLETE FUNCTIONS
// ============================================

// Pet-specific pickup notes
const petPickupNotes = {
    1: {
        name: "Biscuit",
        breed: "Golden Retriever",
        icon: "🐕",
        notes: [
            "Bring high-quality dog food (currently on Royal Canin Adult)",
            "Pack pet carrier large enough for a large dog",
            "Bring standard dog leash and collar",
            "Biscuit loves toys - bring some interactive toys",
            "He may be nervous on the car ride - bring blankets"
        ]
    },
    2: {
        name: "Luna",
        breed: "Siamese Cat",
        icon: "🐈",
        notes: [
            "Bring cat carrier with good ventilation",
            "Luna eats Science Diet Adult cat food",
            "Pack cat litter and litter box",
            "She prefers high places - consider a cat tree",
            "Keep her indoors for the first 2 weeks"
        ]
    },
    3: {
        name: "Rocky",
        breed: "French Bulldog",
        icon: "🐶",
        notes: [
            "Bring small pet carrier (Rocky weighs about 25 lbs)",
            "He's sensitive to heat - keep him cool during transport",
            "Bring purina pro plan small breed food",
            "Pack a crate and cushion for his den",
            "He snores and may have breathing issues - monitor closely"
        ]
    },
    4: {
        name: "Cooper",
        breed: "Border Collie",
        icon: "🐕",
        notes: [
            "Bring large pet carrier and extra space in vehicle",
            "Cooper is very active - plan for 2+ hours daily exercise",
            "Pack a 30-lb bag of his current food (Taste of Wild)",
            "Bring strong leash and collar for active dog",
            "Prepare mental enrichment toys - he gets bored easily"
        ]
    },
    5: {
        name: "Bella",
        breed: "Ragdoll Cat",
        icon: "🐈",
        notes: [
            "Bring small cat carrier - Bella is lightweight",
            "She eats kitten food (Royal Canin Kitten)",
            "Pack fresh litter and a small litter box",
            "She enjoys soft blankets and warm spots",
            "May experience stress - keep environment quiet initially"
        ]
    },
    6: {
        name: "Milo",
        breed: "Beagle Mix",
        icon: "🐕",
        notes: [
            "Bring medium pet carrier",
            "Milo eats Purina Pro Plan Active Dog food",
            "Pack sturdy collar - he has a strong nose",
            "Bring toys for mental stimulation",
            "He may be vocal - consider sound training techniques"
        ]
    }
};

/**
 * Initialize adoption complete page
 */
function initializeAdoptionComplete() {
    const applicationData = getSessionData('adoptionApplication');
    const petId = parseInt(getSessionData('adoptingPetId'));
    const petName = getSessionData('adoptingPetName');
    
    if (!applicationData || !petId) {
        goToPage('index.html');
        return;
    }
    
    const pet = findPetById(petId);
    if (!pet) {
        goToPage('index.html');
        return;
    }
    
    displayCompletionDetails(applicationData, pet);
}

/**
 * Display completion details
 */
function displayCompletionDetails(applicationData, pet) {
    // Pet summary
    const petSummary = document.getElementById('petSummary');
    petSummary.innerHTML = `
        <div class="pet-summary-item">
            <div class="pet-image-card">
                <img src="${pet.image}" alt="${pet.name}" loading="lazy">
            </div>
            <div class="pet-info">
                <h3>${pet.name}</h3>
                <p>${pet.breed} • ${pet.age} ${pet.age === 1 ? 'Year' : 'Years'} Old</p>
            </div>
        </div>
    `;
    
    // Pet-specific notes
    const petNotes = petPickupNotes[pet.id];
    if (petNotes) {
        const notesSection = document.getElementById('petSpecificNotes');
        notesSection.innerHTML = `
            <div class="requirements-box">
                <h3>Special Care Notes for ${petNotes.name}</h3>
                <ul class="pet-notes-list">
                    ${petNotes.notes.map(note => `<li>${note}</li>`).join('')}
                </ul>
            </div>
        `;
    }
}

/**
 * Reschedule pickup
 */
function reschedulePickup() {
    alert('Rescheduling feature coming soon! Please call us at +1 (555) 123-4567');
}

/**
 * Contact support
 */
function contactSupport() {
    alert('Opening email client to contact us...\n\nEmail: adoptions@pawhome.org\nPhone: +1 (555) 123-4567');
}

/**
 * Download documents
 */
function downloadDocuments() {
    alert('Downloading adoption agreement and care guide...\n\nFiles will include:\n- Adoption Agreement\n- Pet Care Guide\n- Microchip Registration Info\n- Vet Records');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (getCurrentPage() === 'adoption-complete.html') {
        initializeAdoptionComplete();
    }
});