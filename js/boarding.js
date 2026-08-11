// ============================================
// BOARDING FUNCTIONS
// ============================================

const petPrices = {
    1: 36,   // Biscuit
    2: 28,   // Luna
    3: 32,   // Rocky
    4: 40,   // Cooper
    5: 26,   // Bella
    6: 34    // Milo
};

/**
 * Update boarding price based on pet
 */
function updateBoardingPrice() {
    calculatePrice();
}

/**
 * Calculate total boarding price
 */
function calculatePrice() {
    const petSelect = document.getElementById('petSelect');
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (!petSelect.value || !startDate || !endDate) {
        return;
    }

    const petId = petSelect.value;
    const dailyPrice = petPrices[petId];
    const start = new Date(startDate);
    const end = new Date(endDate);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    const basePrice = dailyPrice * nights;
    const taxInsurance = 12.50;
    const total = basePrice + taxInsurance;

    // Update summary
    document.getElementById('duration').textContent = `${nights} Night${nights !== 1 ? 's' : ''}`;
    document.getElementById('dailyPrice').textContent = `
$$
{dailyPrice.toFixed(2)} / night`;
    document.getElementById('totalPrice').textContent = `
$$
{total.toFixed(2)}`;
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const boardingForm = document.getElementById('boardingForm');
    if (boardingForm) {
        boardingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const petSelect = document.getElementById('petSelect');
            const petName = petSelect.options[petSelect.selectedIndex].text;
            
            alert(`Boarding request submitted for ${petName}!`);
            // In a real app, you would send this to the server
            goToPage('index.html');
        });
    }
});