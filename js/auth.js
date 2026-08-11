// ============================================
// AUTHENTICATION MANAGEMENT
// ============================================

/**
 * User data structure
 */
const users = [
    {
        id: 1,
        name: "Sarah Chen",
        email: "sarah.chen@example.com",
        password: "password123", // In real app, use hashed passwords
        phone: "+1 (555) 123-4567",
        address: "1234 Sunset Boulevard, San Francisco, CA 94115",
        joinDate: "2024-01-15",
        adoptionStatus: "active",
        adoptedPets: [1],
        applications: [3, 4],
        profileImage: "👤"
    },
    {
        id: 2,
        name: "John Smith",
        email: "john.smith@example.com",
        password: "password456",
        phone: "+1 (555) 987-6543",
        address: "5678 Oak Avenue, Los Angeles, CA 90001",
        joinDate: "2023-06-20",
        adoptionStatus: "pending",
        adoptedPets: [],
        applications: [1, 2],
        profileImage: "👤"
    }
];

/**
 * Check if user is logged in
 */
function isLoggedIn() {
    return sessionStorage.getItem('currentUser') !== null;
}

/**
 * Get current logged-in user
 */
function getCurrentUser() {
    const userData = sessionStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

/**
 * Login user
 */
function loginUser(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return { success: false, message: "Invalid email or password" };
    }
    
    // Store user in session
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    return { success: true, message: "Login successful", user };
}

/**
 * Register user (new)
 */
function registerUser(fullName, email, password, confirmPassword, phone, address) {
    // Validation
    if (password !== confirmPassword) {
        return { success: false, message: "Passwords do not match" };
    }
    
    if (password.length < 6) {
        return { success: false, message: "Password must be at least 6 characters" };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, message: "Invalid email format" };
    }
    
    // Check if user exists
    if (users.find(u => u.email === email)) {
        return { success: false, message: "Email already registered" };
    }
    
    // Create new user
    const newUser = {
        id: users.length + 1,
        name: fullName,
        email: email,
        password: password,
        phone: phone,
        address: address,
        joinDate: new Date().toISOString().split('T')[0],
        adoptionStatus: "active",
        adoptedPets: [],
        applications: [],
        profileImage: "👤"
    };
    
    users.push(newUser);
    sessionStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return { success: true, message: "Account created successfully", user: newUser };
}

/**
 * Logout user
 */
function logoutUser() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('quizResponses');
    sessionStorage.removeItem('adoptionApplication');
    sessionStorage.removeItem('selectedPetId');
    sessionStorage.removeItem('adoptingPetId');
    sessionStorage.removeItem('boardingPetId');
    goToPage('login.html');
}

/**
 * Update user profile
 */
function updateUserProfile(updates) {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        return { success: false, message: "No user logged in" };
    }
    
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex === -1) {
        return { success: false, message: "User not found" };
    }
    
    const updatedUser = { ...users[userIndex], ...updates };
    users[userIndex] = updatedUser;
    sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return { success: true, message: "Profile updated successfully", user: updatedUser };
}

/**
 * Check authentication for protected pages
 */
function requireLogin(redirectTo = 'login.html') {
    if (!isLoggedIn()) {
        alert('Please login to access this page');
        goToPage(redirectTo);
        return false;
    }
    return true;
}