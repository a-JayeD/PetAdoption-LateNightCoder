// ============================================
// LOGIN PAGE FUNCTIONS
// ============================================

/**
 * Set user role
 * @param {string} role - User role
 */
function setRole(role) {
    const staffBtn = document.querySelector('.staff-btn');
    const adopterBtn = document.querySelector('.adopter-btn');

    staffBtn.classList.remove('active');
    adopterBtn.classList.remove('active');

    if (role === 'staff') {
        staffBtn.classList.add('active');
    } else {
        adopterBtn.classList.add('active');
    }

    setSessionData('userRole', role);
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login successful! Redirecting...');
            goToPage('index.html');
        });
    }
});