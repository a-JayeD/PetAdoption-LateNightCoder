// ============================================
// SIGNUP PAGE FUNCTIONS
// ============================================

/**
 * Handle signup form submission
 */
function handleSignup(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const errorDiv = document.getElementById('signupError');
    
    // Clear previous errors
    errorDiv.style.display = 'none';
    
    // Register user
    const result = registerUser(fullName, email, password, confirmPassword, phone, address);
    
    if (result.success) {
        // Redirect to account created page
        setTimeout(() => {
            goToPage('account-created.html');
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