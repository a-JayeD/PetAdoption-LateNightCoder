// ============================================
// DASHBOARD PAGE FUNCTIONS
// ============================================

/**
 * Initialize dashboard
 */
function initializeDashboard() {
    displayPets(petsData);
    setupDashboardEventListeners();
}

/**
 * Display pets in grid
 * @param {array} pets - Pets to display
 */
function displayPets(pets) {
    const petsGrid = document.getElementById("petsGrid");
    if (!petsGrid) return;

    if (pets.length === 0) {
        petsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #666;">No pets found. Try adjusting your filters.</p>';
        return;
    }

    petsGrid.innerHTML = pets.map(pet => `
        <div class="pet-card" onclick="viewPetDetails(${pet.id})">
            <div class="pet-image">
                <img src="${pet.image}" alt="${pet.name}">
            </div>
            <div class="pet-info">
                <div class="pet-header">
                    <span class="pet-name">${pet.name}</span>
                    <span class="pet-age">${pet.age} ${pet.age === 1 ? 'Year' : 'Years'}</span>
                </div>
                <p class="pet-breed">${pet.breed}</p>
                <div class="pet-traits">
                    ${pet.traits.map(trait => `<span class="trait-badge">${trait}</span>`).join('')}
                </div>
                <div class="pet-actions">
                    <button class="btn-primary" onclick="event.stopPropagation(); viewPetDetails(${pet.id})">Meet Me</button>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Setup event listeners
 */
function setupDashboardEventListeners() {
    const searchInput = document.getElementById("searchInput");
    const speciesFilter = document.getElementById("speciesFilter");
    const breedFilter = document.getElementById("breedFilter");
    const ageFilter = document.getElementById("ageFilter");
    const sizeFilter = document.getElementById("sizeFilter");
    const traitFilter = document.getElementById("traitFilter");
    const searchBtn = document.querySelector(".btn-search");

    searchInput?.addEventListener("keyup", filterPets);
    speciesFilter?.addEventListener("change", filterPets);
    breedFilter?.addEventListener("change", filterPets);
    ageFilter?.addEventListener("change", filterPets);
    sizeFilter?.addEventListener("change", filterPets);
    traitFilter?.addEventListener("change", filterPets);
    searchBtn?.addEventListener("click", filterPets);
}

/**
 * Filter pets based on criteria
 */
function filterPets() {
    const searchInput = document.getElementById("searchInput")?.value.toLowerCase() || "";
    const speciesFilter = document.getElementById("speciesFilter")?.value || "";
    const breedFilter = document.getElementById("breedFilter")?.value || "";
    const ageFilter = document.getElementById("ageFilter")?.value || "";
    const sizeFilter = document.getElementById("sizeFilter")?.value || "";
    const traitFilter = document.getElementById("traitFilter")?.value || "";

    const filtered = petsData.filter(pet => {
        const matchesSearch = searchInput === "" || 
                            pet.name.toLowerCase().includes(searchInput) || 
                            pet.breed.toLowerCase().includes(searchInput) ||
                            pet.traits.some(t => t.toLowerCase().includes(searchInput));
        
        const matchesSpecies = !speciesFilter || pet.species === speciesFilter;
        const matchesBreed = !breedFilter || pet.breed.toLowerCase().includes(breedFilter.toLowerCase());
        
        let matchesAge = true;
        if (ageFilter === "young") matchesAge = pet.age < 2;
        else if (ageFilter === "adult") matchesAge = pet.age >= 2 && pet.age < 7;
        else if (ageFilter === "senior") matchesAge = pet.age >= 7;
        
        const matchesSize = !sizeFilter || pet.size === sizeFilter;
        const matchesTrait = !traitFilter || pet.traits.some(t => t.toLowerCase().includes(traitFilter.toLowerCase()));

        return matchesSearch && matchesSpecies && matchesBreed && matchesAge && matchesSize && matchesTrait;
    });

    displayPets(filtered);
}

/**
 * View pet details
 * @param {number} petId - Pet ID
 */
function viewPetDetails(petId) {
    setSessionData('selectedPetId', petId);
    goToPage('pet-details.html');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (getCurrentPage() === 'index.html' || getCurrentPage() === '') {
        initializeDashboard();
    }
});