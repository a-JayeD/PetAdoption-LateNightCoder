// ============================================
// LOGIN PAGE FUNCTIONS
// ============================================

/**
 * Handle login form submission
 */
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');
    
    // Clear previous errors
    errorDiv.style.display = 'none';
    
    // Attempt login
    const result = loginUser(email, password);
    
    if (result.success) {
        // Redirect to dashboard
        setTimeout(() => {
            goToPage('index.html');
        }, 500);
    } else {
        // Show error
        errorDiv.textContent = result.message;
        errorDiv.style.display = 'block';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // If already logged in, redirect to dashboard
    if (isLoggedIn()) {
        goToPage('index.html');
    }
});