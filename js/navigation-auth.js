// ============================================
// PROTECTED NAVIGATION
// ============================================

/**
 * Handle protected navigation (requires login)
 */
function handleProtectedNavigation(event, page) {
    event.preventDefault();
    
    if (!isLoggedIn()) {
        if (confirm('You need to login to access this page. Redirect to login?')) {
            goToPage('login.html');
        }
        return;
    }
    
    goToPage(page);
}

/**
 * Initialize header based on auth status
 */
function initializeHeader() {
    const user = getCurrentUser();
    const profileLink = document.getElementById('profileLink');
    const loginLink = document.getElementById('loginLink');
    const signupLink = document.getElementById('signupLink');
    const logoutLink = document.getElementById('logoutLink');
    const dropdownName = document.getElementById('dropdownName');
    const dropdownEmail = document.getElementById('dropdownEmail');
    const adoptionLink = document.getElementById('adoptionLink');
    
    if (user) {
        // User is logged in
        dropdownName.textContent = user.name;
        dropdownEmail.textContent = user.email;
        profileLink.style.display = 'block';
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        logoutLink.style.display = 'block';
        
        // Enable adoption link
        if (adoptionLink) {
            adoptionLink.onclick = (e) => {
                e.preventDefault();
                goToPage('adoption-application.html');
            };
        }
    } else {
        // User is not logged in
        dropdownName.textContent = 'Guest';
        dropdownEmail.textContent = 'Not logged in';
        profileLink.style.display = 'none';
        loginLink.style.display = 'block';
        signupLink.style.display = 'block';
        logoutLink.style.display = 'none';
        
        // Require login for adoption
        if (adoptionLink) {
            adoptionLink.onclick = (e) => handleProtectedNavigation(e, 'adoption-application.html');
        }
    }
}

/**
 * Toggle profile dropdown
 */
function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

/**
 * Handle logout
 */
function handleLogout(event) {
    event.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        logoutUser();
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown && !event.target.closest('.profile-dropdown-container')) {
        dropdown.style.display = 'none';
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
});